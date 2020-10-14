import { Box, Button, Container, Sans, Spacer, TextInput } from "App/Components"
import React, { useState, useEffect, useRef } from "react"
import { KeyboardAvoidingView, Keyboard } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { TextInputRef } from "App/Components/TextInput"
import { useTracking, Schema } from "App/utils/track"

export const START_VERIFICATION = gql`
  mutation startSMSVerification($phoneNumber: String!) {
    startSMSVerification(phoneNumber: $phoneNumber)
  }
`

interface SendCodePaneProps {
  focus: boolean
  onSendCode: (phoneNumber: string) => void
}

export const SendCodePane: React.FC<SendCodePaneProps> = ({ focus, onSendCode }) => {
  const tracking = useTracking()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const insets = useSafeAreaInsets()

  const textInputRef: React.MutableRefObject<TextInputRef> = useRef(null)
  useEffect(() => {
    if (focus) {
      textInputRef?.current?.focus()
    }
  }, [focus])

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [startVerification] = useMutation(START_VERIFICATION, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("Error SendCodePane.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue sending the verification code. Double check your phone number and retry.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const onPhoneNumberChange = (val: string) => {
    if (isMutating) {
      setPhoneNumber(phoneNumber)
    }

    const onlyNums = val.replace(/\D/g, "")
    if (onlyNums.length == 10) {
      setPhoneNumber(`(${onlyNums.substring(0, 3)}) ${onlyNums.substring(3, 6)}-${onlyNums.substring(6)}`)
      setIsFormValid(true)
    } else {
      setPhoneNumber(onlyNums)
      setIsFormValid(false)
    }
  }

  const sendCode = async () => {
    Keyboard.dismiss()
    if (isMutating) {
      return
    }

    tracking.trackEvent({
      actionName: Schema.ActionNames.EnterPhoneNumberNextTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    setIsMutating(true)
    const result = await startVerification({
      variables: {
        phoneNumber,
      },
    })
    if (result?.data) {
      onSendCode(phoneNumber)
    }
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box style={{ paddingTop: 85, paddingHorizontal: 16, flex: 1 }}>
        <Sans color="black100" size="3">
          Enter your phone number
        </Sans>
        <Spacer mb={1} />
        <Sans color="black50" size="1">
          We'll send you a code to verify your account
        </Sans>
        <Spacer mb={4} />
        <TextInput
          currentValue={phoneNumber}
          inputKey="code"
          keyboardType="number-pad"
          onChangeText={(_, val) => onPhoneNumberChange(val)}
          headerText="Phone number"
          placeholder="(000) 000-0000"
          ref={textInputRef}
          variant="light"
        />
        <Spacer mb={3} />
        <Sans size="0.5" color="black50">
          This should be a 10 digit number.
        </Sans>
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(insets.bottom - 8, 8)}>
        <Box style={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
          <Button block disabled={!isFormValid} loading={isMutating} onPress={sendCode} variant="primaryBlack">
            Next
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Container>
  )
}
