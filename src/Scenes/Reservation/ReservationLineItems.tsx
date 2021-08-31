import { Box, Flex, Sans, Spacer } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import React from "react"

export const formatPrice = (price) =>
  (price / 100 || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

export const ReservationLineItems = ({ lineItems }) => {
  const items = lineItems.filter((l) => l.recordType !== "Total" && l.price > 0)
  const totalLineItem = lineItems.filter((l) => l.recordType === "Total")?.[0]
  const total = totalLineItem.price

  return (
    <Box>
      <SectionHeader title="30-day order summary" />
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

        <Flex flexDirection="row" width="100%" justifyContent="space-between" mb={1}>
          <Sans size="4" color="black100">
            Total
          </Sans>
          <Sans size="4" color="black100">
            {formatPrice(total)}
          </Sans>
        </Flex>
      </Box>
    </Box>
  )
}
