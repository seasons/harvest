import { Spacer, Button } from "App/Components"
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

type PauseStatus = "active" | "pending" | "paused"

const RESUME_MEMBERSHIP = gql`
  mutation ResumeSubscription($subscriptionID: String!) {
    resumeSubscription(subscriptionID: $subscriptionID)
  }
`

const REMOVE_SCHEDULED_PAUSE = gql`
  mutation RemoveScheduledPause($subscriptionID: String!) {
    removeScheduledPause(subscriptionID: $subscriptionID)
  }
`

const PAUSE_MEMBERSHIP = gql`
  mutation PauseSubscription($subscriptionID: String!) {
    pauseSubscription(subscriptionID: $subscriptionID)
  }
`

export const PauseButtons: React.FC<{ customer: GetMembershipInfo_me_customer }> = ({ customer }) => {
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
      const dueDate = DateTime.fromISO(customer?.invoices?.[0]?.dueDate).toFormat("MM/dd")
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

  console.log("customer", customer)

  const toggleSubscriptionStatus = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    const subscriptionId = customer?.invoices?.[0]?.subscriptionId || ""
    console.log("subscriptionId", subscriptionId)
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

  return (
    <>
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
      <Button
        variant="secondaryWhite"
        onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
        block
      >
        Contact us
      </Button>
    </>
  )
}
