import { useFocusEffect } from "@react-navigation/native"
import { Box, Button, Spacer } from "@seasons/eclipse"
import analytics from "@segment/analytics-react-native"
import { Loader } from "App/Components/Loader"
import { PauseButtons, PauseStatus } from "App/Components/Pause/PauseButtons"
import { DEFAULT_ITEM_COUNT } from "App/helpers/constants"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { assign, fill } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FlatList, RefreshControl, StatusBar, View } from "react-native"
import { State as CreateAccountState, UserState as CreateAccountUserState } from "../CreateAccount/CreateAccount"
import { CHECK_ITEMS, GET_BAG, GET_LOCAL_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "./BagQueries"
import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"

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
  const { bottomSheetBackdropIsVisible } = useBottomSheetContext()
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

  const { previousData, data = previousData, refetch } = useQuery(GET_BAG)
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
      const userId = me.customer?.user?.id
      if (!!userId) {
        const savedItems = me?.savedItems?.length || 0
        const baggedItems = me?.bag?.length || 0
        analytics.identify(userId, { bagItems: savedItems + baggedItems })
      }
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

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS, {
    onCompleted: (res) => {
      setMutating(false)
      if (res.checkItemsAvailability) {
        navigation.navigate(NavigationSchema.StackNames.BagStack, { screen: NavigationSchema.PageNames.Reservation })
      }
    },
    onError: (e) => {
      const { graphQLErrors } = e
      console.log("Bag.tsx handleReserve: ", graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code } = error.extensions
        if (code === "515" || code === "511") {
          refetch()

          showPopUp({
            title: "One or more items have been reserved already",
            note:
              "Sorry, some of the items you had selected were confirmed before you, we've moved these to your saved items.",
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
    },
  })

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

  const isBagView = BagView.Bag == currentView
  const isSavedView = BagView.Saved == currentView
  const reservations = me?.customer?.reservations
  const bagCount = items.length
  const bagIsFull = itemCount && bagCount >= itemCount

  const handleReserve = async (navigation) => {
    setMutating(true)
    // try {
    if (!isSignedIn) {
      showPopUp({
        title: "Sign up to reserve your items",
        note: "You need to create an account before you can reserve items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
          navigation.navigate("Modal", {
            screen: "CreateAccountModal",
          })
        },
      })
    } else if (customerStatus === "Authorized") {
      showPopUp({
        title: "You need to choose a plan first",
        note: "Sign up to a plan to continue reserving your items",
        buttonText: "Got it",
        onClose: () => {
          hidePopUp()
          navigation.navigate("Modal", {
            screen: NavigationSchema.PageNames.CreateAccountModal,
            params: {
              initialState: CreateAccountState.ChoosePlan,
              initialUserState: CreateAccountUserState.Admitted,
            },
          })
        },
      })
    } else if (bagCount > itemCount) {
      showPopUp({
        title: "You must remove some items first",
        note: `Your plan has ${itemCount} ${itemCount === 1 ? "slot" : "slots"} but your bag has ${bagCount} items.`,
        buttonText: "Got it",
        onClose: () => hidePopUp(),
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
      await checkItemsAvailability({
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
    }
    setMutating(false)
  }

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
      <View pointerEvents={bottomSheetBackdropIsVisible ? "none" : "auto"} style={{ flexDirection: "column", flex: 1 }}>
        <TabBar
          spaceEvenly
          tabs={["Bag", "Saved", "History"]}
          activeTab={currentView}
          goToPage={(page: BagView) => {
            tracking.trackEvent({
              actionName: (() => {
                if (page === 0) {
                  return TrackSchema.ActionNames.BagTabTapped
                } else if (page === 1) {
                  return TrackSchema.ActionNames.SavedTabTapped
                } else {
                  return TrackSchema.ActionNames.ReservationHistoryTabTapped
                }
              })(),
              actionType: TrackSchema.ActionTypes.Tap,
            })
            setCurrentView(page)
          }}
        />
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={sections}
          keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ListFooterComponent={() => <Spacer pb={80} />}
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
      </View>
    </Container>
  )
})
