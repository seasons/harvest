import { Box, Flex, Sans } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import React from "react"

export const ReservationLineItems = ({ lineItems }) => {
  let taxTotal = 0
  let total = 0

  return (
    <>
      {lineItems?.length > 0 && (
        <Box mb={4}>
          {lineItems.map((lineItem, index) => {
            taxTotal = taxTotal + lineItem.taxPrice
            total = lineItem.taxPrice + total + lineItem.price
            return (
              <Box key={index}>
                <SectionHeader title="Order summary" />
                <Flex flexDirection="row" width="100%" justifyContent="space-between" mt={2}>
                  <Sans size="4" color="black50">
                    {lineItem.name}
                  </Sans>
                  <Sans size="4" color="black50">
                    {`$${lineItem.price / 100}`}
                  </Sans>
                </Flex>
              </Box>
            )
          })}
          {taxTotal > 0 && (
            <Flex flexDirection="row" width="100%" justifyContent="space-between">
              <Sans size="4" color="black50">
                Taxes
              </Sans>
              <Sans size="4" color="black50">
                {`$${taxTotal / 100}`}
              </Sans>
            </Flex>
          )}
          {(taxTotal !== 0 || lineItems?.length > 1) && (
            <Flex flexDirection="row" width="100%" justifyContent="space-between">
              <Sans size="4" color="black50">
                Total
              </Sans>
              <Sans size="4" color="black50">
                {`$${total / 100}`}
              </Sans>
            </Flex>
          )}
        </Box>
      )}
    </>
  )
}
