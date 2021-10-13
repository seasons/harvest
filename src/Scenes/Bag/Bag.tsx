import { Loader } from "App/Components/Loader"
import { MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { Schema as NavigationSchema } from "App/Navigation"
import { useBottomSheetContext } from "App/Navigation/BottomSheetContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, RefreshControl, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NavigationRoute, NavigationScreenProp } from "react-navigation"
import { useLazyQuery, useMutation } from "@apollo/client"
import { useFocusEffect, useNavigation, useScrollToTop } from "@react-navigation/native"
import analytics from "@segment/analytics-react-native"
import {
  CHECK_ITEMS,
  DELETE_BAG_ITEM,
  GetBag_NoCache_Query,
  ReservationHistoryTab_Query,
  SavedTab_Query,
} from "./BagQueries"
import { BagTab, ReservationHistoryTab, SavedItemsTab } from "./Components"
import { useBag } from "./useBag"
import { ReturnItemsPopUp } from "./Components/ReturnItemsPopUp"
import { BagTabPrimaryCTA } from "./Components/BagTabPrimaryCTA"

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
  const insets = useSafeAreaInsets()
  const { data, refetch, bagSections } = useBag()
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isPrimaryCTAMutating, setIsPrimaryCTAMutating] = useState(false)

  const [showReturnItemPopup, setShowReturnItemPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const flatListRef = useRef(null)
  const { bottomSheetBackdropIsVisible } = useBottomSheetContext()
  const tracking = useTracking()

  const { route } = props
  const routeTab = route?.params?.tab
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

  const me = data?.me
  const addedItems = bagSections?.find((section) => section.status === "Added")?.bagItems

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS, {
    onCompleted: (res) => {
      setIsPrimaryCTAMutating(false)
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
            title: "One or more items have beåen reserved already",
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
      setIsPrimaryCTAMutating(false)
    },
  })

  const startReservation = async () => {
    console.log("addedItems", addedItems)
    await checkItemsAvailability({
      variables: {
        items: addedItems.map((item) => item.productVariant.id),
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

  useEffect(() => {
    if (data) {
      setIsLoading(false)
      const userId = me?.customer?.user?.id
      if (!!userId) {
        const savedItems = savedTabData?.me?.savedItems?.length || 0
        const baggedItems = me?.bag?.length || 0
        analytics.identify(userId, { bagItems: savedItems + baggedItems })
      }
    }
  }, [data, setIsLoading])

  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM)

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const savedItems = savedTabData?.me?.savedItems

  const isBagView = BagView.Bag == currentView
  const isSavedView = BagView.Saved == currentView

  const bagCount = 0
  const bagIsFull = bagCount >= MAXIMUM_ITEM_COUNT

  const reservationItems = reservationTabData?.me?.customer?.reservations

  if (isLoading) {
    return <Loader />
  }

  const renderItem = ({ item }) => {
    if (isBagView) {
      return <BagTab />
    } else if (isSavedView) {
      return (
        <SavedItemsTab
          items={item.data}
          bagIsFull={bagIsFull}
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
    sections = [{ data: null }]
  } else if (isSavedView) {
    sections = [{ data: savedItems }]
  } else {
    sections = [{ data: reservationItems }]
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
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
          renderItem={(item) => {
            return renderItem(item)
          }}
          ref={flatListRef}
        />
        {isBagView && (
          <BagTabPrimaryCTA
            data={data}
            sections={bagSections}
            setShowReturnItemPopup={setShowReturnItemPopup}
            isMutating={isPrimaryCTAMutating}
            setIsMutating={setIsPrimaryCTAMutating}
            startReservation={startReservation}
          />
        )}
      </View>
      <ReturnItemsPopUp
        setShowReturnItemPopup={setShowReturnItemPopup}
        show={showReturnItemPopup}
        windowWidth={windowWidth}
        startReservation={startReservation}
      />
    </Container>
  )
})
