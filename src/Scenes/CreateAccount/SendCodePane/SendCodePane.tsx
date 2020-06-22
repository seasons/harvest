import { Box, Button, Container, Sans, Spacer, TextInput } from "App/Components"
import { isWholeNumber } from "App/helpers/validation"
import { Text } from "Components/Typography"
import React, { useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface SendCodePaneProps {
  onSendCode: () => void
}

export const SendCodePane: React.FC<SendCodePaneProps> = ({ onSendCode }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const onPhoneNumberChange = (val: string) => {
    const onlyNums = val.replace(/\D/g, "")
    if (onlyNums.length == 10 && isWholeNumber(onlyNums)) {
      setPhoneNumber(`(${onlyNums.substring(0, 3)}) ${onlyNums.substring(3, 6)}-${onlyNums.substring(6)}`)
      setIsFormValid(true)
    } else {
      setPhoneNumber(onlyNums)
      setIsFormValid(false)
    }
  }

  const sendCode = () => {
    // on success
    onSendCode()
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
        <Spacer mb={5} />
        <TextInput
          currentValue={phoneNumber}
          inputKey="code"
          keyboardType="number-pad"
          onChangeText={(_, val) => onPhoneNumberChange(val)}
          placeholder="(000) 000-0000"
          variant="light"
        />
        <Spacer mb={3} />
        <Text>
          <Sans size="1" color="gray">
            By creating an account, you agree to our
          </Sans>{" "}
        </Text>
        <Text>
          <TouchableWithoutFeedback>
            <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
              Privacy Policy
            </Sans>
          </TouchableWithoutFeedback>
          <Sans size="1" color="gray">
            {" & "}
          </Sans>
          <TouchableWithoutFeedback>
            <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
              Terms of Service
            </Sans>
          </TouchableWithoutFeedback>
        </Text>
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(useSafeArea().bottom, 16)}>
        <Box style={{ padding: 16, paddingBottom: useSafeArea().bottom + 16 }}>
          <Button block disabled={!isFormValid} onPress={sendCode} variant="primaryBlack">
            Next
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Container>
  )
}
