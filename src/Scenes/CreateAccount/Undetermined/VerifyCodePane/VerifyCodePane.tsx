import { Box, Button, Container, Sans, Spacer, TextInput, Flex } from "App/Components"
import { isWholeNumber } from "App/helpers/validation"
import { Text } from "Components/Typography"
import React, { useState, useEffect, useRef } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { START_VERIFICATION } from "../SendCodePane/"

const CHECK_VERIFICATION = gql`
  mutation checkSMSVerification($code: String!) {
    checkSMSVerification(code: $code)
  }
`

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

interface VerifyCodePaneProps {
  focus: boolean
  onVerifyPhone: () => void
  onRequestBack: () => void
  phoneNumber?: string
}

export const VerifyCodePane: React.FC<VerifyCodePaneProps> = ({ focus, onVerifyPhone, onRequestBack, phoneNumber }) => {
  const [code, setCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const insets = useSafeArea()

  const textInputRef = useRef(null)
  useEffect(() => {
    if (focus) {
      textInputRef?.current?.focus?.()
    }
  }, [focus])

  const [showBackButton, setShowBackButton] = useState(true)
  const backButtonAnimation = useSpring({
    translateX: isFormValid ? -windowWidth / 2 - 9 / 2 : 0,
    flex: isFormValid ? 0 : 1,
    onStart: () => setShowBackButton(!isFormValid),
    onRest: () => setShowBackButton(!isFormValid),
  })

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [startVerification] = useMutation(START_VERIFICATION, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("Error VerifyCodePane.tsx in startVerification", err)
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

  const [checkVerification] = useMutation(CHECK_VERIFICATION, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("Error VerifyCodePane.tsx in checkVerification", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue checking the verification code. Please retry.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
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
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
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
        const popUpData = {
          title: "Oops! Try again!",
          note: "Double check the verification code and retry. We can resend you the code if you need.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
        showPopUp(popUpData)
      }
    }
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box pt={85} px={2} flex={1}>
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
          headerText="Code"
          inputKey="code"
          keyboardType="number-pad"
          onChangeText={(_, val) => onCodeChange(val)}
          placeholder="000-000"
          ref={textInputRef}
          variant="light"
        />
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(insets.bottom, 16)}>
        <Flex pb={insets.bottom + 16} px={2} flexDirection="row">
          {showBackButton && (
            <>
              <AnimatedBox
                flex={backButtonAnimation.flex}
                style={{ transform: [{ translateX: backButtonAnimation.translateX }] }}
              >
                <Button block disabled={isMutating} onPress={onRequestBack} variant="primaryWhite">
                  Back
                </Button>
              </AnimatedBox>
              <Spacer width={9} />
            </>
          )}
          <Box flex={1}>
            <Button block disabled={!isFormValid} loading={isMutating} onPress={verifyCode} variant="primaryBlack">
              Next
            </Button>
          </Box>
        </Flex>
      </KeyboardAvoidingView>
    </Container>
  )
}

const AnimatedBox = animated(Box)
