import React from "react"
import { Box, Sans, Flex, Spacer, Separator } from "App/Components"
import styled from "styled-components/native"
import { color } from "App/utils"
import { ReservationStatus } from "App/generated/globalTypes"
import { TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"

export const DeliveryStatus: React.FC<{ status: ReservationStatus; trackingURL: string }> = ({
  status,
  trackingURL,
}) => {
  const navigation = useNavigation()
  let step
  let statusText = ""

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

  return (
    <Box>
      <Box px={2}>
        <Sans size="1">Status</Sans>
      </Box>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" px={1.5} width="100%">
        {[...Array(3)].map((_pip, index) => {
          const backgroundColor = index < step ? color("lightGreen") : color("black10")
          return <Pip backgroundColor={backgroundColor} mx={0.5} key={index} />
        })}
      </Flex>
      <Spacer mb={1} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={2}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
          <GreenDot />
          <Spacer mr={1} />
          <Sans size="1">{statusText}</Sans>
        </Flex>
        <Box>
          {trackingURL && (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(Schema.PageNames.Webview, { uri: trackingURL })
              }}
            >
              <Sans size="1" style={{ textDecorationLine: "underline" }}>
                Track order
              </Sans>
            </TouchableWithoutFeedback>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

const GreenDot = styled(Box)`
  height: 8;
  width: 8;
  border-radius: 4;
  background-color: ${color("lightGreen")};
`

const Pip = styled(Box)<{ backgroundColor: string }>`
  flex: 1;
  height: 4;
  border-radius: 2;
  background-color: ${(p) => p.backgroundColor};
`
