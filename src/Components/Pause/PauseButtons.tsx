import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { GetMembershipInfo_me_customer } from "App/generated/GetMembershipInfo"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema } from "App/Navigation/schema"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { color } from "App/utils"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { Linking } from "react-native"

import { useMutation } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"

export type PauseStatus = "active" | "pending" | "paused"

export const RESUME_MEMBERSHIP = gql`
  mutation ResumeSubscription($subscriptionID: String!) {
    resumeSubscription(subscriptionID: $subscriptionID)
  }
`

export const REMOVE_SCHEDULED_PAUSE = gql`
  mutation RemoveScheduledPause($subscriptionID: String!) {
    removeScheduledPause(subscriptionID: $subscriptionID)
  }
`

export const PauseButtons: React.FC<{
  customer: GetMembershipInfo_me_customer
  fullScreen?: boolean
}> = ({ customer, fullScreen }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()

  const pauseRequest = customer?.membership?.pauseRequests?.[0]
  const customerStatus = customer?.status
  const isPending = pauseRequest?.pausePending
  const isPaused = customerStatus === "Paused"

  const showPauseButton = isPending || isPaused

  const resumeDate =
    customer?.membership?.pauseRequests?.[0]?.resumeDate &&
    DateTime.fromISO(customer?.membership?.pauseRequests?.[0]?.resumeDate)
  const resumeDateDateDisplay = resumeDate?.toFormat("EEEE LLLL d")

  const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      const popUpData = {
        title: "Got it!",
        note: "Your membership is no longer scheduled to be paused.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error canceling the pause on your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [resumeSubscription] = useMutation(RESUME_MEMBERSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      navigation.navigate("Modal", { screen: Schema.PageNames.ResumeConfirmation })
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error resuming your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const subscriptionID = customer?.membership?.subscription?.id

  const toggleSubscriptionStatus = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    const vars = {
      variables: {
        subscriptionID,
      },
      awaitRefetchQueries: true,
    }
    if (isPaused) {
      await resumeSubscription(vars)
    } else if (isPending) {
      await removeScheduledPause(vars)
    }
    setIsMutating(false)
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
      <Box>
        {fullScreen && <Spacer mb={100} />}
        {isPending && (
          <>
            <Sans size="4">{`Your membership is scheduled to be paused on ${DateTime.fromISO(
              pauseRequest.pauseDate
            ).toFormat("EEEE LLLL d")}.`}</Sans>
            <Spacer mb={2} />
          </>
        )}
        {isPaused && !!resumeDate && (
          <>
            <Sans size="4">
              Your membership is paused until{" "}
              <Sans size="4" style={{ textDecorationLine: "underline" }}>
                {resumeDateDateDisplay}
              </Sans>
              .
            </Sans>
            <Spacer mb={1} />
            {fullScreen && (
              <Sans color="black50" size="4">
                It will automatically resume at this date.
              </Sans>
            )}
            <Spacer mb={2} />
          </>
        )}
      </Box>
      <Box>
        {showPauseButton && (
          <>
            <Button
              onPress={toggleSubscriptionStatus}
              disabled={isMutating}
              loading={isMutating}
              block
              variant="primaryBlack"
            >
              Resume membership
            </Button>
            <Spacer mb={1} />
          </>
        )}
        <Button
          variant="secondaryWhite"
          onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
          block
        >
          Contact us
        </Button>
        <Spacer mb={2} />
        <Sans size="4" color={color("black50")}>
          If you’d like to cancel your membership, contact us using the button above. We’re happy to help with this.
        </Sans>
      </Box>
    </Flex>
  )
}
