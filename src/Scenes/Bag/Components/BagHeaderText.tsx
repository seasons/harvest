import React from "react"
import { Flex, Sans, Spacer } from "App/Components"
import { ReservationPhase } from "App/generated/globalTypes"
import { Schema, useTracking } from "App/utils/track"

import { useNavigation } from "@react-navigation/native"

export const getHeaderText = (status: string, phase: ReservationPhase, atHome: boolean) => {
  if (atHome) {
    return "At home"
  }
  switch (status) {
    case "Queued":
      return "We've got your order"
    case "Picked":
      return "Order being prepared"
    case "Packed":
      return "Your order ready to ship"
    case "Shipped":
      if (phase === "CustomerToBusiness") {
        return "Your return is on the way"
      } else {
        return "Your order is on the way"
      }
    case "Delivered":
      return "Your order was delivered"
    case "Hold":
      return "Your order is on hold"
    default:
      return "Your bag"
  }
}

export const BagHeaderText = ({ activeReservation, atHome }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  return (
    <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" px={2}>
      <Sans size="5">{getHeaderText(activeReservation?.status, activeReservation?.phase, atHome)}</Sans>
      <Spacer mb={0.5} />
      <Sans
        size="5"
        style={{ textDecorationLine: "underline" }}
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.FAQButtonTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          navigation.navigate("Faq")
        }}
      >
        FAQ
      </Sans>
    </Flex>
  )
}
