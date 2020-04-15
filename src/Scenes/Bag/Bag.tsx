import { Box, FixedButton, Separator, Spacer } from "App/Components"
import { GuestView } from "App/Components/GuestView"
import { Loader } from "App/Components/Loader"
import { BAG_NUM_ITEMS } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { color } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { Sans } from "Components/Typography"
import { assign, fill, get } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, RefreshControl } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { CHECK_ITEMS, GET_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "./BagQueries"
import { BagItem } from "./Components/BagItem"
import { EmptyBagItem } from "./Components/EmptyBagItem"
import { SavedEmptyState } from "./Components/SavedEmptyState"
import { SavedItem } from "./Components/SavedItem"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const SECTION_HEIGHT = 300

enum BagView {
  Bag = 0,
  Saved = 1,
}

export const Bag = screenTrack()((props) => {
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { navigation } = props

  if (!authState?.userSession) {
    return <GuestView navigation={navigation} />
  }

  const insets = useSafeArea()
  const [isMutating, setMutating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)
  const [refreshing, setRefreshing] = useState(false)

  const tracking = useTracking()

  const { data, refetch } = useQuery(GET_BAG, {
    fetchPolicy: "cache-and-network",
  })
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

  if (isLoading) {
    return <Loader />
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }

  const items =
    (data &&
      data.me &&
      data.me.bag.map((item) => ({
        ...item,
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      }))) ||
    []

  const savedItems =
    (data &&
      data.me &&
      data.me.savedItems.map((item) => ({
        ...item,
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      }))) ||
    []

  const paddedItems = assign(fill(new Array(3), { variantID: "", productID: "" }), items)
  const hasActiveReservation = !!get(data, "me.activeReservation")

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
        navigation.navigate("Modal", { screen: "ReservationModal" })
      }
      setMutating(false)
    } catch (e) {
      const { graphQLErrors } = e
      console.warn(graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code, exception } = error.extensions
        let data
        if (code === "511") {
          data = Object.values(exception)
            .filter((a) => !!a.reserved)
            .map((a) => ({
              variantID: a.id,
            }))
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
  const bagCount = items.length
  const remainingPieces = BAG_NUM_ITEMS - bagCount
  const bagIsFull = bagCount === BAG_NUM_ITEMS
  const remainingPiecesDisplay = !bagIsFull
    ? `You have ${remainingPieces} ${remainingPieces === 1 ? "piece" : "pieces"} remaining`
    : "Reserve your order below"

  let bagSubtitle
  if (!hasActiveReservation) {
    bagSubtitle = remainingPiecesDisplay
  } else if (data?.me?.customer?.plan === "Essential" && !!data?.me?.activeReservation?.returnDateDisplay) {
    bagSubtitle = `Return by ${data?.me?.activeReservation?.returnDateDisplay}`
  } else {
    bagSubtitle = "Your current rotation"
  }

  const renderItem = ({ item, index }) => {
    const showSavedItems = BagView.Saved == currentView
    const hideButtons = item.status !== "Added"
    return item.productID.length ? (
      <Box mx={showSavedItems ? 0 : 2} mt={isSavedView && index === 0 ? 1 : 0}>
        {showSavedItems ? (
          <SavedItem
            removeItemFromBag={deleteBagItem}
            sectionHeight={SECTION_HEIGHT}
            bagItem={item}
            navigation={navigation}
          />
        ) : (
          <Box my={2}>
            <BagItem
              hideButtons={hideButtons}
              removeItemFromBag={deleteBagItem}
              removeFromBagAndSaveItem={removeFromBagAndSaveItem}
              sectionHeight={SECTION_HEIGHT}
              index={index}
              bagItem={item}
              navigation={navigation}
            />
          </Box>
        )}
      </Box>
    ) : (
      <EmptyBagItem navigation={navigation} />
    )
  }

  const headerTitle = currentView === BagView.Bag ? "My Bag" : "Saved"
  const footerMarginBottom = currentView === BagView.Bag ? 96 : 2
  const headerSubtitle = currentView === BagView.Bag ? bagSubtitle : "Tucked away for later"
  return (
    <Container insetsBottom={false} insetsTop={false}>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={currentView === BagView.Bag ? paddedItems : savedItems}
        ListHeaderComponent={() => (
          <>
            <Spacer mb={insets.top} />
            <Box px={2} pt={3}>
              <Sans size="3" color="black">
                {headerTitle}
              </Sans>
              <Sans size="2" color="gray">
                {headerSubtitle}
              </Sans>
            </Box>
            <TabBar
              spaceEvenly
              tabs={["Bag", "Saved"]}
              activeTab={currentView}
              goToPage={(page: BagView) => {
                tracking.trackEvent({
                  actionName: page === 0 ? Schema.ActionNames.BagTabTapped : Schema.ActionNames.SavedTabTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                setCurrentView(page)
              }}
            />
          </>
        )}
        ListEmptyComponent={() => {
          return <SavedEmptyState navigation={navigation} />
        }}
        ItemSeparatorComponent={() => {
          if (isSavedView) {
            return null
          }
          return (
            <Box>
              <Separator color={color("black15")} />
            </Box>
          )
        }}
        keyExtractor={(item, index) => String(index) + item.id + String(currentView)}
        renderItem={(item) => {
          return renderItem(item)
        }}
        ListFooterComponent={() => <Spacer mb={footerMarginBottom} />}
      />
      {isBagView && (
        <>
          {hasActiveReservation ? (
            <FixedButton
              block
              variant="primaryWhite"
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.FAQButtonTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                navigation.navigate("Faq")
              }}
            >
              FAQ
            </FixedButton>
          ) : (
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
        </>
      )}
    </Container>
  )
})
