import { Box, Flex, Sans, Separator } from "App/Components"
import React from "react"
import { SavedItem, SavedItemFragment_BagItem } from "./SavedItem"
import { ScrollView, TouchableOpacity } from "react-native"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { SavedTab_Query } from "../BagQueries"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { useTracking, Schema } from "App/utils/track"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/queries/browseQueries"
import { useNavigation } from "@react-navigation/native"
import { gql } from "@apollo/client"

const dimensions = Dimensions.get("window")
const windowWidth = dimensions.width

export const SavedItemRowFragment_BagItem = gql`
  fragment SavedItemRowFragment_BagItem on BagItem {
    id
    productVariant {
      product {
        id
      }
    }
    ...SavedItemFragment_BagItem
  }
  ${SavedItemFragment_BagItem}
`

export const SavedItemRow = ({ bagItem, deleteBagItem, bagIsFull, hasActiveReservation }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  if (!bagItem) {
    return null
  }
  const variant = bagItem?.productVariant
  const product = variant?.product

  const onRemove = () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.SavedItemRemoved,
      actionType: Schema.ActionTypes.Tap,
      productSlug: product.slug,
      productId: product.id,
      variantId: variant.id,
    })

    deleteBagItem({
      variables: {
        itemID: bagItem?.id,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: SavedTab_Query,
        },
        {
          query: GET_PRODUCT,
          variables: {
            where: {
              id: product.id,
            },
          },
        },
        {
          query: GET_BROWSE_PRODUCTS,
          variables: {
            name: "all",
            first: 10,
            skip: 0,
            categoryName: "all",
            orderBy: "publishedAt_DESC",
            sizes: [],
          },
        },
      ],
    })
  }

  return (
    <Box height={243} key={bagItem.id} style={{ position: "relative" }}>
      <WhiteBackground />
      <BlackBackground />
      <ScrollView
        snapToOffsets={[windowWidth, windowWidth + 103]}
        horizontal
        decelerationRate="fast"
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Box width={windowWidth} style={{ backgroundColor: color("white100") }} py={2}>
          <SavedItem
            hasActiveReservation={hasActiveReservation}
            bagIsFull={bagIsFull}
            navigation={navigation}
            bagItem={bagItem}
          />
        </Box>
        <RemoveWrapper alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={onRemove}>
            <Box py={4}>
              <Sans size="4" style={{ textDecorationLine: "underline" }} color="white100">
                Remove
              </Sans>
            </Box>
          </TouchableOpacity>
        </RemoveWrapper>
      </ScrollView>
      <Separator color={color("black10")} />
    </Box>
  )
}

const RemoveWrapper = styled(Flex)`
  width: 103;
  height: 100%;
  background-color: ${color("black100")};
`

const WhiteBackground = styled(Box)`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  height: 100%;
  background-color: ${color("white100")};
`
const BlackBackground = styled(Box)`
  position: absolute;
  width: 50%;
  background-color: ${color("black100")};
  right: 0;
  top: 0;
  height: 100%;
`
