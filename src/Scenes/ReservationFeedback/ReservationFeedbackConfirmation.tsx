import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, FixedBackArrow, Flex, Sans, Separator, Spacer, TextInput } from "App/Components"
import { Schema } from "App/Navigation"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { screenTrack, useTracking, Schema as TrackingSchema } from "App/utils/track"
import { Container } from "Components/Container"
import { UPDATE_RESERVATION_FEEDBACK } from "./Components/ReservationFeedbackPopUp"
import { Homepage_Query } from "App/Scenes/Home/queries/homeQueries"
import { space } from "App/utils"

export const ReservationFeedbackConfirmation: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const [isMutatingSkip, setIsMutatingSkip] = useState(false)
  const [isMutatingSubmit, setIsMutatingSubmit] = useState(false)
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const reservationFeedback = route?.params?.reservationFeedback
  const [comment, setComment] = useState(reservationFeedback?.comment)
  const [updateReservationFeedback] = useMutation(UPDATE_RESERVATION_FEEDBACK, {
    refetchQueries: [
      {
        query: Homepage_Query,
        variables: { firstFitPics: 8, skipFitPics: 0 },
      },
    ],
  })
  const insets = useSafeAreaInsets()

  const { width: windowWidth } = Dimensions.get("window")
  const buttonWidth = (windowWidth - 42) / 2

  const submitFeedback = async (origin: "skipButton" | "submitButton") => {
    if (isMutatingSkip || isMutatingSubmit) {
      return
    }

    if (origin === "skipButton") {
      setIsMutatingSkip(true)
    } else {
      setIsMutatingSubmit(true)
    }

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
    setIsMutatingSkip(false)
    setIsMutatingSubmit(false)
    navigation.pop()
    navigation.pop()
    navigation.navigate("Modal", {
      screen: Schema.PageNames.ReservationFeedbackFinishModal,
      params: { reservationFeedback },
    })
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" px={2}>
            <Spacer mb={68} />
            <Sans size="4" color="black50" weight="medium">
              Finish
            </Sans>
            <Spacer mb={1} />
            <Sans size="7" color="black100" weight="medium">
              Any other thoughts?
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={2} />
          </Flex>
        </TouchableWithoutFeedback>
        <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" px={2}>
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
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={space(3) + insets.bottom}
        style={{ bottom: space(2) }}
      >
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center" pb={2}>
          <Button
            block
            variant="primaryWhite"
            width={buttonWidth}
            loading={isMutatingSkip}
            disabled={isMutatingSubmit || isMutatingSubmit}
            onPress={() => {
              tracking.trackEvent({
                actionName: TrackingSchema.ActionNames.ReservationFeedbackConfirmationSkipButtonTapped,
                actionType: TrackingSchema.ActionTypes.Tap,
              })
              submitFeedback("skipButton")
            }}
          >
            Skip
          </Button>
          <Spacer ml={1} />
          <Button
            block
            loading={isMutatingSubmit}
            disabled={isMutatingSubmit || isMutatingSubmit}
            variant="primaryBlack"
            width={buttonWidth}
            onPress={() => {
              tracking.trackEvent({
                actionName: TrackingSchema.ActionNames.ReservationFeedbackConfirmationSubmitButtonTapped,
                actionType: TrackingSchema.ActionTypes.Tap,
              })
              submitFeedback("submitButton")
            }}
          >
            Submit
          </Button>
        </Flex>
      </KeyboardAvoidingView>
    </Container>
  )
})
