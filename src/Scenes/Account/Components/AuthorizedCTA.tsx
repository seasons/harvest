import React from "react"
import { Button, Sans, Box, Spacer, Flex } from "App/Components"
import { space } from "App/utils"
import { DateTime, Duration } from "luxon"
import { Dimensions } from "react-native"
import { Countdown } from "@seasons/eclipse"
import styled from "styled-components/native"

const SansUnderline = styled(Sans)`
  text-decoration: underline;
`

export const AuthorizedCTA: React.FC<{
  authorizedAt: DateTime
  authorizationWindowClosesAt: DateTime
  onPressChoosePlan: () => void
  onPressLearnMore: () => void
}> = ({ authorizedAt, authorizationWindowClosesAt, onPressChoosePlan, onPressLearnMore }) => {
  const targetAuthorizationDate = authorizationWindowClosesAt.isValid
    ? authorizationWindowClosesAt
    : authorizedAt.plus({ days: 2 })
  const authorizationDuration =
    targetAuthorizationDate.valueOf() > authorizedAt.valueOf()
      ? targetAuthorizationDate.diff(authorizedAt, "hours")
      : Duration.fromMillis(0)
  const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)

  return (
    <Box pb={1}>
      <Flex alignItems="center" pb={3}>
        <Countdown targetDate={targetAuthorizationDate} />
      </Flex>
      <Sans size="2" color="black100" textAlign="center">
        You're in. Let's choose your plan
      </Sans>
      <Spacer mb={1} />
      <Sans size="1" color="black50" textAlign="center">
        You have{" "}
        <SansUnderline size="1" color="black50">
          {authorizationDuration.get("hours") === 1
            ? `${authorizationDuration.toFormat("h")} hour`
            : `${authorizationDuration.toFormat("h")} hours`}
        </SansUnderline>{" "}
        to secure your spot. If we don't hear from you, your invite will go to the next person and{" "}
        <SansUnderline size="1" color="black50">
          you'll be waitlisted
        </SansUnderline>
        .
      </Sans>
      <Spacer mb={3} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Button variant="primaryWhite" width={twoButtonWidth} onPress={onPressLearnMore}>
          Learn more
        </Button>
        <Button variant="primaryBlack" width={twoButtonWidth} onPress={onPressChoosePlan}>
          Choose plan
        </Button>
      </Flex>
    </Box>
  )
}
