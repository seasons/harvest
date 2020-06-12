import { FixedButton, Spacer, Flex, Box } from "App/Components"
import { GuestView } from "App/Components/GuestView"
import { Loader } from "App/Components/Loader"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { assign, fill } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, RefreshControl, StatusBar } from "react-native"
import { CHECK_ITEMS, GET_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "./BagQueries"
import { BagTab, SavedItemsTab, ReservationHistoryTab } from "./Components"
import { GET_BROWSE_PRODUCTS } from "../Browse/Browse"
import { useFocusEffect } from "@react-navigation/native"
import { BAG_NUM_ITEMS } from "App/helpers/constants"
import { PauseStatus, PauseButtons } from "App/Components/Pause/PauseButtons"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

export const Bag = screenTrack()((props) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setMutating] = useState(false)
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
  useEffect(() => {
    if (data) {
      setIsLoading(false)
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
          orderBy: "createdAt_DESC",
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
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
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

  const me = data?.me

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

  const paddedItems = assign(fill(new Array(3), { variantID: "", productID: "" }), items)
  const hasActiveReservation = !!me?.activeReservation

  const handleReserve = async (navigation) => {
    setMutating(true)
    try {
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
        navigation.navigate("BagStack", { screen: Schema.PageNames.ReservationPage })
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
  const customerStatus = me?.customer?.status
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
            pauseStatus={pauseStatus}
            items={item.data}
            removeFromBagAndSaveItem={removeFromBagAndSaveItem}
            hasActiveReservation={hasActiveReservation}
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
    sections = [{ data: paddedItems }]
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
        activeTab={currentView}
        goToPage={(page: BagView) => {
          tracking.trackEvent({
            actionName: () => {
              if (page === 0) {
                return Schema.ActionNames.BagTabTapped
              } else if (page === 1) {
                return Schema.ActionNames.SavedTabTapped
              } else {
                return Schema.ActionNames.ReservationHistoryTabTapped
              }
            },
            actionType: Schema.ActionTypes.Tap,
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
              actionName: Schema.ActionNames.ReserveButtonTapped,
              actionType: Schema.ActionTypes.Tap,
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
