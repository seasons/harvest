import { Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import React, { useEffect, useState } from "react"
import * as Sentry from "@sentry/react-native"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const TRIAGE = gql`
  mutation triage {
    triageCustomer
  }
`

interface TriagePaneProps {
  check: boolean
  onTriageComplete: (userAdmitted: boolean) => void
}

enum CheckStatus {
  Waiting,
  AwaitingRetry,
  Checking,
  Checked,
}

export const TriagePane: React.FC<TriagePaneProps> = ({ check, onTriageComplete }) => {
  const [checkStatus, setCheckStatus] = useState(CheckStatus.Waiting)

  const { showPopUp, hidePopUp } = usePopUpContext()
  const errorPopUpData = {
    title: "Oops! Try again!",
    note: "There was an error communicating with our server. Please try again.",
    buttonText: "Retry",
    onClose: () => {
      hidePopUp()
      setCheckStatus(CheckStatus.AwaitingRetry)
    },
  }

  const [triage] = useMutation(TRIAGE, {
    onCompleted: () => {
      // Allow FlatList to transition before hiding spinner
      setTimeout(() => {
        setCheckStatus(CheckStatus.Checked)
      }, 3000)
    },
    onError: (err) => {
      Sentry.captureException(err)
      console.log("Error TriagePane.tsx:", err)
      showPopUp(errorPopUpData)
    },
  })

  useEffect(() => {
    if ((checkStatus === CheckStatus.Waiting || checkStatus === CheckStatus.AwaitingRetry) && check) {
      triageCustomer()
    }
  }, [check, checkStatus])

  const triageCustomer = async () => {
    if (checkStatus == CheckStatus.Checking || checkStatus === CheckStatus.Checked) {
      return
    }

    setCheckStatus(CheckStatus.Checking)

    const result = await triage()
    switch (result?.data?.triageCustomer) {
      case "Authorized":
        onTriageComplete(true)
        break
      case "Waitlisted":
        onTriageComplete(false)
        break
    }
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      {checkStatus === CheckStatus.Checking && <Loader />}
    </Container>
  )
}
