import { GetProduct_products, GetProduct_products_brand_products_variants } from "App/generated/GetProduct"
import React from "react"
import { Linking } from "react-native"
import styled from "styled-components/native"

import { Button, Flex, Sans, Spacer } from "@seasons/eclipse"
import { Box } from "App/Components"

const ProductBuyNew: React.FC<{
  price: string
  brandName: string
  availableForSale: boolean
  onBuyNew: () => void
  onNavigateToPartner: () => void
  buyButtonMutating: boolean
}> = ({ price, brandName, onBuyNew, onNavigateToPartner, availableForSale, buyButtonMutating }) => {
  return (
    <Flex flexDirection="column" px={3} pb={3}>
      <Sans color="black100" size="4" weight="medium">
        Available from Judy Turner
      </Sans>
      <Spacer mb={2} />
      <Button
        variant="primaryBlack"
        block
        onPress={onBuyNew}
        disabled={!availableForSale}
        loading={buyButtonMutating}
        disabled={buyButtonMutating}
      >
        {availableForSale ? `Buy new for ${price}` : "Sold Out"}
      </Button>
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
  buyButtonMutating: boolean
}> = ({ price, availableForSale, onBuyUsed, buyButtonMutating }) => (
  <Flex flexDirection="column" px={3} pb={3} pt={2}>
    <Sans color="black100" size="4" weight="medium">
      Available from Seasons
    </Sans>
    <Spacer mb={2} />
    <Button
      variant="primaryBlack"
      block
      onPress={onBuyUsed}
      loading={buyButtonMutating}
      disabled={buyButtonMutating || !availableForSale}
    >
      {availableForSale ? `Buy used for ${price}` : "Sold Out"}
    </Button>
    <Spacer mb={2} />
    <Sans size="3" opacity={0.5} color="black100">
      Orders fulfilled by Seasons. Payment & shipping information on file will be used for one-tap checkout.
    </Sans>
  </Flex>
)

export const ProductBuy: React.FC<{
  product: GetProduct_products
  selectedVariant: GetProduct_products_brand_products_variants
  onBuyUsed: () => void
  onBuyNew: () => void
  buyButtonMutating: boolean
  productBuyRef: React.MutableRefObject<any>
}> = ({ selectedVariant, onBuyUsed, onBuyNew, product, buyButtonMutating, productBuyRef }) => {
  if (selectedVariant?.price?.buyUsedEnabled && selectedVariant?.price?.buyUsedPrice) {
    const priceInDollars = selectedVariant?.price?.buyUsedPrice / 100
    const price = priceInDollars?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return (
      <Box ref={productBuyRef}>
        <ProductBuyUsed
          price={price}
          onBuyUsed={onBuyUsed}
          availableForSale={selectedVariant?.price?.buyUsedAvailableForSale}
          buyButtonMutating={buyButtonMutating}
        />
      </Box>
    )
  } else if (selectedVariant?.price?.buyNewEnabled && selectedVariant?.price?.buyNewPrice) {
    const priceInDollars = selectedVariant?.price?.buyNewPrice / 100
    const price = priceInDollars?.toLocaleString("en-US", {
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
      <Box ref={productBuyRef}>
        <ProductBuyNew
          buyButtonMutating={buyButtonMutating}
          price={price}
          brandName={brandName}
          availableForSale={availableForSale}
          onBuyNew={onBuyNew}
          onNavigateToPartner={handleNavigateToPartner}
        />
      </Box>
    )
  }

  return null
}

const UnderlinedSans = styled(Sans)`
  text-decoration: underline;
`
