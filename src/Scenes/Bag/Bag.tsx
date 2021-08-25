import { Loader } from "App/Components/Loader"
import { PauseStatus } from "App/Components/Pause/PauseButtons"
import { GetBag_Cached_Query as GetBag_Cached_Query_Type } from "App/generated/GetBag_Cached_Query"
import { DEFAULT_ITEM_COUNT } from "App/helpers/constants"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, RefreshControl, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NavigationRoute, NavigationScreenProp } from "react-navigation"

import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useFocusEffect, useScrollToTop } from "@react-navigation/native"
import { Box, Button, Flex, Spacer } from "@seasons/eclipse"
import analytics from "@segment/analytics-react-native"

import {
  State as CreateAccountState, UserState as CreateAccountUserState
} from "../CreateAccount/CreateAccount"
import {
  CHECK_ITEMS, DELETE_BAG_ITEM, GetBag_Cached_Query, GetBag_NoCache_Query,
  REMOVE_FROM_BAG_AND_SAVE_ITEM, ReservationHistoryTab_Query, SavedTab_Query
} from "./BagQueries"
import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"
import { BagBottomBar } from "./Components/BagBottomBar"
import { BagCostWarning } from "./Components/BagCostWarning"
import { useBag } from "./useBag"

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
  const insets = useSafeAreaInsets()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setMutating] = useState(false)
  const [planItemCount, setPlanItemCount] = useState(DEFAULT_ITEM_COUNT)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const flatListRef = useRef(null)
  const { bottomSheetBackdropIsVisible } = useBottomSheetContext()
  const tracking = useTracking()

  const { navigation, route } = props
  const routeTab = route?.params?.tab
  const isSignedIn = authState.isSignedIn
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)

  const windowDimensions = Dimensions.get("window")
  const windowWidth = windowDimensions.width

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

  const { previousData: cachedPreviousData, data: cachedData = cachedPreviousData } = useQuery<
    GetBag_Cached_Query_Type
  >(GetBag_Cached_Query)

  const { data, bagItems, refetch } = useBag()
  const [showBagCostWarning, setShowBagCostWarning] = useState(false)

  const me = data?.me
  const customerStatus = me?.customer?.status
  const markedAsReturned = !!me?.activeReservation?.returnedAt

  useEffect(() => {
    if (data) {
      const _planItemCount = data?.me?.customer?.membership?.plan?.itemCount
      if (!!_planItemCount && _planItemCount !== planItemCount && isSignedIn) {
        setPlanItemCount(_planItemCount)
      }
      setIsLoading(false)
      const userId = me?.customer?.user?.id
      if (!!userId) {
        const savedItems = savedTabData?.me?.savedItems?.length || 0
        const baggedItems = me?.bag?.length || 0
        analytics.identify(userId, { bagItems: savedItems + baggedItems })
      }
    }
  }, [data, setIsLoading, setPlanItemCount])

  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM)

  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM)

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS, {
    onCompleted: (res) => {
      setMutating(false)
      setShowBagCostWarning(false)
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
      setShowBagCostWarning(false)
      setMutating(false)
    },
  })

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const savedItems = savedTabData?.me?.savedItems

  const hasActiveReservation = !!me?.activeReservation

  const shippingAddress = data?.me?.customer?.detail?.shippingAddress

  const isBagView = BagView.Bag == currentView
  const isSavedView = BagView.Saved == currentView

  const bagCount = bagItems.length
  const bagIsFull = planItemCount && bagCount >= planItemCount

  const reservationItems = reservationTabData?.me?.customer?.reservations
  const nextFreeSwapDate = me?.nextFreeSwapDate
  const swapNotAvailable = nextFreeSwapDate?.length > 0 && DateTime.fromISO(nextFreeSwapDate) > DateTime.local()

  const handleCheckItems = async () => {
    await checkItemsAvailability({
      variables: {
        items: bagItems.map((item) => item.variantID),
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
    } else if (bagCount > planItemCount) {
      showPopUp({
        title: "You must remove some items first",
        note: `Your plan has ${planItemCount} ${
          planItemCount === 1 ? "slot" : "slots"
        } but your bag has ${bagCount} items.`,
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
      if (swapNotAvailable) {
        setShowBagCostWarning(true)
        return
      }
      await handleCheckItems()
    }
    setMutating(false)
  }

  if (isLoading) {
    return <Loader />
  }

  const pauseRequest = me?.customer?.membership?.pauseRequests?.[0]
  const pausePending = pauseRequest?.pausePending
  let pauseStatus: PauseStatus = "active"

  const hasActiveReservationAndBagRoom =
    hasActiveReservation &&
    planItemCount > me?.activeReservation?.products?.length &&
    ["Queued", "Picked", "Packed", "Delivered", "Received", "Shipped"].includes(me?.activeReservation?.status)

  if (customerStatus === "Paused") {
    pauseStatus = "paused"
  } else if (pausePending) {
    pauseStatus = "pending"
  }

  const renderItem = ({ item }) => {
    if (isBagView) {
      return (
        <BagTab
          bagItems={bagItems}
          itemCount={planItemCount}
          data={data}
          pauseStatus={pauseStatus}
          items={item.data}
          removeFromBagAndSaveItem={removeFromBagAndSaveItem}
          deleteBagItem={deleteBagItem}
          setItemCount={setPlanItemCount}
          cachedData={cachedData}
        />
      )
    } else if (isSavedView) {
      return (
        <SavedItemsTab
          itemCount={planItemCount}
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

  const bagItemsWithEmptyItems = assign(fill(new Array(planItemCount), { variantID: "", productID: "" }), bagItems)

  let sections
  if (isBagView) {
    sections = [
      {
        data: bagItemsWithEmptyItems?.sort((a, b) => {
          const aWeight = a.status === "Reserved" ? 1 : 0
          const bWeight = b.status === "Reserved" ? 1 : 0
          return aWeight - bWeight
        }),
      },
    ]
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
      if (!hasActiveReservation || hasActiveReservationAndBagRoom) {
        handleReserve()
      } else {
        navigation.navigate(
          markedAsReturned
            ? NavigationSchema.PageNames.ReturnYourBagConfirmation
            : NavigationSchema.PageNames.ReturnYourBag
        )
      }
    }

    if (hasActiveReservationAndBagRoom) {
      button = <BagBottomBar bagItems={bagItems} />
    } else if (hasActiveReservation) {
      if (me?.activeReservation?.status === "Delivered") {
        if (markedAsReturned) {
          const returnLabelUrl = me?.activeReservation?.returnedPackage?.shippingLabel?.trackingURL
          button = (
            <Flex flexDirection="row" justifyContent="space-between">
              {returnLabelUrl && (
                <Button
                  width={windowWidth / 2 - 20}
                  onPress={() => navigation.navigate("Webview", { uri: returnLabelUrl })}
                  disabled={isMutating}
                  loading={isMutating}
                  variant="primaryWhite"
                >
                  Return label
                </Button>
              )}
              <Button
                width={returnLabelUrl ? windowWidth / 2 - 20 : windowWidth - 20}
                onPress={handlePress}
                disabled={isMutating}
                loading={isMutating}
                variant="primaryBlack"
              >
                How to return
              </Button>
            </Flex>
          )
        } else {
          button = (
            <Button block onPress={handlePress} disabled={isMutating} loading={isMutating} variant="primaryWhite">
              Return bag
            </Button>
          )
        }
      }
    } else {
      button = <BagBottomBar bagItems={bagItems} />
    }

    return (
      button && (
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Spacer mb={2} />
          <Box>{button}</Box>
          <Spacer mb={2} />
        </FadeBottom2>
      )
    )
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <View
        pointerEvents={bottomSheetBackdropIsVisible ? "none" : "auto"}
        style={{ flexDirection: "column", flex: 1, paddingTop: insets?.top }}
      >
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
        <BagCostWarning
          onCancel={() => {
            setShowBagCostWarning(false)
            setMutating(false)
          }}
          nextFreeSwapDate={nextFreeSwapDate}
          show={showBagCostWarning}
          onCTAPress={async () => await handleCheckItems()}
        />
      </View>
    </Container>
  )
})
