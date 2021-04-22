import React from "react"
import { Box, Sans, Flex, Spacer } from "App/Components"
import { useNavigation } from "@react-navigation/native"
import { DateTime } from "luxon"
import { GetBagAndSavedItems_me } from "App/generated/GetBagAndSavedItems"
import gql from "graphql-tag"
import { Schema, useTracking } from "App/utils/track"

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

export const BagTabHeader: React.FC<{
  me: GetBagAndSavedItems_me
  atHome: boolean
  pausedWithoutItems: boolean
}> = ({ me, atHome, pausedWithoutItems }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  const activeReservation = me?.activeReservation
  const hasActiveReservation = !!activeReservation
  const subscription = me?.customer?.membership?.subscription

  const reservationCreationDate = activeReservation?.createdAt
  const currentTermStart = subscription?.currentTermStart

  const currentTermEndDateTime = DateTime.fromISO(subscription?.currentTermEnd)
  const nextSwapDate = currentTermEndDateTime.plus({ day: 1 })

  let atHomeText
  if (reservationCreationDate < currentTermStart) {
    atHomeText = "You have a swap available"
  } else {
    atHomeText = `You get a free swap ${nextSwapDate.weekdayLong}, ${nextSwapDate.monthLong} ${nextSwapDate.day}`
  }

  let returnReminder
  if (
    hasActiveReservation &&
    me?.customer?.membership?.plan?.tier === "Essential" &&
    !!me?.activeReservation?.returnAt
  ) {
    const luxonDate = DateTime.fromISO(me?.activeReservation?.returnAt)
    returnReminder = `Return by ${luxonDate.weekdayLong}, ${luxonDate.monthLong} ${luxonDate.day}`
  }

  let title
  if (atHome) {
    title = "At home"
  } else if (hasActiveReservation) {
    title = "Current rotation"
  } else {
    title = "My bag"
  }

  let subTitle
  if (atHome) {
    subTitle = atHomeText
  } else if (hasActiveReservation && !!returnReminder) {
    subTitle = returnReminder
  } else {
    subTitle = "Reserve your order below"
  }

  const showSubTitle =
    ((hasActiveReservation && !!returnReminder) || !hasActiveReservation || atHome) && !pausedWithoutItems

  return (
    <Box px={2} pt={4}>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
        <Sans size="5">{title}</Sans>
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
      {showSubTitle && (
        <Sans size="4" color="black50">
          {subTitle}
        </Sans>
      )}
      <Spacer mb={3} />
    </Box>
  )
}
