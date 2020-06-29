import { Box, Button, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { isWholeNumber } from "App/helpers/validation"
import { Text } from "Components/Typography"
import { DatePickerPopUp } from "./DatePickerPopUp"
import { FakeTextInput } from "./FakeTextInput"
import gql from "graphql-tag"
import React, { useEffect, useRef, useState, MutableRefObject } from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { useMutation } from "react-apollo"

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
    $slug: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      details: {
        birthday: $isoDateOfBirth
        shippingAddress: { create: { slug: $slug, name: "", address1: "", city: "", state: "", zipCode: $zipCode } }
      }
    ) {
      user {
        id
        email
        firstName
        lastName
        roles
      }
      token
      refreshToken
      expiresIn
    }
  }
`

const makeLocationSlug = (firstName: string, lastName: string): string => {
  const now = new Date()
  const seasonsWaitlistLaunchDate = new Date("10/25/2019")
  const secSinceLaunch = Math.round(now.getTime() - seasonsWaitlistLaunchDate.getTime() / 1000)
  return `${firstName}-${lastName}-${secSinceLaunch}`
}

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

  const [isMutating, setIsMutating] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const scrollViewRef: MutableRefObject<ScrollView> = useRef()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const insets = useSafeArea()

  const errorPopUpContext = usePopUpContext()
  const showErrorPopUp = errorPopUpContext.showPopUp
  const hideErrorPopUp = errorPopUpContext.hidePopUp
  const { signIn } = useAuthContext()

  // Keyboard handling

  const onFocusTextInput = (index: number) => {
    if (!scrollViewRef.current) {
      return
    }
    scrollViewRef.current.scrollTo({ y: index * 60, animated: true })
  }

  // Date picker popup

  const showDatePicker = () => {
    setIsDatePickerVisible(true)
  }

  const closeDatePicker = (date: Date) => {
    setISODateOfBirth(date.toISOString())
    const dateOfBirth = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
      .map((i) => String(i).padStart(2, "0"))
      .join("/")
    setIsDatePickerVisible(false)
    setDateOfBirth(dateOfBirth)
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
      console.log("****\n\n", err, "\n\n****")
      const popUpData = {
        title: "Oops! Try again!",
        note:
          "There was an issue creating your account. Double check your details and retry. Note: You cannot use an email that is already linked to an account.",
        buttonText: "Close",
        onClose: () => hideErrorPopUp(),
      }
      showErrorPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const handleSignup = async () => {
    Keyboard.dismiss()

    if (isMutating) {
      return
    }

    setIsMutating(true)

    const slug = makeLocationSlug(firstName, lastName)

    const result = await signup({
      variables: {
        email,
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        zipCode,
        isoDateOfBirth,
        slug,
      },
    })
    if (result?.data) {
      const {
        data: { signup: userSession },
      } = result
      signIn(userSession)
      AsyncStorage.setItem("userSession", JSON.stringify(userSession))
      onSignUp()
    }
  }

  // Render

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={32 + insets.bottom}>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
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
          <Button block disabled={!isFormValid} onPress={() => handleSignup()} variant="primaryBlack">
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
            <TouchableWithoutFeedback>
              <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
                Privacy Policy
              </Sans>
            </TouchableWithoutFeedback>
            <Sans size="1" color="black50">
              {" & "}
            </Sans>
            <TouchableWithoutFeedback>
              <Sans style={{ textDecorationLine: "underline" }} size="1" color="black50">
                Terms of Service
              </Sans>
            </TouchableWithoutFeedback>
          </Text>
        </Flex>
      </Box>

      <DatePickerPopUp onRequestClose={closeDatePicker} visible={isDatePickerVisible} />
    </Container>
  )
}
