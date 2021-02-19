import { Spacer, Button, Sans, Flex, Box } from "App/Components"
import React, { useState } from "react"
import { Linking } from "react-native"
import { ButtonVariant } from "../Button"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"
import { GetMembershipInfo_me_customer } from "App/generated/GetMembershipInfo"
import { color } from "App/utils"
import * as Sentry from "@sentry/react-native"

export type PauseStatus = "active" | "pending" | "paused"

const RESUME_MEMBERSHIP = gql`
  mutation ResumeSubscription($subscriptionID: String!) {
    resumeSubscription(subscriptionID: $subscriptionID)
  }
`

export const REMOVE_SCHEDULED_PAUSE = gql`
  mutation RemoveScheduledPause($subscriptionID: String!) {
    removeScheduledPause(subscriptionID: $subscriptionID)
  }
`

const UPDATE_RESUME_DATE = gql`
  mutation UpdateResumeDate($date: DateTime!) {
    updateResumeDate(date: $date)
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
  const pausePending = pauseRequest?.pausePending

  const resumeDate =
    customer?.membership?.pauseRequests?.[0]?.resumeDate &&
    DateTime.fromISO(customer?.membership?.pauseRequests?.[0]?.resumeDate)

  const resumeDatePlusOneMonth = resumeDate && resumeDate.plus({ months: 1 })
  const pauseExtendDateDisplay = (!!resumeDatePlusOneMonth && resumeDatePlusOneMonth.toFormat("LLLL d")) || ""

  const pauseDateCanExtend =
    resumeDate?.diffNow("months")?.values?.months && resumeDate.diffNow("months")?.values?.months < 1

  const [updateResumeDate] = useMutation(UPDATE_RESUME_DATE, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      navigation.navigate("Modal", {
        screen: Schema.PageNames.ExtendPauseConfirmation,
        params: { dueDate: pauseExtendDateDisplay },
      })
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error updating your resume date, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

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

  let pauseStatus: PauseStatus = "active"
  let pauseButtonVariant: ButtonVariant = "primaryGray"
  let pauseButtonText = "Pause membership"

  if (customerStatus === "Paused") {
    pauseStatus = "paused"
    pauseButtonText = "Resume membership"
    pauseButtonVariant = "primaryBlack"
  } else if (pausePending) {
    pauseStatus = "pending"
    pauseButtonText = "Resume membership"
    pauseButtonVariant = "primaryBlack"
  }

  const subscriptionID = customer?.invoices?.[0]?.subscriptionId || ""

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
    if (pauseStatus === "paused") {
      await resumeSubscription(vars)
    } else if (pauseStatus === "pending") {
      await removeScheduledPause(vars)
    } else {
      navigation.navigate(Schema.StackNames.Modal, {
        screen: Schema.PageNames.PauseModal,
        params: { customer },
      })
    }
    setIsMutating(false)
  }

  const SubText = () => {
    return pauseStatus === "paused" ? (
      <Sans size="4" color={color("black50")} style={{ textAlign: "center" }}>
        Have a question?{" "}
        <Sans
          size="4"
          style={{ textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
        >
          Contact us
        </Sans>
      </Sans>
    ) : (
      <Sans size="4" color={color("black50")}>
        If you’d like to cancel your membership, contact us using the button above. We’re happy to help with this.
      </Sans>
    )
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
      <Box>
        {fullScreen && <Spacer mb={100} />}
        {pauseStatus === "pending" && (
          <>
            <Sans size="4">{`Your membership is scheduled to be paused on ${DateTime.fromISO(
              pauseRequest.pauseDate
            ).toFormat("EEEE LLLL d")}.`}</Sans>
            <Spacer mb={2} />
          </>
        )}
        {pauseStatus === "paused" && (
          <>
            <Sans size={fullScreen ? "4" : "2"}>
              Your membership is paused until{" "}
              <Sans size={fullScreen ? "4" : "2"} style={{ textDecorationLine: "underline" }}>
                {DateTime.fromISO(resumeDate).toFormat("EEEE LLLL d")}
              </Sans>
              .
            </Sans>
            <Spacer mb={1} />
            {fullScreen && (
              <Sans color="black50" size="4">
                It will automatically resume at this date.
              </Sans>
            )}
            {!pauseDateCanExtend && (
              <Sans size="4" color="black50">{`You can extend this again after ${DateTime.fromISO(resumeDate)
                .minus({ months: 1 })
                .toFormat("EEEE LLLL d")}.`}</Sans>
            )}
            <Spacer mb={2} />
          </>
        )}
      </Box>
      <Box>
        <Button
          onPress={toggleSubscriptionStatus}
          disabled={isMutating}
          loading={isMutating}
          block
          variant={pauseButtonVariant}
        >
          {pauseButtonText}
        </Button>
        <Spacer mb={1} />
        {pauseStatus === "paused" ? (
          <Button
            variant="secondaryWhite"
            disabled={!pauseDateCanExtend}
            onPress={() =>
              updateResumeDate({
                variables: { date: resumeDatePlusOneMonth?.toISO() },
                awaitRefetchQueries: true,
              })
            }
            block
          >
            {`Pause until ${pauseExtendDateDisplay}`}
          </Button>
        ) : (
          <Button
            variant="secondaryWhite"
            onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
            block
          >
            Contact us
          </Button>
        )}
        <Spacer mb={2} />
        <SubText />
      </Box>
    </Flex>
  )
}
