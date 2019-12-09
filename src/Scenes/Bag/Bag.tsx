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
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"

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
  const [tabNumber, setTabNumber] = useState(0)
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
      <Box p={2}>
        <EmptyBagItemContainer>
          <Flex flex={1} pt="84px" flexDirection="column" alignItems="center">
            <Flex flexWrap="nowrap" flexDirection="column" alignItems="center" alignSelf="center">
              <TouchableOpacity onPress={() => navigation.navigate("Browse")}>
                <Box>
                  <Box my={1} mx="auto">
                    <BagPlus />
                  </Box>
                  <Sans size="2" color="black" textAlign="center">
                    Add item
                  </Sans>
                </Box>
              </TouchableOpacity>
            </Flex>
          </Flex>
        </EmptyBagItemContainer>
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
                <>
                  <Box p={2}>
                    <Sans size="3" color="black">
                      My bag
                    </Sans>
                    <Sans size="2" color="gray">
                      {remainingPiecesDisplay}
                    </Sans>
                  </Box>
                  <TabBar
                    tabs={["Bag", "Saved"]}
                    spaceEvenly
                    activeTab={tabNumber}
                    goToPage={page => {
                      setTabNumber(page)
                      console.log("page : ", page)
                    }}
                  />
                </>
              )}
              ItemSeparatorComponent={() => (
                <Box>
                  <Spacer mb={2} />
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

const EmptyBagItemContainer = styled(Box)`
  background: #f6f6f6;
  border-radius: 8px;
  overflow: hidden;
  height: 270;
`
