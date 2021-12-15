import { Flex, Box, Separator } from "App/Components"
import React from "react"
import gql from "graphql-tag"
import { BagItemFragment_BagItem, SmallBagItem } from "../BagItem/SmallBagItem"
import { useNavigation } from "@react-navigation/native"
import { EmptyBagItem } from "../EmptyBagItem"
import { BagTabHeader } from "../BagTabHeader"
import { BagBottomBarFragment_BagItem } from "../BagBottomBar"

export const BuyTabFragment_Me = gql`
  fragment BuyTabFragment_Me on Me {
    id
    cartItems {
      id
      productVariant {
        id
        price {
          buyUsedAdjustedPrice
        }
      }
      ...BagItemFragment_BagItem
      ...BagBottomBarFragment_BagItem
    }
  }
  ${BagBottomBarFragment_BagItem}
  ${BagItemFragment_BagItem}
`

export const BuyTab: React.FC<{ items }> = ({ items }) => {
  const navigation = useNavigation()
  const hasItemsInCart = items?.length > 0

  return (
    <Flex height="100%">
      <BagTabHeader title="Buy" />
      {items?.map((bagItem, index) => {
        return (
          <Box key={index} px={2}>
            <SmallBagItem bagItem={bagItem} sectionStatus="Cart" showBuyPrice />
            <Box py={2}>
              <Separator />
            </Box>
          </Box>
        )
      })}

      {!hasItemsInCart && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Continue shopping" navigation={navigation} />
        </Flex>
      )}
    </Flex>
  )
}
