import { Button, Flex } from "App/Components"
import { GetBag_NoCache_Query_me_bag } from "App/generated/GetBag_NoCache_Query"
import { color } from "App/utils"
import React from "react"

import { Box, Sans, Separator } from "@seasons/eclipse"
import { BagView } from "../Bag"

interface BagBottomBarProps {
  bagItems: GetBag_NoCache_Query_me_bag[]
  onReserve: () => void
  isMutating: boolean
  activeTab: BagView
}

export const BagBottomBar: React.FC<BagBottomBarProps> = ({ bagItems, onReserve, isMutating, activeTab }) => {
  if (!bagItems || bagItems.length === 0) {
    return null
  }

  const isRentView = activeTab === BagView.Rent

  let price
  if (isRentView) {
    const rentalPrices = bagItems.map((b) => b.productVariant?.product?.rentalPrice) || []
    price = rentalPrices.reduce((acc, curr) => acc + curr, 0)
  } else {
    const buyUsedPrices = bagItems.map((b) => b.productVariant?.price?.buyUsedAdjustedPrice / 100) || []
    price = buyUsedPrices.reduce((acc, curr) => acc + curr, 0)
  }

  const onBuy = () => {}

  const onPress = () => {
    if (isRentView) {
      onReserve()
    } else {
      onBuy()
    }
  }

  return (
    <>
      <Separator />
      <Box>
        <Flex
          py={2}
          px={2}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ backgroundColor: color("white100") }}
        >
          <Box>
            <Sans size="3" color="black50">
              {isRentView ? "Estimated total" : "Total"}
            </Sans>
            <Flex flexDirection="row" alignItems="flex-end">
              <Sans size="7">${price}</Sans>
              <Box style={{ paddingBottom: 3 }}>
                <Sans size="3" color="black50" mx={1}>
                  + Tax
                </Sans>
              </Box>
            </Flex>
          </Box>
          <Button variant="primaryBlack" onPress={onPress} loading={isMutating} disabled={isMutating}>
            {isRentView ? "Reserve" : "Buy"}
          </Button>
        </Flex>
      </Box>
    </>
  )
}
