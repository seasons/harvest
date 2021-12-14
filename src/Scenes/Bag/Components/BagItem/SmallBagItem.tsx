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

export const BagItemFragment_BagItem = gql`
  fragment BagItemFragment_BagItem on BagItem {
    id
    productVariant {
      id
      price {
        id
        buyUsedAdjustedPrice
      }
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

export const SmallBagItem: React.FC<{ bagItem: any; sectionStatus?: string; showBuyPrice?: boolean }> = ({
  bagItem,
  sectionStatus,
  showBuyPrice,
}) => {
  const tracking = useTracking()
  const navigation = useNavigation()

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
        <Flex alignItems="flex-end" flexDirection="column" justifyContent="space-between" pl={2} flex={1}>
          <BagItemProductMetaData variant={variant} showBuyPrice={showBuyPrice} />
          {sectionStatus && <BagItemCTAs bagItem={bagItem} sectionStatus={sectionStatus} size="small" />}
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
