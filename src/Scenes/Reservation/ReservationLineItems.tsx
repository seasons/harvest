import { Box, Flex, Sans, Separator, Spacer, Spinner } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import { formatPrice } from "App/utils/formatPrice"
import React from "react"

export const ReservationLineItems: React.FC<{ lineItems: any; loading?: boolean }> = ({ lineItems, loading }) => {
  const check = (l) => ["Credit", "Total"].includes(l.recordType)
  const items = lineItems?.filter((l) => !check(l))
  const totalLineItems = lineItems?.filter(check)

  return (
    <Box>
      <SectionHeader title="Order summary" />
      <Spacer mb={1} />

      <Box mb={4}>
        {items?.map((lineItem, index) => {
          return (
            <Flex flexDirection="row" width="100%" justifyContent="space-between" key={index} mb={1}>
              <Sans size="4" color="black50">
                {lineItem.name}
              </Sans>
              <Sans size="4" color="black50">
                {lineItem.recordType === "Fee" && lineItem.price === 0 ? "Free" : `${formatPrice(lineItem.price)}`}
              </Sans>
            </Flex>
          )
        })}
        <Spacer mt={1} />
        <Separator />
        <Spacer mt={1} />
        {totalLineItems?.map((lineItem, index) => {
          const isLast = totalLineItems.length - 1 === index
          const color = isLast ? "black100" : "black50"

          return (
            <Flex
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
              key={index}
              mb={1}
              alignItems="center"
            >
              <Sans size="4" color={color}>
                {lineItem.name}
              </Sans>
              {loading ? (
                <Flex flexDirection="row" justifyContent="flex-end" height={25} alignItems="center">
                  <Spinner size="small" />
                </Flex>
              ) : (
                <Sans size="4" color={color}>
                  {`${formatPrice(lineItem.price)}`}
                </Sans>
              )}
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}
