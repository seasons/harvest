import { Box, Flex, Sans, Skeleton, Spacer } from "App/Components"
import gql from "graphql-tag"
import React from "react"

export const CreditBalanceFragment_Customer = gql`
  fragment CreditBalanceFragment_Customer on Customer {
    membership {
      id
      adjustedCreditBalance
    }
  }
`

export const CreditBalance = ({ membership }) => {
  const credits = membership?.adjustedCreditBalance

  return typeof credits === "number" ? (
    <>
      <Spacer mb={1} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-end" px={2} style={{ width: "100%" }}>
        <Box>
          <Sans size="4" color="black50">
            $ZNS Wallet
          </Sans>
          <Sans size="5">Credits available</Sans>
        </Box>
        <Sans size="8">
          {(credits / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Sans>
      </Flex>
      <Spacer mb={4} />
    </>
  ) : (
    <>
      <Spacer mb={1} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-end" px={2} style={{ width: "100%" }}>
        <Box>
          <Skeleton width={88} height={20} />
          <Spacer mt={2} />
          <Skeleton width={133} height={20} />
        </Box>
        <Skeleton width={100} height={36} />
      </Flex>
      <Spacer mb={4} />
    </>
  )
}
