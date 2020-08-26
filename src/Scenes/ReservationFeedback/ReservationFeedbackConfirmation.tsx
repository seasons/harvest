import { useMutation } from "@apollo/react-hooks"
import React, { useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"

import { Box, Button, FixedBackArrow, Flex, Sans, Separator, Spacer, TextInput } from "App/Components"
import { Schema } from "App/Navigation"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { space } from "App/utils"
import { screenTrack, useTracking, Schema as TrackingSchema } from "App/utils/track"
import { Container } from "Components/Container"
import { UPDATE_RESERVATION_FEEDBACK } from "./Components/ReservationFeedbackPopUp"
import { GET_HOMEPAGE } from "../Home/Home"

export const ReservationFeedbackConfirmation: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const reservationFeedback = route?.params?.reservationFeedback
  const [comment, setComment] = useState(reservationFeedback?.comment)
  const [updateReservationFeedback] = useMutation(UPDATE_RESERVATION_FEEDBACK, {
    refetchQueries: [
      {
        query: GET_HOMEPAGE,
      },
    ],
  })
  const insets = useSafeArea()
  const { width: windowWidth } = Dimensions.get("window")
  const buttonWidth = (windowWidth - 42) / 2

  const submitFeedback = async () => {
    const result = await updateReservationFeedback({
      variables: {
        id: reservationFeedback?.id,
        input: { comment, respondedAt: new Date() },
      },
      awaitRefetchQueries: true,
    })
    if (!result?.data) {
      const popUpData = {
        buttonText: "Got it",
        note: "An issue occurred while trying to submit your comment. Please try again.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
      return
    }
    navigation.pop()
    navigation.pop()
    navigation.navigate("Modal", {
      screen: Schema.PageNames.ReservationFeedbackFinishModal,
      params: { reservationFeedback },
    })
  }

  return (
    <Container>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box px={2}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center">
            <Spacer mb={68} />
            <Sans size="1" color="black50" weight="medium">
              Finish
            </Sans>
            <Spacer mb={1} />
            <Sans size="3" color="black100" weight="medium">
              Any other thoughts?
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={2} />
            <TextInput
              autoCapitalize="sentences"
              autoFocus
              blurOnSubmit={false}
              currentValue={comment}
              style={{ height: 200, paddingLeft: 0, paddingTop: 0, borderWidth: 0 }}
              placeholder="Tell us anything else on your mind"
              multiline={true}
              onChangeText={(_, val) => setComment(val)}
            />
          </Flex>
        </TouchableWithoutFeedback>
      </Box>
      <FixedKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={{ bottom: insets.bottom + 32 }}>
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
          <Button
            block
            variant="primaryWhite"
            width={buttonWidth}
            onPress={() => {
              tracking.trackEvent({
                actionName: TrackingSchema.ActionNames.ReservationFeedbackConfirmationSkipButtonTapped,
                actionType: TrackingSchema.ActionTypes.Tap,
              })
              submitFeedback()
            }}
          >
            Skip
          </Button>
          <Spacer ml={1} />
          <Button
            block
            variant="primaryBlack"
            width={buttonWidth}
            onPress={() => {
              tracking.trackEvent({
                actionName: TrackingSchema.ActionNames.ReservationFeedbackConfirmationSubmitButtonTapped,
                actionType: TrackingSchema.ActionTypes.Tap,
              })
              submitFeedback()
            }}
          >
            Submit
          </Button>
        </Flex>
      </FixedKeyboardAvoidingView>
    </Container>
  )
})

const FixedKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  position: absolute;
  left: ${space(2)};
`
