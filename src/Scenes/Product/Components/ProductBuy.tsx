import {
  GetProduct_products, GetProduct_products_brand_products_variants
} from "App/generated/GetProduct"
import React from "react"
import { Linking } from "react-native"
import styled from "styled-components/native"

import { Button, Flex, Sans, Spacer } from "@seasons/eclipse"

const ProductBuyNew: React.FC<{
  price: string
  brandName: string
  availableForSale: boolean
  onBuyNew: () => void
  onNavigateToPartner: () => void
}> = ({ price, brandName, onBuyNew, onNavigateToPartner, availableForSale }) => {
  return (
    <Flex flexDirection="column" px={3} pb={3}>
      <Sans color="black100" size="4" weight="medium">
        Available from Judy Turner
      </Sans>
      <Spacer mb={2} />
      {availableForSale ? (
        <Button variant="primaryBlack" block onPress={onBuyNew}>
          Buy new for {price}
        </Button>
      ) : (
        <Button variant="primaryGray" block disabled>
          Sold Out
        </Button>
      )}
      <Spacer mb={2} />
      <Sans size="3" opacity={0.5} color="black100">
        Orders fulfilled by{" "}
        <UnderlinedSans size="3" onPress={() => onNavigateToPartner()}>
          {brandName}
        </UnderlinedSans>
        . Payment & shipping information on file will be used for one-tap checkout.
      </Sans>
    </Flex>
  )
}

const ProductBuyUsed: React.FC<{
  price: string
  availableForSale: boolean
  onBuyUsed: () => void
}> = ({ price, availableForSale, onBuyUsed }) => (
  <Flex flexDirection="column" px={3} pb={3}>
    <Sans color="black100" size="4" weight="medium">
      Available from Seasons
    </Sans>
    <Spacer mb={2} />
    {availableForSale ? (
      <Button variant="primaryBlack" block onPress={onBuyUsed}>
        Buy used for {price}
      </Button>
    ) : (
      <Button variant="primaryGray" block disabled>
        Sold Out
      </Button>
    )}
    <Spacer mb={2} />
    <Sans size="3" opacity={0.5} color="black100">
      Orders fulfilled by Seasons. Payment & shipping information on file will be used for one-tap checkout.
    </Sans>
  </Flex>
)

export const ProductBuy: React.FC<{
  product: GetProduct_products
  selectedVariant: GetProduct_products_brand_products_variants
  onBuyUsed: () => Promise<any>
  onBuyNew: () => Promise<any>
}> = ({ selectedVariant, onBuyUsed, onBuyNew, product }) => {
  if (selectedVariant?.price?.buyUsedEnabled && selectedVariant?.price?.buyUsedPrice) {
    const price = selectedVariant?.price?.buyUsedPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

    return <ProductBuyUsed price={price} onBuyUsed={onBuyUsed} availableForSale={true} />
  } else if (selectedVariant?.price?.buyNewEnabled && selectedVariant?.price?.buyNewPrice) {
    const price = selectedVariant?.price?.buyNewPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    const availableForSale = selectedVariant?.price?.buyNewAvailableForSale
    const brandName = product?.brand?.name
    const handleNavigateToPartner = () => {
      const href = product?.brand?.websiteUrl
      if (href) {
        Linking.openURL(href)
      }
    }

    return (
      <ProductBuyNew
        price={price}
        brandName={brandName}
        availableForSale={availableForSale}
        onBuyNew={onBuyNew}
        onNavigateToPartner={handleNavigateToPartner}
      />
    )
  }

  return null
}

const UnderlinedSans = styled(Sans)`
  text-decoration: underline;
`
