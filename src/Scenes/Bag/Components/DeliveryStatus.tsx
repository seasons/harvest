import { Box, Flex, Sans, Spacer } from "App/Components"
import {
  GetBag_NoCache_Query_me, GetBag_NoCache_Query_me_activeReservation
} from "App/generated/GetBag_NoCache_Query"
import { Schema } from "App/Navigation"
import { color } from "App/utils"
import gql from "graphql-tag"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { useNavigation } from "@react-navigation/native"

import { BagReturnFlowSubtitle } from "./BagReturnFlowSubtitle"

export const DeliveryStatusFragment_Me = gql`
  fragment DeliveryStatusFragment_Me on Me {
    activeReservation {
      id
      status
      returnedPackage {
        id
        shippingLabel {
          id
          trackingURL
        }
      }
      sentPackage {
        id
        shippingLabel {
          id
          trackingURL
        }
      }
    }
  }
`

export const DeliveryStatus: React.FC<{
  activeReservation: GetBag_NoCache_Query_me_activeReservation
  atHome: boolean
}> = ({ activeReservation,atHome }) => {
  const navigation = useNavigation()
  const status = activeReservation?.status

  const sentPackageTrackingURL = activeReservation?.sentPackage?.shippingLabel?.trackingURL
  const returnedPackageTrackingURL = activeReservation?.returnedPackage?.shippingLabel?.trackingURL

  const showReturnCopy = !!activeReservation?.returnedAt && activeReservation?.phase !== "CustomerToBusiness"
  if (showReturnCopy) {
    return <BagReturnFlowSubtitle />
  }

  let step
  let statusText = ""
  let statusColor = color("lightGreen")
  let trackingURL

  if (activeReservation?.phase === "CustomerToBusiness") {
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
    } else if (status === "Packed" || status === "Picked") {
      statusText = "Order received"
      step = 1
    } else if (status === "Queued") {
      statusText = "Order received"
      step = 0
    } else {
      return null
    }
  }

  return (
    <Box px={1.5}>
      <Box pt={3} px={0.5}>
        <Sans size="4">Status</Sans>
      </Box>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" width="100%">
        {[...Array(3)].map((_pip, index) => {
          const backgroundColor = index < step ? statusColor : color("black10")
          return <Pip backgroundColor={backgroundColor} mx={0.5} key={index} />
        })}
      </Flex>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={0.5}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
          <GreenDot statusColor={statusColor} />
          <Spacer mr={1} />
          <Sans size="4">{statusText}</Sans>
        </Flex>
        {!!trackingURL && (
          <Box>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(Schema.PageNames.Webview, { uri: trackingURL })
              }}
            >
              <Sans size="4" style={{ textDecorationLine: "underline" }}>
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
