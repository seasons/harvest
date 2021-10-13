import { Box, Flex, Sans, Skeleton, Spacer } from "App/Components"
import { formatPrice } from "App/utils/formatPrice"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import React from "react"
import { Text } from "react-native"

import { colors } from "@seasons/eclipse/src/theme/colors"

export const CreditBalanceFragment_Customer = gql`
  fragment CreditBalanceFragment_Customer on Customer {
    membership {
      id
      adjustedCreditBalance
      currentBalance
      currentRentalInvoice {
        estimatedTotal
        billingStartAt
        billingEndAt
      }
    }
  }
`

const CurrentChargeBar = ({ membership }) => {
  const invoice = membership?.currentRentalInvoice

  if (!invoice) {
    return <></>
  }

  const startDate = DateTime.fromISO(invoice.billingStartAt).toFormat("LLL dd")
  const endDate = DateTime.fromISO(invoice.billingEndAt).toFormat("LLL dd")

  const percent = (membership?.currentBalance / invoice?.estimatedTotal) * 100

  return (
    <>
      <Box
        style={{
          flex: 1,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.black15,
        }}
      >
        <Box
          style={{
            width: `${percent}%`,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.black100,
          }}
        ></Box>
      </Box>
      <Flex my={1} flexDirection="row" justifyContent="space-between" alignItems="flex-end">
        <Sans size="3">{startDate}</Sans>
        <Sans size="3">{endDate}</Sans>
      </Flex>
    </>
  )
}

export const CreditBalance = ({ membership }) => {
  const credits = membership?.adjustedCreditBalance
  const invoice = membership?.currentRentalInvoice

  return typeof credits === "number" ? (
    <>
      <Spacer mb={1} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-end" px={2} style={{ width: "100%" }}>
        <Box>
          <Sans size="5">Current Balance</Sans>
        </Box>
        <Sans size="8">{formatPrice(membership?.currentBalance)}</Sans>
      </Flex>
      <Box m={2}>
        <CurrentChargeBar membership={membership} />
        <Sans mt={1} size="4" color="black50">
          Your estimated balance by Oct 1st is{" "}
          <Text style={{ color: colors.black100, textDecorationLine: "underline" }}>
            {formatPrice(invoice?.estimatedTotal)}
          </Text>
          . This total will change if you swap or return items early. Any available credits will be automatically
          deducted.
        </Sans>
      </Box>
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
