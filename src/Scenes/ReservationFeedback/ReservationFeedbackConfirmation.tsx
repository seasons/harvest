import { Box, Button, FixedBackArrow, FixedButton, Flex, Handle, ProgressBar, Sans, Separator, Spacer, TextInput } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ImageRail } from "App/Scenes/Product/Components"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { Schema } from "App/Navigation"

export const ReservationFeedbackConfirmation: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const { reservationFeedback } = route.params
  const insets = useSafeArea()
  const { width: windowWidth } = Dimensions.get("window")
  const buttonWidth = (windowWidth - 42) / 2

  const onCommentChange = (text) => {

  }

  const onSkipBtnPressed = () => {
    console.log("SKIP")
  }

  const onSubmitBtnPressed = () => {
    console.log("SUBMIT")
    navigation.pop()
    navigation.pop()
    navigation.navigate("Modal", {
      screen: Schema.PageNames.ReservationFeedbackFinish,
      params: { reservationFeedback }
    })
  }

  return (
    <Container >
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box px={2} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
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
              style={{ height: 200, paddingLeft: 0, paddingTop: 0, borderWidth: 0 }}
              placeholder="Tell us anything else on your mind"
              multiline={true}
              onChangeText={(_, val) => onCommentChange(val)}
            />
          </Flex>
        </TouchableWithoutFeedback >
      </Box>
      <FixedKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={{ bottom: insets.bottom + 32 }}>
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center" >
          <Button block variant="primaryWhite" width={buttonWidth} onPress={onSkipBtnPressed}>
            Skip
          </Button>
          <Spacer ml={1} />
          <Button block variant="primaryBlack" width={buttonWidth} onPress={onSubmitBtnPressed}>
            Submit
          </Button>
        </Flex>
      </FixedKeyboardAvoidingView>
    </Container >
  )
})

const FixedKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  position: absolute;
  left: 16;
`

