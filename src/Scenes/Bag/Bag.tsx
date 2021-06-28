import { Loader } from "App/Components/Loader"
import { PauseStatus } from "App/Components/Pause/PauseButtons"
import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { GetBag_Cached_Query as GetBag_Cached_Query_Type } from "App/generated/GetBag_Cached_Query"
import { DEFAULT_ITEM_COUNT } from "App/helpers/constants"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_LOCAL_BAG } from "App/queries/clientQueries"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { assign, fill } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl, StatusBar, View } from "react-native"
import { NavigationRoute, NavigationScreenProp } from "react-navigation"

import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useFocusEffect, useScrollToTop } from "@react-navigation/native"
import { Box, Button, Spacer } from "@seasons/eclipse"
import analytics from "@segment/analytics-react-native"

import { State as CreateAccountState, UserState as CreateAccountUserState } from "../CreateAccount/CreateAccount"
import {
  CHECK_ITEMS,
  GetBag_NoCache_Query,
  REMOVE_FROM_BAG,
  REMOVE_FROM_BAG_AND_SAVE_ITEM,
  ReservationHistoryTab_Query,
  SavedTab_Query,
  GetBag_Cached_Query,
} from "./BagQueries"
import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"
import { BagCostWarning } from "./Components/BagCostWarning"

export enum BagView {
  Bag = 0,
  Saved = 1,
  History = 2,
}

interface BagProps {
  navigation: NavigationScreenProp<any>
  route: NavigationRoute
}

export const Bag = screenTrack()((props: BagProps) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setMutating] = useState(false)
  const [itemCount, setItemCount] = useState(DEFAULT_ITEM_COUNT)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const flatListRef = useRef(null)
  const { bottomSheetBackdropIsVisible } = useBottomSheetContext()
  const tracking = useTracking()

  const { navigation, route } = props
  const routeTab = route?.params?.tab
  const isSignedIn = authState.isSignedIn
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)

  useScrollToTop(flatListRef)

  const [
    getReservationTab,
    {
      previousData: previousReservationTabData,
      data: reservationTabData = previousReservationTabData,
      loading: loadingReservationTab,
    },
  ] = useLazyQuery(ReservationHistoryTab_Query)

  const [
    getSavedTab,
    { previousData: previousSavedTabData, data: savedTabData = previousSavedTabData, loading: loadingSavedTab },
  ] = useLazyQuery(SavedTab_Query)

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content")
      if (!!routeTab && currentView !== routeTab) {
        setCurrentView(routeTab)
      }
    }, [])
  )

  const { previousData, data = previousData, refetch } = useQuery<GetBag_NoCache_Query_Type>(GetBag_NoCache_Query)
  const { previousData: cachedPreviousData, data: cachedData = cachedPreviousData } = useQuery<
    GetBag_Cached_Query_Type
  >(GetBag_Cached_Query)
  const { data: localItems } = useQuery(GET_LOCAL_BAG)
  const [showBagCostWarning, setShowBagCostWarning] = useState(false)

  const me = data?.me
  const customerStatus = me?.customer?.status
  const markedAsReturned = !!me?.activeReservation?.returnedAt

  useEffect(() => {
    if (data) {
      const dataItemCount = data?.me?.customer?.membership?.plan?.itemCount
      if (!!dataItemCount && dataItemCount !== itemCount && isSignedIn) {
        setItemCount(dataItemCount)
      }
      setIsLoading(false)
      const userId = me?.customer?.user?.id
      if (!!userId) {
        const savedItems = savedTabData?.me?.savedItems?.length || 0
        const baggedItems = me?.bag?.length || 0
        analytics.identify(userId, { bagItems: savedItems + baggedItems })
      }
    }
  }, [data, setIsLoading, setItemCount])

  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG)

  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM)

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

  const savedItems = savedTabData?.me?.savedItems

  const bagItems = (itemCount && assign(fill(new Array(itemCount), { variantID: "", productID: "" }), items)) || []
  const hasActiveReservation = !!me?.activeReservation

  const shippingAddress = data?.me?.customer?.detail?.shippingAddress

  const isBagView = BagView.Bag == currentView
  const isSavedView = BagView.Saved == currentView
  const bagCount = items.length
  const bagIsFull = itemCount && bagCount >= itemCount

  const reservationItems = reservationTabData?.me?.customer?.reservations

  const handleReserve = async () => {
    setMutating(true)
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
            query: GetBag_NoCache_Query,
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
          cachedData={cachedData}
        />
      )
    } else if (isSavedView) {
      return (
        <SavedItemsTab
          items={item.data}
          bagIsFull={bagIsFull}
          hasActiveReservation={hasActiveReservation}
          deleteBagItem={deleteBagItem}
          loading={loadingSavedTab && !savedTabData}
        />
      )
    } else {
      return <ReservationHistoryTab items={item.data} loading={loadingReservationTab && !reservationTabData} />
    }
  }

  let sections
  if (isBagView) {
    sections = [{ data: bagItems }]
  } else if (isSavedView) {
    sections = [{ data: savedItems }]
  } else {
    sections = [{ data: reservationItems }]
  }

  const PrimaryCTA = () => {
    if (!isBagView && pauseStatus !== "paused") {
      return null
    }

    let button = null

    let handlePress = () => {
      tracking.trackEvent({
        actionName: TrackSchema.ActionNames.ReserveButtonTapped,
        actionType: TrackSchema.ActionTypes.Tap,
        bagIsFull,
      })
      if (!hasActiveReservation) {
        handleReserve()
      } else {
        navigation.navigate(
          markedAsReturned
            ? NavigationSchema.PageNames.ReturnYourBagConfirmation
            : NavigationSchema.PageNames.ReturnYourBag
        )
      }
    }

    if (hasActiveReservation) {
      if (me?.activeReservation?.status === "Delivered") {
        button = (
          <Button block onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryWhite">
            {markedAsReturned ? "Return Instructions" : "Return Bag"}
          </Button>
        )
      }
    } else {
      button = (
        <Button
          block
          onPress={handlePress}
          disabled={!bagIsFull || isMutating}
          loading={isMutating}
          variant="primaryBlack"
        >
          Reserve
        </Button>
      )
    }

    return (
      button && (
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Spacer mb={2} />
          <Box px={2}>{button}</Box>
          <Spacer mb={2} />
        </FadeBottom2>
      )
    )
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
                  if (!savedTabData) {
                    getSavedTab()
                  }
                  return TrackSchema.ActionNames.SavedTabTapped
                } else {
                  if (!reservationTabData) {
                    getReservationTab()
                  }
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
          ref={flatListRef}
          ListFooterComponent={() => <Spacer pb={80} />}
        />
        <PrimaryCTA />
        <BagCostWarning show={showBagCostWarning} setShow={setShowBagCostWarning} />
      </View>
    </Container>
  )
})
