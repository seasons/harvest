import { Box, FixedButton, PopUp, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { BAG_NUM_ITEMS } from "App/helpers/constants"
import { color } from "App/Utils"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { Sans } from "Components/Typography"
import { assign, fill, get } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { BagGuestView } from "./BagGuestView"
import { CHECK_ITEMS, GET_BAG, REMOVE_FROM_BAG, REMOVE_FROM_BAG_AND_SAVE_ITEM } from "./BagQueries"
import { BagItem } from "./Components/BagItem"
import { EmptyBagItem } from "./Components/EmptyBagItem"
import { SavedEmptyState } from "./Components/SavedEmptyState"

const SECTION_HEIGHT = 300

enum BagView {
  Bag = 0,
  Saved = 1,
}

export const Bag: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  return <BagGuestView navigation={navigation} />
  const [isMutating, setMutating] = useState(false)
  const [showReserveError, displayReserveError] = useState(null)
  const { data, loading, refetch } = useQuery(GET_BAG, {
    fetchPolicy: "cache-and-network",
  })
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)
  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    update(cache, { data }) {
      const { me } = cache.readQuery({ query: GET_BAG })
      const key = currentView === BagView.Bag ? "bag" : "savedItems"
      const list = me[key]
      const filteredList = list.filter(a => a.id !== data.removeFromBag.id)
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
      const filteredList = list.filter(a => a.id !== data.removeFromBag.id)
      const item = list.find(a => a.id === data.removeFromBag.id)

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

  if (loading) {
    return <Loader />
  }

  const items =
    (data &&
      data.me &&
      data.me.bag.map(item => ({
        ...item,
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      }))) ||
    []

  const savedItems =
    (data &&
      data.me &&
      data.me.savedItems.map(item => ({
        ...item,
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      }))) ||
    []

  const paddedItems = assign(fill(new Array(3), { variantID: "", productID: "" }), items)
  const hasActiveReservation = !!get(data, "me.activeReservation")

  const handleReserve = async navigation => {
    setMutating(true)
    try {
      const { data } = await checkItemsAvailability({
        variables: {
          items: items.map(item => item.variantID),
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
            .filter(a => !!a.reserved)
            .map(a => ({
              variantID: a.id,
            }))
          refetch()
        } else if (code === "510") {
        }
        displayReserveError({
          code,
          data,
        })
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
  const bagSubtitle = hasActiveReservation ? "Your current rotation" : remainingPiecesDisplay

  const ErrorMessage = () => {
    const popUpData = {
      title: "",
      note: "We couldn't process your order because of an unexpected error, please try again later",
      buttonText: "Got it",
      onClose: () => displayReserveError(false),
    }

    if (showReserveError) {
      const { code, data } = showReserveError
      if (code === "511") {
        popUpData.title = "One or more items have been reserved already"
        popUpData.note =
          "Sorry, some of the items you had selected were confirmed before you, please replace them with available items"
      } else {
        popUpData.title = "Sorry!"
        popUpData.note = "We couldn't process your order because of an unexpected error, please try again later"
      }

      return <PopUp data={popUpData} show={showReserveError} />
    }

    return null
  }

  const renderItem = ({ item, index }) => {
    return item.productID.length ? (
      <Box mx={2} mt={isSavedView && index === 0 ? 1 : 0}>
        <BagItem
          removeItemFromBag={deleteBagItem}
          removeFromBagAndSaveItem={removeFromBagAndSaveItem}
          saved={BagView.Saved == currentView || item.status !== "Added"}
          sectionHeight={SECTION_HEIGHT}
          index={index}
          bagItem={item}
          navigation={navigation}
        />
      </Box>
    ) : (
      <EmptyBagItem navigation={navigation} />
    )
  }

  const headerTitle = currentView === BagView.Bag ? "My Bag" : "Saved"
  const headerSubtitle = currentView === BagView.Bag ? bagSubtitle : "Tucked away for later"

  return (
    <Container>
      <FlatList
        data={currentView === BagView.Bag ? paddedItems : savedItems}
        ListHeaderComponent={() => (
          <>
            <Box p={2}>
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
              goToPage={page => {
                setCurrentView(page as BagView)
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
        keyExtractor={(_item, index) => String(index)}
        renderItem={item => {
          return renderItem(item)
        }}
        ListFooterComponent={() => <Spacer mb={96} />}
      />
      {isBagView && !hasActiveReservation && (
        <TouchableWithoutFeedback onPress={() => (!bagIsFull ? displayReserveError(true) : null)}>
          <FixedButton block onPress={() => handleReserve(navigation)} disabled={!bagIsFull} loading={isMutating}>
            Reserve
          </FixedButton>
        </TouchableWithoutFeedback>
      )}
      <ErrorMessage />
    </Container>
  )
}
