import React from "react"
import { Box, Flex, Sans, Spacer } from "App/Components"
import { useNavigation } from "@react-navigation/native"
import gql from "graphql-tag"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { Schema } from "App/Navigation"

export const BagSectionDeliveryStatusFragment_BagSection = gql`
  fragment BagSectionDeliveryStatusFragment_BagSection on BagSection {
    status
    deliveryStep
    deliveryTrackingUrl
    deliveryStatusText
  }
`

export const BagSectionDeliveryStatus = ({ section }) => {
  const navigation = useNavigation()
  const status = section.status

  const inbound = status === "ScannedOnInbound" || status === "InTransitInbound" || status === "DeliveredToBusiness"

  const statusColor = inbound ? color("blue100") : color("lightGreen")
  const trackText = inbound ? "Track return" : "Track order"

  const { deliveryStep, deliveryTrackingUrl, deliveryStatusText } = section

  return (
    <Box px={1.5}>
      <Flex flexDirection="row" flexWrap="nowrap" width="100%">
        {[...Array(3)].map((_pip, index) => {
          const backgroundColor = index < deliveryStep ? statusColor : color("black10")
          return <Pip backgroundColor={backgroundColor} mx={0.5} key={index} />
        })}
      </Flex>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={0.5}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
          <GreenDot statusColor={statusColor} />
          <Spacer mr={1} />
          <Sans size="4">{deliveryStatusText}</Sans>
        </Flex>
        {!!deliveryTrackingUrl && (
          <Box>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(Schema.PageNames.Webview, { uri: deliveryTrackingUrl })
              }}
            >
              <Sans size="4" style={{ textDecorationLine: "underline" }}>
                {trackText}
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
