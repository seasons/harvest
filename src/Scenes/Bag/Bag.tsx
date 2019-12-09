import { Box, ErrorPopUp, FixedButton, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { removeItemFromBag } from "App/Redux/actions"
import { BAG_NUM_ITEMS } from "App/Redux/reducer"
import { color } from "App/Utils"
import { Container } from "Components/Container"
import { TabBar } from "Components/TabBar"
import { Sans } from "Components/Typography"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { BagItem } from "./Components/BagItem"
import { EmptyBagItem } from "./Components/EmptyBagItem"

const SECTION_HEIGHT = 300

const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

const GET_BAG = gql`
  query GetBag {
    me {
      bag {
        id
        productVariant {
          id
          product {
            id
          }
        }
        position
        saved
      }
    }
  }
`

enum BagView {
  Bag = 0,
  Saved = 1,
}

export const BagComponent = ({ navigation, bag, removeItemFromBag }) => {
  const [showReserveError, displayReserveError] = useState(null)
  const { variables, data, loading } = useQuery(GET_BAG)
  const [currentView, setCurrentView] = useState<BagView>(BagView.Bag)
  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)
  const insets = useSafeArea()

  if (loading) {
    return <Loader />
  }

  const bag2 = data.me.bag.map(item => ({
    variantID: item.productVariant.id,
    productID: item.productVariant.product.id,
  }))

  console.log("bag2: ", bag2)

  if (!bag || !bag.items) {
    return null
  }

  const handleReserve = async navigation => {
    try {
      const { data } = await checkItemsAvailability({
        variables: {
          items: bag.items.map(item => item.variantID),
        },
      })
      if (data.checkItemsAvailability) {
        navigation.navigate("ReservationModal")
      }
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

          for (let item of data) {
            removeItemFromBag(item)
          }
        } else if (code === "510") {
        }
        displayReserveError({
          code,
          data,
        })
      }
    }
  }

  const remainingPieces = BAG_NUM_ITEMS - bag.itemCount
  const bagIsFull = bag.itemCount === BAG_NUM_ITEMS
  const remainingPiecesDisplay = !bagIsFull
    ? `You have ${remainingPieces} ${remainingPieces === 1 ? "piece" : "pieces"} remaining`
    : "Reserve your order below"

  const ErrorMessage = () => {
    if (showReserveError) {
      const { code, data } = showReserveError
      let title, description
      if (code === "511") {
        title = "One or more items have been reserved already"
        description =
          "Sorry, some of the items you had selected were confirmed before you, please replace them with available items"
      } else {
        title = "Pick all 3 items before reserving!"
        description = "Before reserving your order, make sure you've selected all 3 pieces."
      }

      return (
        <ErrorPopUp
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
      <Box mx={2}>
        <BagItem removeItemFromBag={removeItemFromBag} sectionHeight={SECTION_HEIGHT} index={index} bagItem={item} />
      </Box>
    ) : (
      <EmptyBagItem navigation={navigation} />
    )
  }

  const headerTitle = currentView === BagView.Bag ? "My Bag" : "Saved"
  const headerSubtitle = currentView === BagView.Bag ? remainingPiecesDisplay : "Tucked away for later"

  return (
    <Container>
      <Box style={{ flex: 1, paddingTop: insets.top }}>
        <FlatList
          data={bag.items}
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
                tabs={["Bag", "Saved"]}
                spaceEvenly
                activeTab={currentView}
                goToPage={page => {
                  setCurrentView(page as BagView)
                  console.log("page : ", page)
                }}
              />
            </>
          )}
          ItemSeparatorComponent={() => (
            <Box>
              <Separator color={color("lightGray")} />
            </Box>
          )}
          keyExtractor={(_item, index) => String(index)}
          renderItem={item => renderItem(item)}
          ListFooterComponent={() => <Spacer mb={80} />}
        />
        <TouchableWithoutFeedback onPress={() => (!bagIsFull ? displayReserveError(true) : null)}>
          <FixedButton onPress={() => handleReserve(navigation)} disabled={!bagIsFull}>
            Reserve
          </FixedButton>
        </TouchableWithoutFeedback>
      </Box>
      <ErrorMessage />
    </Container>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeItemFromBag,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag } = state
  return { bag }
}

export const Bag = connect(mapStateToProps, mapDispatchToProps)(BagComponent)
