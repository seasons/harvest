import { ProductPriceText } from "@seasons/eclipse"
import { Box, Sans } from "App/Components"
import React from "react"
import { truncate } from "lodash"
import gql from "graphql-tag"

export const BagItemProductMetaDataFragment_BagItem = gql`
  fragment BagItemProductMetaDataFragment_BagItem on BagItem {
    productVariant {
      id
      displayShort
      price {
        id
        buyUsedAdjustedPrice
      }
      product {
        id
        name
        rentalPrice
        retailPrice
        brand {
          id
          name
        }
      }
    }
  }
`

export const BagItemProductMetaData: React.FC<{ variant: any; showBuyPrice?: boolean }> = ({
  variant,
  showBuyPrice,
}) => {
  const product = variant?.product

  if (!product) {
    return null
  }

  let leftPriceText
  if (showBuyPrice) {
    leftPriceText = `${variant?.price?.buyUsedAdjustedPrice / 100}`
  } else {
    leftPriceText = `${product?.rentalPrice} / mo`
  }

  return (
    <Box width="100%">
      <Sans size="3">{product?.brand?.name}</Sans>
      <Sans size="3" color="black50">
        {truncate(product?.name, {
          length: 22,
          separator: "...",
        })}
      </Sans>
      <Sans size="3" color="black50">
        ${leftPriceText} | ${product?.retailPrice} retail
      </Sans>
      <Sans size="3" color="black50">
        Size {variant?.displayShort}
      </Sans>
    </Box>
  )
}
