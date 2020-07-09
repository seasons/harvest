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
      details: { birthday: $isoDateOfBirth, shippingAddress: { create: { zipCode: $zipCode } } }
    ) {
      user {
        id
        email
        firstName
        lastName
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
  const onFocusTextInput = (index: number) => scrollViewRef?.current?.scrollTo?.({ y: index * 60, animated: true })

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
      console.log("Error CreateAccountPane.tsx")
      let popUpData = {
        title: "Uh Oh. Something went wrong",
        note:
          "It looks like we're having trouble processing your request. Please contact us at membership@seasons.ny if this persists.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      if (err.message.includes("invalid_signup")) {
        popUpData.title = "Oops. That email is already taken"
        popUpData.note =
          "It looks like that email is already associated with another account. If that's you, try logging in."
      } else if (err.message.includes("password_strength_error") || err.message.includes("invalid_password")) {
        popUpData.title = "Choose a stronger password"
        popUpData.note =
          "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."
      } else if (err.message.includes("password_dictionary_error")) {
        popUpData.title = "Choose a stronger password"
        popUpData.note = "Your password is too common. Please pick something harder to guess!"
      } else if (err.message.includes("password_no_user_info_error")) {
        popUpData.title = "Choose a stronger password"
        popUpData.note =
          "Your password includes your personal information. Please choose a stronger password and try again."
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
              autoCapitalize="words"
              autoCompleteType="name"
              currentValue={firstName}
              headerText="First name"
              onChangeText={(_, val) => setFirstName(val)}
              onFocus={() => onFocusTextInput(0)}
              style={{ flex: 1 }}
              textContentType="givenName"
              variant="light"
            />
            <Spacer mr={9} />
            <TextInput
              autoCapitalize="words"
              autoCompleteType="name"
              currentValue={lastName}
              headerText="Last name"
              onChangeText={(_, val) => setLastName(val)}
              onFocus={() => onFocusTextInput(0)}
              style={{ flex: 1 }}
              textContentType="familyName"
              variant="light"
            />
          </Flex>
          <Spacer mb={4} />
          <TextInput
            autoCompleteType="email"
            headerText="Email"
            keyboardType="email-address"
            onChangeText={(_, val) => setEmail(val)}
            onFocus={() => onFocusTextInput(1)}
            textContentType="emailAddress"
            variant="light"
          />
          <Spacer mb={4} />
          <Flex flexDirection="row">
            <TextInput
              autoCompleteType="password"
              headerText="Password"
              onChangeText={(_, val) => setPassword(val)}
              onFocus={() => onFocusTextInput(2)}
              secureTextEntry
              style={{ flex: 1 }}
              textContentType="password"
              variant="light"
            />
            <Spacer mr={9} />
            <TextInput
              autoCompleteType="password"
              headerText="Confirm Password"
              onChangeText={(_, val) => setPasswordConfirmation(val)}
              onFocus={() => onFocusTextInput(2)}
              secureTextEntry
              style={{ flex: 1 }}
              textContentType="password"
              variant="light"
            />
          </Flex>
          <Spacer mb={4} />
          <Flex flexDirection="row">
            <FakeTextInput
              currentValue={dateOfBirth}
              headerText="Date of Birth"
              onPress={() => {
                Keyboard.dismiss()
                showDatePicker()
              }}
              placeholder="mm/dd/yyyy"
              style={{ flex: 1 }}
              variant="light"
            />
            <Spacer mr={9} />
            <TextInput
              autoCompleteType="postal-code"
              currentValue={zipCode}
              headerText="ZIP Code"
              keyboardType="number-pad"
              onChangeText={(_, val) => onZipCodeChange(val)}
              onFocus={() => onFocusTextInput(4)}
              style={{ flex: 1 }}
              textContentType="postalCode"
              variant="light"
            />
          </Flex>
          <Spacer height={100} />
        </ScrollView>
        <Box px={2}>
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
            <Sans size="0" color="black50">
              By creating an account, you agree to our
            </Sans>{" "}
          </Text>
          <Text>
            <TouchableWithoutFeedback onPress={() => showWebview("https://www.seasons.nyc/privacy-policy")}>
              <Sans style={{ textDecorationLine: "underline" }} size="0" color="black50">
                Privacy Policy
              </Sans>
            </TouchableWithoutFeedback>
            <Sans size="0" color="black50">
              {" & "}
            </Sans>
            <TouchableWithoutFeedback onPress={() => showWebview("https://www.seasons.nyc/terms-of-service")}>
              <Sans style={{ textDecorationLine: "underline" }} size="0" color="black50">
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
