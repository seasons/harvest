import React from "react"
import { PopUp, Box, Sans, Separator, Spacer, Flex, Radio } from "App/Components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { OrderBy } from "./Browse"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const OrderByPopUp = ({ show, orderBy, hideSortPopUp, onPressSortOption }) => {
  const insets = useSafeAreaInsets()

  const orders = [
    { display: "New Arrivals", value: OrderBy.publishedAt_DESC },
    { display: "Price per month: High to low", value: OrderBy.computedRentalPrice_DESC },
    { display: "Price per month: Low to high", value: OrderBy.computedRentalPrice_ASC },
  ]

  return (
    <PopUp show={show} paddingBottom={90 + insets.bottom}>
      <Box pt={4} pb={2}>
        <Sans size="4" textAlign="center">
          Sort by
        </Sans>
      </Box>
      <Separator />
      {orders.map((order, index) => {
        const selected = orderBy === order.value
        return (
          <Box key={index} px={2}>
            <TouchableOpacity
              onPress={() => {
                onPressSortOption(order.value)
              }}
            >
              <Flex py={2} flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
                <Sans size="4">{order.display}</Sans>
                <Radio selected={selected} />
              </Flex>
            </TouchableOpacity>
            <Separator />
          </Box>
        )
      })}
      <Spacer mb={3} />
      <TouchableOpacity onPress={hideSortPopUp}>
        <Sans underline size="4" textAlign="center">
          Cancel
        </Sans>
      </TouchableOpacity>
    </PopUp>
  )
}
