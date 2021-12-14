import { Button, Flex } from "App/Components"
import { color } from "App/utils"
import React from "react"
import { Box, Sans, Separator } from "@seasons/eclipse"
import { BagView } from "../Bag"
import { gql } from "@apollo/client"

interface BagBottomBarProps {
  bagItems
  onReserve: () => void
  onCartCheckout: () => void
  isMutating: boolean
  activeTab: BagView
}

export const BagBottomBarFragment_BagItem = gql`
  fragment BagBottomBarFragment_BagItem on BagItem {
    id
  }
`

export const BagBottomBar: React.FC<BagBottomBarProps> = ({
  bagItems,
  onReserve,
  isMutating,
  activeTab,
  onCartCheckout,
}) => {
  const isRentView = activeTab === BagView.Rent
  const hasBagItems = bagItems?.length > 0

  let price
  if (isRentView) {
    const rentalPrices = bagItems?.map((b) => b.productVariant?.product?.rentalPrice) || []
    price = rentalPrices?.reduce((acc, curr) => acc + curr, 0) ?? 0
  } else {
    const buyUsedPrices = bagItems?.map((b) => b.productVariant?.price?.buyUsedAdjustedPrice / 100) || []
    price = buyUsedPrices?.reduce((acc, curr) => acc + curr, 0) ?? 0
  }

  const onPress = () => {
    if (isMutating) {
      return
    }

    if (isRentView) {
      onReserve()
    } else {
      onCartCheckout()
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
              {isRentView ? "Estimated total" : "Est. Sales total"}
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
          <Button variant="primaryBlack" onPress={onPress} loading={isMutating} disabled={isMutating || !hasBagItems}>
            {isRentView ? "Reserve" : "Checkout"}
          </Button>
        </Flex>
      </Box>
    </>
  )
}
