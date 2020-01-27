import { GET_BAG } from "App/Apollo/Queries"
import { Box, FixedButton, PopUp, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { BAG_NUM_ITEMS } from "App/Redux/reducer"
import { color } from "App/Utils"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { Sans } from "Components/Typography"
import gql from "graphql-tag"
import { assign, fill, get } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { BagItem } from "./Components/BagItem"
import { EmptyBagItem } from "./Components/EmptyBagItem"
import { SavedEmptyState } from "./Components/SavedEmptyState"

const SECTION_HEIGHT = 300

const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

const REMOVE_FROM_BAG = gql`
  mutation RemoveFromBag($id: ID!) {
    removeFromBag(item: $id) {
      id
    }
  }
`

const REMOVE_FROM_BAG_AND_SAVE_ITEM = gql`
  mutation RemoveFromBagAndSaveItem($id: ID!) {
    removeFromBag(item: $id) {
      id
    }
    saveProduct(item: $id, save: true) {
      id
    }
  }
`

enum BagView {
  Bag = 0,
  Saved = 1,
}

export const Bag = ({ navigation, removeItemFromBag }) => {
  const [isMutating, setMutating] = useState(false)
  const [showReserveError, displayReserveError] = useState(null)
  const { data, loading, refetch } = useQuery(GET_BAG, {
    fetchPolicy: "cache-and-network",
  })
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)
  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    update(cache, { data, errors }) {
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
      console.log(me, data)
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
  })
  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM, {
    update(cache, { data, errors }) {
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
      console.log(me, data)
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
  })

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)
  const insets = useSafeArea()

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
    if (isMutating) {
      return
    }
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
        navigation.navigate("ReservationModal")
      }
      setMutating(false)
    } catch (e) {
      const { graphQLErrors } = e
      console.log(graphQLErrors)
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
  const isEmpty = items.length === 0
  const bagCount = items.length
  const remainingPieces = BAG_NUM_ITEMS - bagCount
  const bagIsFull = bagCount === BAG_NUM_ITEMS
  const remainingPiecesDisplay = !bagIsFull
    ? `You have ${remainingPieces} ${remainingPieces === 1 ? "piece" : "pieces"} remaining`
    : "Reserve your order below"
  const bagSubtitle = hasActiveReservation ? "Your current rotation" : remainingPiecesDisplay

  const ErrorMessage = () => {
    if (showReserveError) {
      const { code, data } = showReserveError
      let title, description
      if (code === "511") {
        title = "One or more items have been reserved already"
        description =
          "Sorry, some of the items you had selected were confirmed before you, please replace them with available items"
      } else {
        title = "Sorry!"
        description = "We couldn't process your order because of an unexpected error, please try again later"
      }

      return (
        <PopUp
          theme="light"
          buttonText="Got it"
          title={title}
          note={description}
          show={showReserveError}
          onClose={() => displayReserveError(false)}
        />
      )
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
      <Box style={{ flex: 1, paddingTop: insets.top }}>
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
                  console.log("page : ", page)
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
                <Separator color={color("lightGray")} />
              </Box>
            )
          }}
          keyExtractor={(_item, index) => String(index)}
          renderItem={item => {
            if (isSavedView && isEmpty) {
            }
            return renderItem(item)
          }}
          ListFooterComponent={() => <Spacer mb={96} />}
        />
        {isBagView && !hasActiveReservation && (
          <TouchableWithoutFeedback onPress={() => (!bagIsFull ? displayReserveError(true) : null)}>
            <Box mb={0.5}>
              <FixedButton onPress={() => handleReserve(navigation)} disabled={!bagIsFull}>
                Reserve
              </FixedButton>
            </Box>
          </TouchableWithoutFeedback>
        )}
      </Box>
      <ErrorMessage />
    </Container>
  )
}
