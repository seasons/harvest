import { Box, FixedButton, Spacer } from "App/Components"
import { GuestView } from "App/Components/GuestView"
import { Loader } from "App/Components/Loader"
import { PauseButtons, PauseStatus } from "App/Components/Pause/PauseButtons"
import { BAG_NUM_ITEMS } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { assign, fill } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, RefreshControl, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { GET_BROWSE_PRODUCTS } from "../Browse/Browse"
import { CHECK_ITEMS, GET_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "./BagQueries"
import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"
import { Schema as NavigationSchema } from "App/Navigation"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

export const Bag = screenTrack()((props) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setMutating] = useState(false)
  const [disabledTabs, setDisabledTabs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const tracking = useTracking()

  const { navigation, route } = props
  const routeTab = route?.params?.tab
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content")
      if (!!routeTab && currentView !== routeTab) {
        setCurrentView(routeTab)
      }
    }, [])
  )

  const { data, refetch } = useQuery(GET_BAG)
  const me = data?.me
  const customerStatus = me?.customer?.status
  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
    if (!!customerStatus && !(customerStatus === "Active" || customerStatus === "Paused")) {
      setDisabledTabs(["Bag", "History"])
      setCurrentView(BagView.Saved)
    } else {
      setDisabledTabs([])
    }
  }, [data])

  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    update(cache, { data }) {
      const { me } = cache.readQuery({ query: GET_BAG })
      const key = currentView === BagView.Bag ? "bag" : "savedItems"
      const list = me[key]
      const filteredList = list.filter((a) => a.id !== data.removeFromBag.id)
      cache.writeQuery({
        query: GET_BAG,
        data: {
          me: {
            ...me,
            [key]: filteredList,
          },
        },
      })
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_BROWSE_PRODUCTS,
        variables: {
          name: "all",
          first: 10,
          skip: 0,
          orderBy: "publishedAt_DESC",
          sizes: [],
        },
      },
    ],
  })

  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM, {
    update(cache, { data }) {
      const { me } = cache.readQuery({ query: GET_BAG })
      const old = currentView === BagView.Bag ? "bag" : "savedItems"
      const newKey = currentView === BagView.Bag ? "savedItems" : "bag"
      const list = me[old]
      const filteredList = list.filter((a) => a.id !== data.removeFromBag.id)
      const item = list.find((a) => a.id === data.removeFromBag.id)

      cache.writeQuery({
        query: GET_BAG,
        data: {
          me: {
            ...me,
            [old]: filteredList,
            [newKey]: me[newKey].concat(item),
          },
        },
      })
    },
  })

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)

  if (!authState?.userSession) {
    return <GuestView navigation={navigation} />
  }

  if (isLoading) {
    return <Loader />
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const items =
    me?.bag?.map((item) => ({
      ...item,
      variantID: item.productVariant.id,
      productID: item.productVariant.product.id,
    })) || []

  const savedItems =
    me?.savedItems?.map((item) => ({
      ...item,
      variantID: item.productVariant.id,
      productID: item.productVariant.product.id,
    })) || []

  const bagItems = assign(fill(new Array(3), { variantID: "", productID: "" }), items)
  const hasActiveReservation = !!me?.activeReservation

  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
  const handleReserve = async (navigation) => {
    setMutating(true)
    try {
      const hasShippingAddress =
        !!shippingAddress.address1 && !!shippingAddress.city && !!shippingAddress.state && !!shippingAddress.zipCode
      if (!hasShippingAddress) {
        showPopUp({
          title: "Your shipping address is incomplete",
          note:
            "Please update your shipping address under Payment & Shipping in your account settings to complete your reservation.",
          buttonText: "Got it",
          onClose: () => hidePopUp(),
          secondaryButtonText: "Go to settings",
          secondaryButtonOnPress: () => {
            navigation.navigate(NavigationSchema.StackNames.AccountStack, {
              screen: NavigationSchema.PageNames.PaymentAndShipping,
            })
            hidePopUp()
          },
        })
        setMutating(false)
        return
      }
      const { data } = await checkItemsAvailability({
        variables: {
          items: items.map((item) => item.variantID),
        },
        refetchQueries: [
          {
            query: GET_BAG,
          },
        ],
        update(cache, { data, errors }) {
          console.log(data, errors)
        },
      })
      if (data.checkItemsAvailability) {
        navigation.navigate(NavigationSchema.StackNames.BagStack, { screen: NavigationSchema.PageNames.Reservation })
      }
      setMutating(false)
    } catch (e) {
      const { graphQLErrors } = e
      console.log("Bag.tsx handleReserve: ", graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code } = error.extensions
        if (code === "511") {
          refetch()

          showPopUp({
            title: "One or more items have been reserved already",
            note:
              "Sorry, some of the items you had selected were confirmed before you, please replace them with available items",
            buttonText: "Got it",
            onClose: () => hidePopUp(),
          })
        } else {
          showPopUp({
            title: "Sorry!",
            note: "We couldn't process your order because of an unexpected error, please try again later",
            buttonText: "Got it",
            onClose: () => hidePopUp(),
          })
        }
      }
      setMutating(false)
    }
  }

  const isBagView = BagView.Bag == currentView
  const isSavedView = BagView.Saved == currentView
  const reservations = me?.customer?.reservations
  const bagCount = items.length
  const bagIsFull = bagCount === BAG_NUM_ITEMS

  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const pausePending = pauseRequest?.pausePending
  let pauseStatus: PauseStatus = "active"

  if (customerStatus === "Paused") {
    pauseStatus = "paused"
  } else if (pausePending) {
    pauseStatus = "pending"
  }

  const renderItem = ({ item }) => {
    if (isBagView) {
      if (pauseStatus === "paused") {
        return (
          <Box
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
            px={2}
            pb={5}
          >
            <PauseButtons customer={me?.customer} fullScreen />
          </Box>
        )
      } else {
        return (
          <BagTab
            me={data?.me}
            activeReservation={data?.me?.activeReservation}
            pauseStatus={pauseStatus}
            items={item.data}
            removeFromBagAndSaveItem={removeFromBagAndSaveItem}
            deleteBagItem={deleteBagItem}
          />
        )
      }
    } else if (isSavedView) {
      return (
        <SavedItemsTab
          items={item.data}
          bagIsFull={bagIsFull}
          hasActiveReservation={hasActiveReservation}
          deleteBagItem={deleteBagItem}
        />
      )
    } else {
      return <ReservationHistoryTab items={item.data} />
    }
  }

  let sections
  if (isBagView) {
    sections = [{ data: bagItems }]
  } else if (isSavedView) {
    sections = [{ data: savedItems }]
  } else {
    sections = [{ data: reservations }]
  }
  const footerMarginBottom = currentView === BagView.Bag ? 96 : 2

  return (
    <Container insetsBottom={false}>
      <TabBar
        spaceEvenly
        tabs={["Bag", "Saved", "History"]}
        disabledTabs={disabledTabs}
        activeTab={currentView}
        goToPage={(page: BagView) => {
          tracking.trackEvent({
            actionName: () => {
              if (page === 0) {
                return TrackSchema.ActionNames.BagTabTapped
              } else if (page === 1) {
                return TrackSchema.ActionNames.SavedTabTapped
              } else {
                return TrackSchema.ActionNames.ReservationHistoryTabTapped
              }
            },
            actionType: TrackSchema.ActionTypes.Tap,
          })
          setCurrentView(page)
        }}
      />
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={sections}
        contentContainerStyle={pauseStatus === "paused" ? { height: "100%", width: "100%", position: "relative" } : {}}
        keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
        renderItem={(item) => {
          return renderItem(item)
        }}
        ListFooterComponent={() => <Spacer mb={footerMarginBottom} />}
      />
      {isBagView && pauseStatus !== "paused" && !hasActiveReservation && (
        <FixedButton
          block
          onPress={() => {
            tracking.trackEvent({
              actionName: TrackSchema.ActionNames.ReserveButtonTapped,
              actionType: TrackSchema.ActionTypes.Tap,
              bagIsFull,
            })
            handleReserve(navigation)
          }}
          disabled={!bagIsFull || isMutating}
          loading={isMutating}
        >
          Reserve
        </FixedButton>
      )}
    </Container>
  )
})
