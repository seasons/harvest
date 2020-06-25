import { Box, Button, Container, Sans, Spacer, TextInput, Flex } from "App/Components"
import { isWholeNumber } from "App/helpers/validation"
import { Text } from "Components/Typography"
import React, { useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const START_VERIFICATION = gql`
  mutation startSMSVerification($phoneNumber: String!) {
    startSMSVerification(phoneNumber: $phoneNumber)
  }
`

const CHECK_VERIFICATION = gql`
  mutation checkSMSVerification($code: String!) {
    checkSMSVerification(code: $code)
  }
`

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

interface VerifyCodePaneProps {
  phoneNumber?: string
  onVerifyPhone: () => void
  onRequestBack: () => void
}

export const VerifyCodePane: React.FC<VerifyCodePaneProps> = ({ phoneNumber, onVerifyPhone, onRequestBack }) => {
  const [code, setCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const insets = useSafeArea()

  const [showBackButton, setShowBackButton] = useState(true)
  const backButtonAnimation = useSpring({
    translateX: isFormValid ? -windowWidth / 2 - 9 / 2 : 0,
    flex: isFormValid ? 0 : 1,
    onStart: () => setShowBackButton(!isFormValid),
    onRest: () => setShowBackButton(!isFormValid),
  })

  const [isMutating, setIsMutating] = useState(false)
  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp
  const errorPopUpData = {
    title: "Oops! Try again!",
    note: "Double check the code and retry. We can resend you the code if you need.",
    buttonText: "Close",
    onClose: () => hideErrorPopUp(),
  }

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

  const [checkVerification] = useMutation(CHECK_VERIFICATION, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("****\n\n", err, "\n\n****")
      showErrorPopUp(errorPopUpData)
      setIsMutating(false)
    },
  })

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

  const resendCode = async () => {
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
      const popUpData = {
        title: "We sent you a code",
        note: "Check your messages for the code and enter it here.",
        buttonText: "Close",
        onClose: () => hideErrorPopUp(),
      }
      showErrorPopUp(popUpData)
    }
  }

  const verifyCode = async () => {
    Keyboard.dismiss()

    if (isMutating) {
      return
    }

    setIsMutating(true)
    const result = await checkVerification({
      variables: {
        code: code.replace("-", ""),
      },
    })
    if (result?.data) {
      const {
        data: { checkSMSVerification: status },
      } = result
      if (status === "Approved") {
        onVerifyPhone()
      } else {
        showErrorPopUp(errorPopUpData)
      }
    }
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box pt={85} px={2} style={{ flex: 1 }}>
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
          headerText="Code"
          variant="light"
        />
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(insets.bottom, 16)}>
        <Flex pb={insets.bottom + 16} px={2} flexDirection="row">
          {showBackButton ? (
            <>
              <AnimatedBox
                flex={backButtonAnimation.flex}
                style={{ transform: [{ translateX: backButtonAnimation.translateX }] }}
              >
                <Button block onPress={onRequestBack} variant="primaryWhite">
                  Back
                </Button>
              </AnimatedBox>
              <Spacer width={9} />
            </>
          ) : null}
          <Box flex={1}>
            <Button block disabled={!isFormValid} onPress={verifyCode} variant="primaryBlack">
              Next
            </Button>
          </Box>
        </Flex>
      </KeyboardAvoidingView>
    </Container>
  )
}

const AnimatedBox = animated(Box)
