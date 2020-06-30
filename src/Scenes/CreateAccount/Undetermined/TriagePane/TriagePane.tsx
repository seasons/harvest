import { Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import React, { useEffect, useState } from "react"

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

  useEffect(() => {
    if (checkStatus === CheckStatus.Waiting && check) {
      // simulate hit server
      setCheckStatus(CheckStatus.Checking)
      setTimeout(() => {
        onTriageComplete(false)
        // Allow FlatList to transition before hiding spinner
        setTimeout(() => {
          setCheckStatus(CheckStatus.Checked)
        }, 3000)
      }, 3000)
    }
  }, [check, checkStatus])

  return (
    <Container insetsBottom={false} insetsTop={false}>
      {checkStatus === CheckStatus.Checking && <Loader />}
    </Container>
  )
}
