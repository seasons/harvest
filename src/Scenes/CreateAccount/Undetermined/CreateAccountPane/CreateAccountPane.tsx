import { Box, Button, Container, FakeTextInput, Flex, Sans, Spacer, TextInput } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { isWholeNumber } from "App/helpers/validation"
import { Text } from "Components/Typography"
import { DatePickerPopUp } from "./DatePickerPopUp"
import gql from "graphql-tag"
import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { useMutation } from "react-apollo"
import { WebviewModal } from "./WebviewModal"

import { useAuthContext } from "App/Navigation/AuthContext"
import AsyncStorage from "@react-native-community/async-storage"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $zipCode: String!
    $isoDateOfBirth: DateTime!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      zipCode: $zipCode
      details: { birthday: $isoDateOfBirth }
    ) {
      user {
        id
        email
        firstName
        lastName
        pushNotificationStatus
        beamsToken
        roles
      }
      token
      refreshToken
      expiresIn
    }
  }
`

interface CreateAccountPaneProps {
  onSignUp: () => void
}

export const CreateAccountPane: React.FC<CreateAccountPaneProps> = ({ onSignUp }) => {
  // Hooks

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isoDateOfBirth, setISODateOfBirth] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [zipCode, setZipCode] = useState("")

  const validateForm = () => {
    // TODO: More stringent name, password, dob, & zipcode checking
    setIsFormValid(
      firstName.length &&
        !firstName.trim().includes(" ") &&
        lastName.length &&
        !lastName.trim().includes(" ") &&
        isValidEmail(email) &&
        password.trim().length &&
        passwordConfirmation === password &&
        dateOfBirth.length &&
        zipCode.length === 5
    )
  }

  useEffect(validateForm, [firstName, lastName, email, password, passwordConfirmation, dateOfBirth, zipCode])

  const [isWebviewModalVisible, setIsWebviewModalVisible] = useState(false)
  const [webViewUrl, setWebViewUrl] = useState(null as string)

  const [isMutating, setIsMutating] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const scrollViewRef: MutableRefObject<ScrollView> = useRef(null)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const insets = useSafeArea()

  const { showPopUp, hidePopUp } = usePopUpContext()
  const { signIn } = useAuthContext()

  // Keyboard handling

  const onFocusTextInput = (index: number) => scrollViewRef?.current?.scrollTo({ y: index * 60, animated: true })

  // Date picker popup

  const showDatePicker = () => {
    setIsDatePickerVisible(true)
  }

  const onPickDate = (date: Date) => {
    setISODateOfBirth(date.toISOString())
    const dateOfBirth = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
      .map((i) => String(i).padStart(2, "0"))
      .join("/")
    setDateOfBirth(dateOfBirth)
  }

  const closeDatePicker = () => {
    setIsDatePickerVisible(false)
  }

  // Form/field validation

  const onZipCodeChange = (val: string) => {
    if (val.length > 5 || !isWholeNumber(val)) {
      // revert to previous valid value
      setZipCode(zipCode)
    } else {
      setZipCode(val)
    }
  }

  // networking

  const [signup] = useMutation(SIGN_UP, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("Error CreateAccountPane.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note:
          "There was an issue creating your account. Double check your details and retry. Note: You cannot use an email that is already linked to an account.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const handleSignup = async () => {
    Keyboard.dismiss()

    if (isMutating) {
      return
    }

    setIsMutating(true)

    const result = await signup({
      variables: {
        email,
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        zipCode,
        isoDateOfBirth,
      },
    })
    if (result?.data) {
      const {
        data: { signup: userSession },
      } = result
      signIn(userSession)
      const beamsToken = userSession.user?.beamsToken
      const roles = userSession?.user?.roles
      const beamsData = { beamsToken, email, roles }
      AsyncStorage.setItem("beamsData", JSON.stringify(beamsData))
      AsyncStorage.setItem("userSession", JSON.stringify(userSession))
      onSignUp()
    }
  }

  // webview

  const showWebview = (url: string) => {
    setWebViewUrl(url)
    setIsWebviewModalVisible(true)
  }

  // Render

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={32 + insets.bottom}>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 85, paddingHorizontal: 16, overflow: "visible" }}
          ref={scrollViewRef}
        >
          <Sans color="black100" size="3">
            Let's create your account
          </Sans>
          <Spacer mb={1} />
          <Sans color="black50" size="2">
            You'll use this to sign into the app, choose your plan, and manage your membership.
          </Sans>
          <Spacer mb={5} />
          <Flex flexDirection="row">
            <TextInput
              headerText="First name"
              currentValue={firstName}
              variant="light"
              inputKey="first-name"
              autoCapitalize="words"
              onChangeText={(_, val) => setFirstName(val)}
              onFocus={() => onFocusTextInput(0)}
              style={{ flex: 1 }}
            />
            <Spacer mr={9} />
            <TextInput
              headerText="Last name"
              currentValue={lastName}
              variant="light"
              inputKey="last-name"
              autoCapitalize="words"
              onChangeText={(_, val) => setLastName(val)}
              onFocus={() => onFocusTextInput(0)}
              style={{ flex: 1 }}
            />
          </Flex>
          <Spacer mb={4} />
          <TextInput
            headerText="Email"
            variant="light"
            inputKey="email"
            keyboardType="email-address"
            onChangeText={(_, val) => setEmail(val)}
            onFocus={() => onFocusTextInput(1)}
          />
          <Spacer mb={4} />
          <Flex flexDirection="row">
            <TextInput
              secureTextEntry
              headerText="Password"
              variant="light"
              inputKey="password"
              onChangeText={(_, val) => setPassword(val)}
              onFocus={() => onFocusTextInput(2)}
              style={{ flex: 1 }}
            />
            <Spacer mr={9} />
            <TextInput
              secureTextEntry
              headerText="Confirm Password"
              variant="light"
              inputKey="password-confirmation"
              onChangeText={(_, val) => setPasswordConfirmation(val)}
              onFocus={() => onFocusTextInput(2)}
              style={{ flex: 1 }}
            />
          </Flex>
          <Spacer mb={4} />
          <Flex flexDirection="row">
            <FakeTextInput
              headerText="Date of Birth"
              placeholder="mm/dd/yyyy"
              currentValue={dateOfBirth}
              variant="light"
              onPress={() => {
                Keyboard.dismiss()
                showDatePicker()
              }}
              style={{ flex: 1 }}
            />
            <Spacer mr={9} />
            <TextInput
              headerText="ZIP Code"
              currentValue={zipCode}
              variant="light"
              inputKey="zip-code"
              keyboardType="number-pad"
              onChangeText={(_, val) => onZipCodeChange(val)}
              onFocus={() => onFocusTextInput(4)}
              style={{ flex: 1 }}
            />
          </Flex>
          <Spacer height={100} />
        </ScrollView>
        <Box p={2} style={{ backgroundColor: "transparent" }}>
          <Button
            block
            disabled={!isFormValid}
            loading={isMutating}
            onPress={() => handleSignup()}
            variant="primaryBlack"
          >
            Create my account
          </Button>
        </Box>
      </KeyboardAvoidingView>
      <Box p={2} style={{ paddingBottom: insets.bottom + 16, backgroundColor: "white" }}>
        <Flex flexDirection="column" alignItems="center">
          <Text>
            <Sans size="1" color="black50">
              By creating an account, you agree to our
            </Sans>{" "}
          </Text>
          <Text>
            <TouchableWithoutFeedback onPress={() => showWebview("https://www.seasons.nyc/privacy-policy")}>
              <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
                Privacy Policy
              </Sans>
            </TouchableWithoutFeedback>
            <Sans size="1" color="black50">
              {" & "}
            </Sans>
            <TouchableWithoutFeedback onPress={() => showWebview("https://www.seasons.nyc/terms-of-service")}>
              <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
                Terms of Service
              </Sans>
            </TouchableWithoutFeedback>
          </Text>
        </Flex>
      </Box>

      <DatePickerPopUp onDateChange={onPickDate} onRequestClose={closeDatePicker} visible={isDatePickerVisible} />

      <WebviewModal
        visible={isWebviewModalVisible}
        onRequestBack={() => setIsWebviewModalVisible(false)}
        url={webViewUrl}
      />
    </Container>
  )
}