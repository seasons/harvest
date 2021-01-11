import { Box, Button, Sans } from "App/Components"
import React from "react"
import styled from "styled-components/native"
import { Spacer } from "./Spacer"

export type ErrorScreenVariant = "No Internet" | "General"

export interface ErrorScreenProps {
  variant?: ErrorScreenVariant
  refreshAction?: () => void
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ variant = "No Internet", refreshAction }) => {
  const { titleText, subtitleText } = getTextForVariant(variant)
  return (
    <Container>
      <Sans size="7">{titleText}</Sans>
      <Spacer mb={2} />
      <Sans size="5" px={5} textAlign="center" color="black50">
        {subtitleText}
      </Sans>
      <Spacer mb={4} />
      <Button size="large" variant="primaryWhite" onPress={refreshAction}>
        <Sans size="4">Refresh</Sans>
      </Button>
    </Container>
  )
}

function getTextForVariant(
  variant: ErrorScreenVariant
): {
  titleText: string
  subtitleText: string
} {
  switch (variant) {
    case "No Internet":
      return {
        titleText: "No Internet Connection",
        subtitleText: "Check your internet connection and try tapping refresh below",
      }
    case "General":
      return {
        titleText: "Oops! We couldn't load this page",
        subtitleText: "Please try again later",
      }
  }
}

const Container = styled(Box)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
