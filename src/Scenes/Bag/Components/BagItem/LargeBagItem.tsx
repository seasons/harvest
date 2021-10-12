import { useNavigation } from "@react-navigation/native"
import { Box, FadeInImage, Flex } from "App/Components"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { BagItemCTAs, BagItemCTAsFragment_BagItem } from "./BagItemCTAs"
import { BagItemProductMetaData, BagItemProductMetaDataFragment_BagItem } from "./BagItemProductMetaData"

const LARGE_BAG_ITEM_HEIGHT = 214

export const LargeBagItem = ({ bagItem, sectionStatus }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  console.log("bagItem", bagItem)
  const variant = bagItem?.productVariant
  const product = variant?.product
  const imageUrl = product?.images?.[0]?.url || ""

  const shadowStyles = {
    shadowColor: "black",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 1,
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductTapped,
          actionType: Schema.ActionTypes.Tap,
          productSlug: product.slug,
          productId: product.id,
          productName: product.name,
        })
        navigation?.navigate("Product", { id: product.id, slug: product.slug })
      }}
    >
      <Box style={shadowStyles}>
        <Wrapper>
          {!!imageUrl && (
            <FadeInImage
              style={{ height: LARGE_BAG_ITEM_HEIGHT, width: LARGE_BAG_ITEM_HEIGHT / PRODUCT_ASPECT_RATIO }}
              resizeMode="contain"
              source={{ uri: imageUrl }}
            />
          )}
          <Flex alignItems="flex-end" flexDirection="column" justifyContent="space-between" px={2} flex={1} py={2}>
            <BagItemProductMetaData variant={variant} />
            <BagItemCTAs bagItem={bagItem} sectionStatus={sectionStatus} size="large" />
          </Flex>
        </Wrapper>
      </Box>
    </TouchableWithoutFeedback>
  )
}

const Wrapper = styled(Flex)<{ isReserved: boolean }>`
  width: 100%;
  flex-direction: row;
  position: relative;
  background-color: ${color("white100")};
  border-radius: 8;
  overflow: hidden;
`
