import { Box, Button, Container, Sans, Spacer, TextInput } from "App/Components"
import { isWholeNumber } from "App/helpers/validation"
import { Text } from "Components/Typography"
import React, { useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface VerifyCodePaneProps {
  onVerifyPhone: () => void
}

export const VerifyCodePane: React.FC<VerifyCodePaneProps> = ({ onVerifyPhone }) => {
  const [code, setCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const onCodeChange = (val: string) => {
    const noDashes = val.replace("-", "")
    if (noDashes.length == 6 && isWholeNumber(noDashes)) {
      setCode(`${noDashes.substring(0, 3)}-${noDashes.substring(3)}`)
      setIsFormValid(true)
    } else {
      setCode(noDashes)
      setIsFormValid(false)
    }
  }

  const resendCode = () => {}

  const verifyCode = () => {
    // on success
    onVerifyPhone()
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box style={{ paddingTop: 85, paddingHorizontal: 16, flex: 1 }}>
        <Sans color="black100" size="3">
          Enter the code we sent you
        </Sans>
        <Spacer mb={1} />
        <Text>
          <Sans color="black50" size="2">
            Need us to send it again?
          </Sans>{" "}
          <TouchableWithoutFeedback>
            <Sans color="black100" onPress={resendCode} size="2" style={{ textDecorationLine: "underline" }}>
              Resend
            </Sans>
          </TouchableWithoutFeedback>
        </Text>
        <Spacer mb={5} />
        <TextInput
          currentValue={code}
          inputKey="code"
          keyboardType="number-pad"
          onChangeText={(_, val) => onCodeChange(val)}
          placeholder="000-000"
          variant="light"
        />
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(useSafeArea().bottom, 16)}>
        <Box style={{ padding: 16, paddingBottom: useSafeArea().bottom + 16 }}>
          <Button block disabled={!isFormValid} onPress={verifyCode} variant="primaryBlack">
            Next
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Container>
  )
}
