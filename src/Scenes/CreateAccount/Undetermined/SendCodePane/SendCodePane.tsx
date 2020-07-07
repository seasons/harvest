import { Box, Button, Container, Sans, Spacer, TextInput } from "App/Components"
import React, { useState, useEffect } from "react"
import { KeyboardAvoidingView, Keyboard } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const START_VERIFICATION = gql`
  mutation startSMSVerification($phoneNumber: String!) {
    startSMSVerification(phoneNumber: $phoneNumber)
  }
`

interface SendCodePaneProps {
  onSendCode: (phoneNumber: string) => void
}

export const SendCodePane: React.FC<SendCodePaneProps> = ({ onSendCode }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp

  const [startVerification] = useMutation(START_VERIFICATION, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("****\n\n", err, "\n\n****")
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue sending the verification code. Double check your phone number and retry.",
        buttonText: "Close",
        onClose: () => hideErrorPopUp(),
      }
      showErrorPopUp(popUpData)
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
        <Sans color="black50" size="2">
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
          variant="light"
        />
        <Spacer mb={3} />
        <Sans size="1" color="black50">
          This should be a 10 digit number.
        </Sans>
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(insets.bottom, 16)}>
        <Box style={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
          <Button block disabled={!isFormValid} loading={isMutating} onPress={sendCode} variant="primaryBlack">
            Next
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Container>
  )
}