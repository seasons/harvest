import { Box, Button, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { PauseButtons, PauseStatus } from "App/Components/Pause/PauseButtons"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { assign, fill } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, RefreshControl, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { CHECK_ITEMS, GET_BAG, GET_LOCAL_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "./BagQueries"
import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"
import { DEFAULT_ITEM_COUNT } from "App/helpers/constants"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

export const Bag = screenTrack()((props) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setMutating] = useState(false)
  const [itemCount, setItemCount] = useState(DEFAULT_ITEM_COUNT)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const tracking = useTracking()

  const { navigation, route } = props
  const routeTab = route?.params?.tab
  const isSignedIn = authState.isSignedIn
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
  const { data: localItems } = useQuery(GET_LOCAL_BAG)

  const me = data?.me
  const customerStatus = me?.customer?.status

  useEffect(() => {
    if (data) {
      const dataItemCount = data?.me?.customer?.membership?.plan?.itemCount
      if (!!dataItemCount && dataItemCount !== itemCount && isSignedIn) {
        setItemCount(dataItemCount)
      }
      setIsLoading(false)
    }
  }, [data, setIsLoading, setItemCount])

  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    update(cache, { data }) {
      // Note: This mutation is being called in BagItem.tsx and has it's variables and refetchQueries listed there
      const { me, paymentPlans } = cache.readQuery({ query: GET_BAG })
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
          paymentPlans,
        },
      })
    },
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

  if (isLoading) {
    return <Loader />
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const items = !isSignedIn
    ? localItems?.localBagItems || []
    : me?.bag?.map((item) => ({
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

  const bagItems = (itemCount && assign(fill(new Array(itemCount), { variantID: "", productID: "" }), items)) || []
  const hasActiveReservation = !!me?.activeReservation

  const shippingAddress = data?.me?.customer?.detail?.shippingAddress
  const handleReserve = async (navigation) => {
    setMutating(true)
    try {
      if (!isSignedIn) {
        showPopUp({
          title: "Sign up to Reserve your items",
          note: "You need to create an account before you can reserve items",
          buttonText: "Got it",
          onClose: () => {
            hidePopUp()
            navigation.navigate("Modal", {
              screen: "CreateAccountModal",
            })
          },
        })
      } else {
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
  const bagIsFull = itemCount && bagCount === itemCount

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
            itemCount={itemCount}
            data={data}
            pauseStatus={pauseStatus}
            items={item.data}
            removeFromBagAndSaveItem={removeFromBagAndSaveItem}
            deleteBagItem={deleteBagItem}
            setItemCount={setItemCount}
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
        ListFooterComponent={() => <Spacer pb={160} />}
      />
      {isBagView && pauseStatus !== "paused" && !hasActiveReservation && (
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Spacer mb={2} />
          <Box px={2}>
            <Button
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
            </Button>
          </Box>
          <Spacer mb={2} />
        </FadeBottom2>
      )}
    </Container>
  )
})
