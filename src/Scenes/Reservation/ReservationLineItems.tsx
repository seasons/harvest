import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import { formatPrice } from "App/utils/formatPrice"
import React from "react"

export const ReservationLineItems = ({ lineItems }) => {
  const check = (l) => ["Credit", "Total"].includes(l.recordType)
  const items = lineItems.filter((l) => !check(l))
  const totalLineItems = lineItems.filter(check)

  return (
    <Box>
      <SectionHeader title="Order summary" />
      <Spacer mb={1} />

      <Box mb={4}>
        {items.map((lineItem, index) => {
          return (
            <Flex flexDirection="row" width="100%" justifyContent="space-between" key={index} mb={1}>
              <Sans size="4" color="black50">
                {lineItem.name}
              </Sans>
              <Sans size="4" color="black50">
                {`${formatPrice(lineItem.price)}`}
              </Sans>
            </Flex>
          )
        })}
        <Spacer mt={1} />
        <Separator />
        <Spacer mt={1} />
        {totalLineItems.map((lineItem, index) => {
          const isLast = totalLineItems.length - 1 === index
          const color = isLast ? "black100" : "black50"

          return (
            <Flex flexDirection="row" width="100%" justifyContent="space-between" key={index} mb={1}>
              <Sans size="4" color={color}>
                {lineItem.name}
              </Sans>
              <Sans size="4" color={color}>
                {`${formatPrice(lineItem.price)}`}
              </Sans>
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}
