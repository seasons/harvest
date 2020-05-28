import { Spacer, Button, Sans } from "App/Components"
import React, { useState } from "react"
import { Linking } from "react-native"
import { ButtonVariant } from "../Button"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"
import { GetMembershipInfo_me_customer } from "App/generated/GetMembershipInfo"
import { color } from "App/utils"

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

const PAUSE_MEMBERSHIP = gql`
  mutation PauseSubscription($subscriptionID: String!) {
    pauseSubscription(subscriptionID: $subscriptionID)
  }
`

export const PauseButtons: React.FC<{ customer: GetMembershipInfo_me_customer; showPausedNote?: boolean }> = ({
  customer,
  showPausedNote = true,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()

  const [removeScheduledPause] = useMutation(REMOVE_SCHEDULED_PAUSE, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      // navigation.navigate("Modal", { screen: "FiltersModal", params: { sizeFilters } })
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error canceling the pause on your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [pauseSubscription] = useMutation(PAUSE_MEMBERSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      const dueDate = DateTime.fromISO(customer?.invoices?.[0]?.dueDate).toFormat("LLL dd")
      navigation.navigate("Modal", {
        screen: Schema.PageNames.PauseConfirmation,
        params: { dueDate },
      })
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error pausing your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
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
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const pauseRequest = customer?.membership?.pauseRequests?.[0]
  const customerStatus = customer?.status
  const pausePending = pauseRequest?.pausePending

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

  const toggleSubscriptionStatus = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    const subscriptionId = customer?.invoices?.[0]?.subscriptionId || ""
    const vars = {
      variables: {
        subscriptionID: subscriptionId,
      },
    }
    if (pauseStatus === "paused") {
      await resumeSubscription(vars)
    } else if (pauseStatus === "pending") {
      await removeScheduledPause(vars)
    } else {
      await pauseSubscription(vars)
    }
    setIsMutating(false)
  }

  const SubText = () => {
    return pauseStatus === "paused" ? (
      <Sans size="1" color={color("black50")} style={{ textAlign: "center" }}>
        Have a question?{" "}
        <Sans
          size="1"
          style={{ textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
        >
          Contact us
        </Sans>
      </Sans>
    ) : (
      <Sans size="1" color={color("black50")} style={{ textAlign: "center" }}>
        If you’d like cancel your membership, contact us using the button above. We’re happy to help with this.
      </Sans>
    )
  }

  const resumeDate =
    customer?.membership?.pauseRequests?.[0]?.resumeDate &&
    DateTime.fromISO(customer?.membership?.pauseRequests?.[0]?.resumeDate)

  const resumeDatePlusOneMonth = resumeDate && resumeDate.plus({ months: 1 })
  const pauseExtendDateDisplay = !!resumeDatePlusOneMonth && resumeDatePlusOneMonth.toFormat("LLLL dd")
  const resumeDateDiffNow = resumeDatePlusOneMonth && resumeDatePlusOneMonth.diffNow("months")

  const isExtended = resumeDate && resumeDate.diffNow("months") >= 1
  const canExtend = resumeDateDiffNow && resumeDateDiffNow >= 1 && !isExtended

  return (
    <>
      {pauseStatus === "pending" && (
        <>
          <Sans size="1">{`Your membership is scheduled to be paused on ${DateTime.fromISO(
            pauseRequest.pauseDate
          ).toFormat("EEEE LLLL dd")}.`}</Sans>
          <Spacer mb={2} />
        </>
      )}
      {pauseStatus === "paused" && showPausedNote && (
        <>
          <Sans size="1">{`Your membership is paused until ${DateTime.fromISO(resumeDate).toFormat(
            "EEEE LLLL dd"
          )}.`}</Sans>
          {isExtended && !canExtend && (
            <Sans size="1" color="black50">{`You can extend this again after ${DateTime.fromISO(resumeDate)
              .minus({ months: 1 })
              .toFormat("EEEE LLLL dd")}.`}</Sans>
          )}
          <Spacer mb={2} />
        </>
      )}
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
          disabled={isExtended && !canExtend}
          onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
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
    </>
  )
}
