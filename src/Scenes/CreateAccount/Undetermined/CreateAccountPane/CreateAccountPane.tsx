import { Box, Button, CloseButton, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { isWholeNumber } from "App/helpers/validation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { ADD_TO_BAG, GET_BAG, GET_LOCAL_BAG } from "App/Scenes/Bag/BagQueries"
import { Schema, useTracking } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Text } from "Components/Typography"
import gql from "graphql-tag"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import AsyncStorage from "@react-native-community/async-storage"

import { WebviewModal } from "./WebviewModal"
import { color } from "App/utils"
import { MultiSelectionTable } from "App/Components/MultiSelectionTable"

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $zipCode: String!
    $discoveryReference: String
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      details: { shippingAddress: { create: { zipCode: $zipCode } }, discoveryReference: $discoveryReference }
    ) {
      user {
        id
        email
        firstName
        lastName
        beamsToken
        roles
        createdAt
      }
      customer {
        id
        status
        detail {
          id
          shippingAddress {
            id
            state
          }
        }
        bagItems {
          id
        }
      }
      token
      refreshToken
      expiresIn
    }
  }
`

interface CreateAccountPaneProps {
  onSignUp: () => void
  howDidYouFindOutAboutUsView: any
}

export const CreateAccountPane: React.FC<CreateAccountPaneProps> = ({ onSignUp, howDidYouFindOutAboutUsView }) => {
  const tracking = useTracking()

  // Hooks
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [discoveryReferences, setDiscoveryReferences] = useState([])

  const validateForm = () => {
    setIsFormValid(
      firstName.length &&
        !firstName.trim().includes(" ") &&
        lastName.length &&
        !lastName.trim().includes(" ") &&
        isValidEmail(email) &&
        password.trim().length &&
        passwordConfirmation === password &&
        zipCode.length === 5
    )
  }

  useEffect(validateForm, [firstName, lastName, email, password, passwordConfirmation, zipCode])

  const [isWebviewModalVisible, setIsWebviewModalVisible] = useState(false)
  const [webViewUrl, setWebViewUrl] = useState(null as string)

  const [isMutating, setIsMutating] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const scrollViewRef: MutableRefObject<ScrollView> = useRef(null)
  const insets = useSafeAreaInsets()

  const { showPopUp, hidePopUp } = usePopUpContext()
  const { signIn } = useAuthContext()

  const { data: localItems } = useQuery(GET_LOCAL_BAG)
  const [addToBag] = useMutation(ADD_TO_BAG)

  // Keyboard handling
  const onFocusTextInput = (index: number) => scrollViewRef?.current?.scrollTo?.({ y: index * 90 + 10, animated: true })

  // Form/field validation
  const onZipCodeChange = (val: string) => {
    if (val.length > 5 || !isWholeNumber(val)) {
      // revert to previous valid value
      setZipCode(zipCode)
    } else {
      setZipCode(val)
    }
  }

  const persistBagItems = async () => {
    if (!!localItems?.localBagItems) {
      for (const item of localItems.localBagItems) {
        await addToBag({
          variables: {
            id: item.variantID,
          },
          refetchQueries: [
            {
              query: GET_BAG,
            },
          ],
        })
      }
    }
  }

  // networking
  const [signup] = useMutation(SIGN_UP, {
    onError: (err) => {
      console.log("[Error CreateAccountPane.tsx]", err)
      let popUpData = {
        title: "Uh Oh. Something went wrong",
        note:
          "It looks like we're having trouble processing your request. Please contact us at membership@seasons.nyc if this persists.",
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

    tracking.trackEvent({
      actionName: Schema.ActionNames.CreateMyAccountTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    const result = await signup({
      variables: {
        email,
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        zipCode,
        discoveryReference: discoveryReferences?.[0] || "",
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

      // Add local bag items to backend
      await persistBagItems()
      onSignUp()
      setIsMutating(false)
    }
  }

  // webview
  const showWebview = (url: string) => {
    setWebViewUrl(url)
    setIsWebviewModalVisible(true)
  }

  // Render
  return (
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={82 - 28}>
          <ScrollView
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 75, paddingHorizontal: 16, overflow: "visible" }}
            ref={scrollViewRef}
          >
            <Sans color="black100" size="7">
              Let's create your account
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="4">
              You'll use this to sign into the app, choose your plan, and manage your membership.
            </Sans>
            <Spacer mb={4} />
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
            <Spacer mb={3} />
            <TextInput
              autoCompleteType="email"
              headerText="Email"
              keyboardType="email-address"
              onChangeText={(_, val) => setEmail(val)}
              onFocus={() => onFocusTextInput(1)}
              textContentType="emailAddress"
              variant="light"
            />
            <Spacer mb={3} />
            <TextInput
              autoCompleteType="password"
              headerText="Password"
              onChangeText={(_, val) => setPassword(val)}
              onFocus={() => onFocusTextInput(3)}
              secureTextEntry
              textContentType="password"
              variant="light"
            />
            <Spacer mb={1} />
            <Sans size="2" color="black50">
              Your password must be at least 8 characters long, include at least one uppercase letter, one lowercase
              letter, & one number.
            </Sans>
            <Spacer mb={3} />
            <TextInput
              autoCompleteType="password"
              headerText="Confirm Password"
              onChangeText={(_, val) => setPasswordConfirmation(val)}
              onFocus={() => onFocusTextInput(4)}
              secureTextEntry
              textContentType="password"
              variant="light"
            />
            <Spacer mb={3} />
            <TextInput
              autoCompleteType="postal-code"
              currentValue={zipCode}
              headerText="ZIP Code"
              keyboardType="number-pad"
              onChangeText={(_, val) => onZipCodeChange(val)}
              onFocus={() => onFocusTextInput(5)}
              textContentType="postalCode"
              variant="light"
            />
            <Spacer mb={3} />
            <Box>
              <Sans size="3" color={color("black50")}>
                {howDidYouFindOutAboutUsView?.title || "How did you hear about us?"}
              </Sans>
              <Spacer mb={1} />
            </Box>
            <Spacer mb={1} />
            <MultiSelectionTable
              items={howDidYouFindOutAboutUsView?.properties?.options}
              onTap={(item) => {
                // Essentially makes it a single select
                if (discoveryReferences.length === 1 && discoveryReferences.includes(item.value)) {
                  setDiscoveryReferences([])
                } else {
                  setDiscoveryReferences([item.value])
                }
              }}
              selectedItems={discoveryReferences}
              itemWidth={120}
            />
            <Spacer height={92} />
          </ScrollView>
          <FadeBottom2>
            <Box p={2}>
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
          </FadeBottom2>
        </KeyboardAvoidingView>
        <Box px={2} style={{ paddingBottom: insets.bottom + 16, backgroundColor: "white" }}>
          <Flex flexDirection="column" alignItems="center">
            <Text>
              <Sans size="2" color="black50">
                By creating an account, you agree to our
              </Sans>{" "}
            </Text>
            <Text>
              <TouchableWithoutFeedback onPress={() => showWebview("https://www.seasons.nyc/privacy-policy")}>
                <Sans style={{ textDecorationLine: "underline" }} size="2" color="black50">
                  Privacy Policy
                </Sans>
              </TouchableWithoutFeedback>
              <Sans size="2" color="black50">
                {" & "}
              </Sans>
              <TouchableWithoutFeedback onPress={() => showWebview("https://www.seasons.nyc/terms-of-service")}>
                <Sans style={{ textDecorationLine: "underline" }} size="2" color="black50">
                  Terms of Service
                </Sans>
              </TouchableWithoutFeedback>
            </Text>
          </Flex>
        </Box>

        <WebviewModal
          visible={isWebviewModalVisible}
          onRequestBack={() => setIsWebviewModalVisible(false)}
          url={webViewUrl}
        />
      </Container>
    </>
  )
}
