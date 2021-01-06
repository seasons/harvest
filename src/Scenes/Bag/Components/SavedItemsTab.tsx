import { Box, Flex, Sans, Separator } from "App/Components"
import React from "react"

import { useNavigation } from "@react-navigation/native"

import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
import { SavedItem } from "./SavedItem"
import { ScrollView, TouchableOpacity } from "react-native"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { GET_BAG } from "../BagQueries"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { useTracking, Schema } from "App/utils/track"
import { GetBagAndSavedItems_me_bag_productVariant_product_variants } from "App/generated/GetBagAndSavedItems"
import { get, head } from "lodash"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/queries/browseQueries"

const dimensions = Dimensions.get("window")
const windowWidth = dimensions.width

const ItemRow = ({ bagItem, navigation, deleteBagItem, bagIsFull, hasActiveReservation }) => {
  const tracking = useTracking()

  if (!bagItem) {
    return null
  }
  const variantToUse: GetBagAndSavedItems_me_bag_productVariant_product_variants = head(
    (get(bagItem, "productVariant.product.variants") || []).filter((a) => a.id === bagItem.productVariant.id)
  )
  const product = get(bagItem, "productVariant.product")

  if (!product) {
    return null
  }

  const onRemove = () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.SavedItemRemoved,
      actionType: Schema.ActionTypes.Tap,
      productSlug: product.slug,
      productId: product.id,
      variantId: variantToUse.id,
    })

    deleteBagItem({
      variables: {
        id: variantToUse.id,
        saved: true,
      },
      refetchQueries: [
        {
          query: GET_BAG,
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
            variantToUse={variantToUse}
            product={product}
          />
        </Box>
        <RemoveWrapper alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={onRemove}>
            <Box py={4}>
              <Sans size="1" style={{ textDecorationLine: "underline" }} color="white100">
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

export const SavedItemsTab: React.FC<{ items; deleteBagItem; hasActiveReservation; bagIsFull }> = ({
  items,
  deleteBagItem,
  hasActiveReservation,
  bagIsFull,
}) => {
  const navigation = useNavigation()

  return (
    <Box>
      {items?.length ? (
        items.map((bagItem, index) => {
          return (
            <ItemRow
              key={index}
              bagItem={bagItem}
              navigation={navigation}
              deleteBagItem={deleteBagItem}
              bagIsFull={bagIsFull}
              hasActiveReservation={hasActiveReservation}
            />
          )
        })
      ) : (
        <BagEmptyState currentView={BagView.Saved} />
      )}
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
