import { Loader } from "App/Components/Loader"
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
import { gql, useMutation } from "@apollo/client"
import { useFocusEffect, useNavigation, useScrollToTop } from "@react-navigation/native"
import analytics from "@segment/analytics-react-native"
import { CHECK_ITEMS, CREATE_DRAFT_ORDER, GetBag_NoCache_Query } from "./BagQueries"
import { useBag } from "./useBag"
import { ReturnItemsPopUp } from "./Components/ReturnItemsPopUp"
import { BagTabPrimaryCTA } from "./Components/BagTabPrimaryCTA"
import { BuyTab } from "./Components/Tabs/BuyTab"
import { RentTab } from "./Components/Tabs/RentTab"

export enum BagView {
  Rent = 0,
  Buy = 1,
}

interface BagProps {
  navigation: NavigationScreenProp<any>
  route: NavigationRoute
}

export const BagFragment_Me = gql`
  fragment BagFragment_Me on Me {
    id
    customer {
      id
      user {
        id
      }
    }
  }
`

export const Bag = screenTrack()((props: BagProps) => {
  const insets = useSafeAreaInsets()
  const { data, refetch, bagSections } = useBag()
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isPrimaryCTAMutating, setIsPrimaryCTAMutating] = useState(false)

  const [showReturnItemPopup, setShowReturnItemPopup] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const flatListRef = useRef(null)
  const { bottomSheetBackdropIsVisible } = useBottomSheetContext()
  const tracking = useTracking()

  const { route } = props
  const routeTab = route?.params?.tab
  const [currentView, setCurrentView] = useState<BagView>(BagView.Rent)

  const windowDimensions = Dimensions.get("window")
  const windowWidth = windowDimensions.width

  const [createDraftOrder] = useMutation(CREATE_DRAFT_ORDER, {
    onCompleted: (res) => {
      setIsPrimaryCTAMutating(false)
      if (res?.createDraftedOrder) {
        navigation.navigate(NavigationSchema.PageNames.Order, { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      showPopUp({
        title: "Sorry!",
        note: "There was an issue creating the order, please try again.",
        buttonText: "Okay",
        onClose: () => {
          hidePopUp()
        },
      })
      console.log("error createDraftOrder ", error)
      setIsPrimaryCTAMutating(false)
    },
  })

  useScrollToTop(flatListRef)

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
      setIsPrimaryCTAMutating(false)
    },
  })

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const isBuyView = BagView.Buy == currentView

  const startReservation = async () => {
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

  const onCartCheckout = () => {
    if (isPrimaryCTAMutating) {
      return
    }
    setIsPrimaryCTAMutating(true)
    createDraftOrder({
      variables: {
        input: {
          productVariantIds: me?.cartItems?.map((item) => item.productVariant.id),
          orderType: "Used",
        },
      },
    })
  }

  useEffect(() => {
    if (addedItems) {
      const userId = me?.customer?.user?.id
      if (!!userId) {
        analytics.identify(userId, { bagItems: addedItems })
      }
    }
  }, [addedItems])

  if (!data) {
    return <Loader />
  }

  const renderItem = ({ item }) => {
    if (isBuyView) {
      console.log("item 2", item)
      return <BuyTab items={item.data} />
    } else {
      return <RentTab />
    }
  }

  let sections
  if (isBuyView) {
    sections = [{ data: me?.cartItems }]
  } else {
    sections = [{ data: null }]
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <View
        pointerEvents={bottomSheetBackdropIsVisible ? "none" : "auto"}
        style={{ flexDirection: "column", flex: 1, paddingTop: insets?.top }}
      >
        <TabBar
          spaceEvenly
          tabs={[{ name: "Rent" }, { name: "Buy", badgeCount: me?.cartItems?.length }]}
          activeTab={currentView}
          goToPage={(page: BagView) => {
            tracking.trackEvent({
              actionName: (() => {
                if (page === 0) {
                  return TrackSchema.ActionNames.RentTabTapped
                } else {
                  return TrackSchema.ActionNames.BuyTabTapped
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
        <BagTabPrimaryCTA
          activeTab={currentView}
          data={data}
          sections={bagSections}
          setShowReturnItemPopup={setShowReturnItemPopup}
          isMutating={isPrimaryCTAMutating}
          setIsMutating={setIsPrimaryCTAMutating}
          startReservation={startReservation}
          onCartCheckout={onCartCheckout}
        />
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
