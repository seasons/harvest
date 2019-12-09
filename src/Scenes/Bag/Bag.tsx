import { Box, ErrorPopUp, FixedButton, Flex, Separator, Spacer } from "App/Components"
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
import SortableList from "react-native-sortable-list"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { BagPlus } from "../../../assets/svgs"
import { EmptyState } from "./Components"
import { BagItem } from "./Components/BagItem"

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
        items {
          id
        }
      }
    }
  }
`

export const BagComponent = ({ navigation, bag, removeItemFromBag }) => {
  const [showReserveError, displayReserveError] = useState(null)
  const { variables, data } = useQuery(GET_BAG)
  const [checkItemsAvailability] = useMutation(CHECK_ITEMS)
  const insets = useSafeArea()

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
  const bagIsEmpty = bag.itemCount === 0
  const bagIsFull = bag.itemCount === BAG_NUM_ITEMS
  const remainingPiecesDisplay = !bagIsFull
    ? `You have ${remainingPieces} ${remainingPieces === 1 ? "piece" : "pieces"} remaining`
    : "Reserve your order below"

  const emptyBagItem = index => {
    return (
      <Box p={2} style={{ height: SECTION_HEIGHT }}>
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box>
            <Sans size="3">{index + 1}.</Sans>
            <Sans size="2" color="gray">
              Add your item
            </Sans>
          </Box>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            <TouchableWithoutFeedback onPress={() => null}>
              <BagPlus />
            </TouchableWithoutFeedback>
            <Spacer mr={3} />
          </Flex>
        </Flex>
      </Box>
    )
  }

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

  const renderItem = ({ data, index }) => {
    return data.productID.length ? (
      <Box mx={2}>
        <BagItem removeItemFromBag={removeItemFromBag} sectionHeight={SECTION_HEIGHT} index={index} bagItem={data} />
      </Box>
    ) : (
      emptyBagItem(index)
    )
  }

  return (
    <Container>
      <Box style={{ flex: 1, paddingTop: insets.top }}>
        {bagIsEmpty ? (
          <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="center" alignContent="center">
            <EmptyState remainingPieces={remainingPieces} navigation={navigation} />
          </Flex>
        ) : (
          <Box>
            <SortableList
              data={bag.items}
              renderHeader={() => {
                return (
                  <Box p={2}>
                    <Sans size="3" color="black">
                      My bag
                    </Sans>
                    <Sans size="2" color="gray">
                      {remainingPiecesDisplay}
                    </Sans>
                  </Box>
                )
              }}
              ItemSeparatorComponent={() => (
                <Box px={2}>
                  <Spacer mb={2} />
                  <Separator color={color("lightGray")} />
                  <Spacer mb={2} />
                </Box>
              )}
              keyExtractor={(_item, index) => String(index)}
              renderRow={item => renderItem(item)}
              renderFooter={() => <Spacer mb={80} />}
            />
            <TouchableWithoutFeedback onPress={() => (!bagIsFull ? displayReserveError(true) : null)}>
              <FixedButton onPress={() => handleReserve(navigation)} disabled={!bagIsFull}>
                Reserve
              </FixedButton>
            </TouchableWithoutFeedback>
          </Box>
        )}
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
