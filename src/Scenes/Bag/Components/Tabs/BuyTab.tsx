import { Flex, Box, Sans, Spacer, Separator } from "App/Components"
import React from "react"
import gql from "graphql-tag"
import { BagItemFragment_BagItem, SmallBagItem } from "../BagItem/SmallBagItem"
import { useNavigation } from "@react-navigation/native"
import { useTracking, Schema } from "App/utils/track"

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
    }
  }
  ${BagItemFragment_BagItem}
`

export const BuyTab: React.FC<{ items }> = ({ items }) => {
  const navigation = useNavigation()
  const tracking = useTracking()

  return (
    <Flex px={2} py={4}>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" pb={1}>
        <Sans size="6">Buy</Sans>
        <Sans
          size="6"
          style={{ textDecorationLine: "underline" }}
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.FAQButtonTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            navigation.navigate("Faq")
          }}
        >
          FAQ
        </Sans>
      </Flex>
      <Sans size="4" color="black50">
        Added items will appear below
      </Sans>
      <Spacer mb={3} />
      {items?.map((bagItem, index) => {
        return (
          <Box key={index}>
            <SmallBagItem bagItem={bagItem} sectionStatus="Cart" showBuyPrice />
            <Box py={2}>
              <Separator />
            </Box>
          </Box>
        )
      })}
    </Flex>
  )
}
