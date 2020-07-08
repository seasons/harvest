import React from "react"
import { Box, Container, FixedButton, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { screenTrack, Schema, useTracking } from "App/utils/track"

export const FinishProductRequest = screenTrack()((props: any) => {
  const tracking = useTracking()

  return (
    <Container insetsBottom={false}>
      <Box px={2} style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <Box>
          <Sans size="3" color={color("black100")} textAlign="center">
            Thank you!
          </Sans>
          <Spacer mb={14} />
          <Sans size="2" color={color("black50")} textAlign="center">
            We'll review your submission and reach back out to you if we can carry it.
          </Sans>
        </Box>
      </Box>
      <FixedButton
        block
        variant="primaryWhite"
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.FinishButtonTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          props.navigation.popToTop()
        }}
      >
        Finish
      </FixedButton>
    </Container>
  )
})
