import React, { useState } from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { EmptyState } from "./Components"
import { Spacer, Flex, Box, Separator, FixedButton, ErrorPopUp } from "App/Components"
import { FlatList } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { TouchableWithoutFeedback } from "react-native"
import { color } from "App/Utils"
import { BagPlus } from "../../../assets/svgs"
import { BAG_NUM_ITEMS } from "App/Redux/reducer"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { removeItemFromBag } from "App/Redux/actions"
import { BagItem } from "./Components/BagItem"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"

const SECTION_HEIGHT = 200

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions) {
    reserveItems(items: $items, options: $options) {
      id
    }
  }
`

export const BagComponent = ({ navigation, bag, removeItemFromBag }) => {
  const [showReserveError, displayReserveError] = useState(false)
  const [reserveItems] = useMutation(RESERVE_ITEMS)
  const insets = useSafeArea()

  if (!bag || !bag.items) {
    return null
  }

  const handleReserve = async navigation => {
    try {
      const result = await reserveItems({
        variables: {
          items: bag.items.map(item => item.variantID),
          options: {
            dryRun: true,
          },
        },
      })
      if (result) {
        navigation.navigate("ReservationModal")
      }
    } catch (e) {
      const { graphQLErrors } = e
      console.log(graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        debugger
        const { code, exception } = error.extensions
        if (code === "511") {
          const data = Object.values(exception)
            .filter(a => !!a.reserved)
            .map(a => ({
              variantID: a.id,
            }))

          for (let item of data) {
            removeItemFromBag(item)
          }
        }
      }
      displayReserveError(true)
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

  const renderItem = ({ item, index }) => {
    return item.productID.length ? (
      <Box mx={2}>
        <BagItem removeItemFromBag={removeItemFromBag} sectionHeight={SECTION_HEIGHT} index={index} bagItem={item} />
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
            <FlatList
              data={bag.items}
              ListHeaderComponent={() => (
                <Box p={2}>
                  <Sans size="3" color="black">
                    My bag
                  </Sans>
                  <Sans size="2" color="gray">
                    {remainingPiecesDisplay}
                  </Sans>
                </Box>
              )}
              ItemSeparatorComponent={() => (
                <Box px={2}>
                  <Spacer mb={2} />
                  <Separator color={color("lightGray")} />
                  <Spacer mb={2} />
                </Box>
              )}
              keyExtractor={(_item, index) => String(index)}
              renderItem={item => renderItem(item)}
              ListFooterComponent={() => <Spacer mb={200} />}
            />
            <TouchableWithoutFeedback onPress={() => (!bagIsFull ? displayReserveError(true) : null)}>
              <FixedButton onPress={() => handleReserve(navigation)} disabled={!bagIsFull}>
                Reserve
              </FixedButton>
            </TouchableWithoutFeedback>
          </Box>
        )}
      </Box>
      <ErrorPopUp
        buttonText="Got it"
        title="Pick all 3 items before reserving!"
        note="Before reserving your order, make sure you've selected all 3 pieces."
        show={showReserveError}
        onClose={() => displayReserveError(false)}
      />
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

export const Bag = connect(
  mapStateToProps,
  mapDispatchToProps
)(BagComponent)
