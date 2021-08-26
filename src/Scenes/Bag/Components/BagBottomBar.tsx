import { Button } from "App/Components"
import React from "react"

import { Box, Flex, Sans, Separator } from "@seasons/eclipse"

export const BagBottomBar = ({ bagItems }) => {
  console.log(bagItems)

  if (!bagItems || bagItems.length === 0) {
    return null
  }

  const rentalPrices = bagItems.map((b) => b.productVariant?.product?.rentalPrice) || []
  const totalRentalPrice = rentalPrices.reduce((acc, curr) => acc + curr, 0)

  console.log("Rental price", rentalPrices, totalRentalPrice)

  return (
    <>
      <Separator />
      <Box height={80} pt={2} px={2}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Sans size="4" color="black50">
              Estimated total
            </Sans>
            <Flex flexDirection="row" alignItems="center">
              <Sans size="7">${totalRentalPrice}</Sans>
              <Sans size="4" color="black50" mx={1} my={1}>
                + Tax
              </Sans>
            </Flex>
          </Box>

          <Box>
            <Button variant="primaryBlack">Reserve</Button>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
