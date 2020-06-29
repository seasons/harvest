import React from "react"
import { Container } from "App/Components"
import { Spinner } from "App/Components/Spinner"

interface LoadingPaneProps {
  isSpinning: boolean
}

export const LoadingPane: React.FC<LoadingPaneProps> = ({ isSpinning }) => {
  return (
    <Container insetsBottom={false} insetsTop={false}>
      {isSpinning && <Spinner size="medium" />}
    </Container>
  )
}
