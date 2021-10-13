import { Button } from "App/Components"
import { GetBag_NoCache_Query_me_bag } from "App/generated/GetBag_NoCache_Query"
import { color } from "App/utils"
import React from "react"

import { Box, Flex, Sans, Separator } from "@seasons/eclipse"

interface BagBottomBarProps {
  bagItems: GetBag_NoCache_Query_me_bag[]
  onReserve: () => void
}

export const BagBottomBar: React.FC<BagBottomBarProps> = ({ bagItems, onReserve }) => {
  if (!bagItems || bagItems.length === 0) {
    return null
  }

  const rentalPrices =
    bagItems.filter((a) => a.status === "Added").map((b) => b.productVariant?.product?.rentalPrice) || []
  const totalRentalPrice = rentalPrices.reduce((acc, curr) => acc + curr, 0)

  return (
    <>
      <Flex
        py={2}
        px={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ backgroundColor: "blue" }}
      >
        <Box>
          <Sans size="3" color="black50">
            Estimated total
          </Sans>
          <Flex flexDirection="row" alignItems="flex-end">
            <Sans size="7">${totalRentalPrice}</Sans>
            <Box style={{ paddingBottom: 3 }}>
              <Sans size="3" color="black50" mx={1}>
                + Tax
              </Sans>
            </Box>
          </Flex>
        </Box>
        <Button variant="primaryBlack" onPress={onReserve}>
          Reserve
        </Button>
      </Flex>
    </>
  )
}
