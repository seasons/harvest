import { Box, Flex, Sans, Spacer } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import React from "react"

export const formatPrice = (price) =>
  (price / 100 || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

export const ReservationLineItems = ({ lineItems }) => {
  let taxTotal = 0
  let total = 0

  return (
    <Box>
      <SectionHeader title="30-day order summary" />
      <Spacer mb={1} />
      {lineItems?.length > 0 && (
        <Box mb={4}>
          {lineItems.map((lineItem, index) => {
            taxTotal = taxTotal + lineItem.taxPrice
            total = lineItem.taxPrice + total + lineItem.price
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
          {taxTotal > 0 && (
            <Flex flexDirection="row" width="100%" justifyContent="space-between" mb={1}>
              <Sans size="4" color="black50">
                Taxes
              </Sans>
              <Sans size="4" color="black50">
                {`$${taxTotal / 100}`}
              </Sans>
            </Flex>
          )}
          {(taxTotal !== 0 || lineItems?.length > 1) && (
            <Flex flexDirection="row" width="100%" justifyContent="space-between" mb={1}>
              <Sans size="4" color="black100">
                Total
              </Sans>
              <Sans size="4" color="black100">
                {formatPrice(total)}
              </Sans>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  )
}
