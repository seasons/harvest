import { Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import React, { useEffect, useState } from "react"

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
  Checking,
  Checked,
}

export const TriagePane: React.FC<TriagePaneProps> = ({ check, onTriageComplete }) => {
  const [checkStatus, setCheckStatus] = useState(CheckStatus.Waiting)

  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp
  const errorPopUpData = {
    title: "Oops! Try again!",
    note: "There was an error communicating with our server. Please try again.",
    buttonText: "Retry",
    onClose: () => {
      hideErrorPopUp()
      setCheckStatus(CheckStatus.Waiting)
      triageCustomer()
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
      console.log("****\n\n", err, "\n\n****")
      showErrorPopUp(errorPopUpData)
    },
  })

  useEffect(() => {
    if (checkStatus === CheckStatus.Waiting && check) {
      triageCustomer()
    }
  }, [check, checkStatus])

  const triageCustomer = async () => {
    if (checkStatus == CheckStatus.Checking) {
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
