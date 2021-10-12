import { useNavigation } from "@react-navigation/native"
import { FadeInImage, Flex } from "App/Components"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { BagItemCTAs, BagItemCTAsFragment_BagItem } from "./BagItemCTAs"
import { BagItemProductMetaData, BagItemProductMetaDataFragment_BagItem } from "./BagItemProductMetaData"

const SMALL_BAG_ITEM_HEIGHT = 148

export const SmallBagItemFragment_BagItem = gql`
  fragment SmallBagItemFragment_BagItem on BagItem {
    id
    productVariant {
      id
      product {
        id
        slug
        name
        images {
          id
          url
        }
      }
    }
    ...BagItemProductMetaDataFragment_BagItem
    ...BagItemCTAsFragment_BagItem
  }
  ${BagItemProductMetaDataFragment_BagItem}
  ${BagItemCTAsFragment_BagItem}
`

export const SmallBagItem = ({ bagItem, sectionStatus }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  console.log("bagItem", bagItem)
  const variant = bagItem?.productVariant
  const product = variant?.product
  const imageUrl = product?.images?.[0]?.url || ""

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
      <Wrapper>
        {!!imageUrl && (
          <FadeInImage
            radius={8}
            style={{ height: SMALL_BAG_ITEM_HEIGHT, width: SMALL_BAG_ITEM_HEIGHT / PRODUCT_ASPECT_RATIO }}
            resizeMode="contain"
            source={{ uri: imageUrl }}
          />
        )}
        <Flex alignItems="flex-end" flexDirection="column" justifyContent="space-between" px={2} flex={1}>
          <BagItemProductMetaData variant={variant} />
          <BagItemCTAs bagItem={bagItem} sectionStatus={sectionStatus} />
        </Flex>
      </Wrapper>
    </TouchableWithoutFeedback>
  )
}

const Wrapper = styled(Flex)<{ isReserved: boolean }>`
  width: 100%;
  flex-direction: row;
  position: relative;
`
