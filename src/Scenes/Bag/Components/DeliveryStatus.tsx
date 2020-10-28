import React from "react"
import { Box, Sans, Flex, Spacer } from "App/Components"
import styled from "styled-components/native"
import { color } from "App/utils"
import { TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"
import { DateTime } from "luxon"
import { GetBagAndSavedItems_me_activeReservation } from "App/generated/GetBagAndSavedItems"

export const DeliveryStatus: React.FC<{
  activeReservation: GetBagAndSavedItems_me_activeReservation
}> = ({ activeReservation }) => {
  const navigation = useNavigation()
  const status = activeReservation?.status
  const updatedMoreThan24HoursAgo = DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1
  const hideComponent = status === "Delivered" && updatedMoreThan24HoursAgo

  const sentPackageTrackingURL = activeReservation?.sentPackage?.shippingLabel?.trackingURL
  const returnedPackageTrackingURL = activeReservation?.returnedPackage?.shippingLabel?.trackingURL

  if (hideComponent) {
    return null
  }

  let step
  let statusText = ""
  let statusColor = color("lightGreen")
  let trackingURL

  if (activeReservation.phase === "CustomerToBusiness") {
    // Package is heading back to the warehouse
    statusColor = color("blue100")
    trackingURL = returnedPackageTrackingURL
    if (status === "Delivered") {
      statusText = "Returned"
      step = 3
    } else if (status === "Shipped") {
      statusText = "In-transit"
      step = 2
    } else if (status === "Packed") {
      statusText = "Received by UPS"
      step = 1
    } else {
      return null
    }
  } else {
    // Package is being sent to customer
    trackingURL = sentPackageTrackingURL
    if (status === "Delivered") {
      statusText = "Delivered"
      step = 3
    } else if (status === "Shipped") {
      statusText = "Shipped"
      step = 2
    } else if (status === "Packed") {
      statusText = "Order being prepared"
      step = 1
    } else if (status === "Queued") {
      statusText = "Order received"
      step = 0
    } else {
      return null
    }
  }

  return (
    <Box>
      <Box px={2} pt={3}>
        <Sans size="1">Status</Sans>
      </Box>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" px={1.5} width="100%">
        {[...Array(3)].map((_pip, index) => {
          const backgroundColor = index < step ? statusColor : color("black10")
          return <Pip backgroundColor={backgroundColor} mx={0.5} key={index} />
        })}
      </Flex>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={2}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
          <GreenDot statusColor={statusColor} />
          <Spacer mr={1} />
          <Sans size="1">{statusText}</Sans>
        </Flex>
        {!!trackingURL && (
          <Box>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(Schema.PageNames.Webview, { uri: trackingURL })
              }}
            >
              <Sans size="1" style={{ textDecorationLine: "underline" }}>
                Track order
              </Sans>
            </TouchableWithoutFeedback>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

const GreenDot = styled(Box)<{ statusColor: string }>`
  height: 8;
  width: 8;
  border-radius: 4;
  background-color: ${(p) => p.statusColor};
`

const Pip = styled(Box)<{ backgroundColor: string }>`
  flex: 1;
  height: 4;
  border-radius: 2;
  background-color: ${(p) => p.backgroundColor};
`
