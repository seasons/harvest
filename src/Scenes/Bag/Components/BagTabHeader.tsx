import React, { useState } from "react"
import { Box, Sans, Flex, Spacer } from "App/Components"
import { useNavigation } from "@react-navigation/native"
import { DateTime } from "luxon"
import { GetBag_NoCache_Query_me } from "App/generated/GetBag_NoCache_Query"
import gql from "graphql-tag"
import { Schema, useTracking } from "App/utils/track"
import { ReservationPhase } from "App/generated/globalTypes"
import { DeliveryStatus } from "./DeliveryStatus"
import { Text, TouchableOpacity } from "react-native"
import { color } from "App/utils/color"
import { useMutation } from "@apollo/client"
import { Spinner } from "App/Components/Spinner"
import { GetBag_NoCache_Query } from "../BagQueries"

export const BagTabHeaderFragment_Query = gql`
  fragment BagTabHeaderFragment_Query on Query {
    me {
      id
      activeReservation {
        id
        createdAt
        returnAt
      }
      customer {
        id
        membership {
          id
          plan {
            id
            tier
          }
          subscription {
            id
            currentTermStart
            currentTermEnd
          }
        }
      }
    }
  }
`

const getHeaderText = (status: string, phase: ReservationPhase, atHome: boolean) => {
  if (atHome) {
    return "At home"
  }
  switch (status) {
    case "Queued":
    case "Picked":
    case "Packed":
      return "Order being prepared"
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

const getSubHeaderText = (me, activeReservation, atHome) => {
  const nextSwapDate = me.nextFreeSwapDate
  const nextSwapDateLuxon = DateTime.fromISO(nextSwapDate)
  const swapAvailable = nextSwapDate < DateTime.local().toISO()

  let atHomeText
  if (swapAvailable) {
    atHomeText = "You have a swap available"
  } else {
    atHomeText = `You get a free swap ${nextSwapDateLuxon.weekdayLong}, ${nextSwapDateLuxon.monthLong} ${nextSwapDateLuxon.day}`
  }

  let returnReminder
  if (
    !!activeReservation &&
    me?.customer?.membership?.plan?.tier === "Essential" &&
    !!me?.activeReservation?.returnAt
  ) {
    const luxonDate = DateTime.fromISO(me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthLong} ${luxonDate.day}`
  }

  let subHeaderText
  if (atHome) {
    subHeaderText = atHomeText
  } else if (!!activeReservation && !!returnReminder) {
    subHeaderText = returnReminder
  } else {
    subHeaderText = "Reserve your order below"
  }
  return subHeaderText
}

const CANCEL_RETURN = gql`
  mutation CancelReturn {
    cancelReturn {
      id
    }
  }
`

export const BagTabHeader: React.FC<{
  me: GetBag_NoCache_Query_me
  atHome: boolean
  pausedWithoutItems: boolean
}> = ({ me, atHome, pausedWithoutItems }) => {
  const tracking = useTracking()
  const navigation = useNavigation()
  const [cancelingReturn, setCancelingReturn] = useState(false)
  const [cancelReturn] = useMutation(CANCEL_RETURN, {
    onCompleted: () => {
      setCancelingReturn(false)
    },
    onError: (e) => {
      setCancelingReturn(false)
    },
  })

  const activeReservation = me?.activeReservation
  const status = activeReservation?.status
  const subHeaderText = getSubHeaderText(me, activeReservation, atHome)
  const markedAsReturned = !!activeReservation?.returnedAt

  const showDeliveryStatus = !!activeReservation && !atHome && !markedAsReturned
  const showSubHeaderText = !markedAsReturned && !showDeliveryStatus && !!subHeaderText

  return (
    <Box pt={4}>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" px={2}>
        <Sans size="5">{getHeaderText(status, activeReservation?.phase, atHome)}</Sans>
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
      {showDeliveryStatus && (
        <Box px={1.5}>
          <DeliveryStatus me={me} atHome={atHome} />
        </Box>
      )}
      {showSubHeaderText && (
        <Box px={2}>
          <Sans size="4" color="black50">
            {subHeaderText}
          </Sans>
        </Box>
      )}
      {markedAsReturned && (
        <Box px={2}>
          <Sans size="4" color="black50">
            Your bag will update after UPS scans the return label. Second thoughts?{" "}
            {cancelingReturn ? (
              <Flex flexDirection="row" width={130} height={20} justifyContent="center" alignItems="center">
                <Spinner size="small" />
              </Flex>
            ) : (
              <Sans
                size="4"
                onPress={() => {
                  setCancelingReturn(true)
                  cancelReturn({
                    awaitRefetchQueries: true,
                    refetchQueries: [{ query: GetBag_NoCache_Query }],
                  })
                }}
                color="black50"
                style={{ textDecorationLine: "underline" }}
              >
                Cancel your return
              </Sans>
            )}
          </Sans>
        </Box>
      )}
      <Spacer mb={3} />
    </Box>
  )
}
