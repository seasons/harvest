import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Dimensions, Keyboard, KeyboardAvoidingView } from "react-native"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box, Button, Container, Flex, FixedBackArrow, Sans, Spacer, TextInput } from "App/Components"
import { GET_PAYMENT_DATA } from "./PaymentAndShipping"
import {
  GetUserPaymentData_me_customer_billingInfo,
  GetUserPaymentData_me_customer_detail_shippingAddress,
} from "src/generated/getUserPaymentData"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { space } from "App/utils"
import { screenTrack } from "App/utils/track"
import * as Sentry from "@sentry/react-native"
import analytics from "@segment/analytics-react-native"
import { Schema as NavigationSchema } from "App/Navigation"

export const GET_CURRENT_PLAN = gql`
  query GetCurrentPlan {
    me {
      id
      customer {
        id
        user {
          id
        }
        paymentPlan {
          id
          planID
          price
          name
        }
      }
    }
  }
`

export const PAYMENT_UPDATE = gql`
  mutation applePayUpdatePaymentMethod($planID: String!, $token: StripeToken!, $tokenType: String) {
    applePayUpdatePaymentMethod(planID: $planID, token: $token, tokenType: $tokenType)
  }
`

const UPDATE_PAYMENT_AND_SHIPPING = gql`
  mutation updatePaymentAndShipping($shippingAddress: AddressInput!, $phoneNumber: String!) {
    updatePaymentAndShipping(shippingAddress: $shippingAddress, phoneNumber: $phoneNumber)
  }
`

const BILLING_ADDRESS = "Billing address"
const EDIT_BILLING_INFO = "Edit billing info"
const PHONE_NUMBER = "Phone number"
const SHIPPING_ADDRESS = "Shipping address"

export const EditPaymentAndShipping: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ navigation, route }) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { previousData, data = previousData } = useQuery(GET_CURRENT_PLAN)
  const billingAddress: GetUserPaymentData_me_customer_billingInfo = route?.params?.billingInfo
  const currentShippingAddress: GetUserPaymentData_me_customer_detail_shippingAddress = route?.params?.shippingAddress
  const currentPhoneNumber = route?.params?.phoneNumber
  const insets = useSafeAreaInsets()
  const [isMutating, setIsMutating] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address1: currentShippingAddress?.address1 || "",
    address2: currentShippingAddress?.address2 || "",
    city: currentShippingAddress?.city || "",
    state: currentShippingAddress?.state || "",
    zipCode: currentShippingAddress?.zipCode || "",
  })
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber)

  console.log("billingAddress 1212", billingAddress)

  const [updatePaymentAndShipping] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Make sure your shipping and billing address are both valid.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      if (error.toString().includes("shipping address is invalid")) {
        popUpData = {
          title: "Your shipping address is invalid",
          note: "Please check if your shipping address looks valid. If you're having trouble contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      } else if (error.toString().includes("billing address is invalid")) {
        popUpData = {
          title: "Your billing address is invalid",
          note: "Please check if your billing address looks valid. If you're having trouble contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      }
      Sentry.captureException(error)
      Keyboard.dismiss()
      showPopUp(popUpData)
      console.log("Error EditView.tsx: ", error)
    },
    onCompleted: (data) => {
      const userId = data?.customer?.user?.id
      if (!!userId) {
        analytics.identify(userId, { state: shippingState })
      }
    },
  })

  const {
    address1: shippingAddress1,
    address2: shippingAddress2,
    city: shippingCity,
    state: shippingState,
    zipCode: shippingZipCode,
  } = shippingAddress

  const paymentPlan = data?.me?.customer?.paymentPlan

  const handleSaveBtnPressed = async () => {
    setIsMutating(true)
    const result = await updatePaymentAndShipping({
      variables: {
        phoneNumber,
        shippingAddress: {
          city: shippingCity,
          postalCode: shippingZipCode,
          state: shippingState,
          street1: shippingAddress1,
          street2: shippingAddress2,
        },
      },
      refetchQueries: [
        {
          query: GET_PAYMENT_DATA,
        },
      ],
    })
    setIsMutating(false)
    if (result) {
      navigation.goBack()
    }
  }

  const handleCancelBtnPressed = () => navigation.goBack()

  const sections = [SHIPPING_ADDRESS, BILLING_ADDRESS, PHONE_NUMBER, EDIT_BILLING_INFO]

  const screenWidth = Dimensions.get("window").width
  const buttonWidth = (screenWidth - 40) / 2
  const renderItem = ({ item: section }) => {
    switch (section) {
      case SHIPPING_ADDRESS:
        return (
          <>
            <Sans size="4">{SHIPPING_ADDRESS}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={shippingAddress1}
              placeholder="Address 1"
              onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address1: text })}
            />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
              <TextInput
                currentValue={shippingAddress2}
                placeholder="Address 2"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, address2: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={shippingZipCode}
                placeholder="Zipcode"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setShippingAddress({ ...shippingAddress, zipCode: text })}
              />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={shippingCity}
                placeholder="City"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => {
                  setShippingAddress({ ...shippingAddress, city: text })
                }}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={shippingState}
                placeholder="State"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => {
                  setShippingAddress({ ...shippingAddress, state: text })
                }}
              />
            </Flex>
          </>
        )
      case PHONE_NUMBER:
        return (
          <>
            <Sans size="4">{PHONE_NUMBER}</Sans>
            <Spacer mb={2} />
            <TextInput
              currentValue={phoneNumber}
              placeholder="Phone number"
              onChangeText={(inputKey, text) => setPhoneNumber(text)}
            />
          </>
        )
      case EDIT_BILLING_INFO:
        return (
          <Flex flexDirection="row" justifyContent="space-between" pt={3}>
            {paymentPlan && (
              <Button
                variant="primaryWhite"
                size="large"
                width="100%"
                onPress={() =>
                  navigation.navigate(NavigationSchema.StackNames.AccountStack, {
                    screen: NavigationSchema.PageNames.EditPaymentMethod,
                    params: { billingAddress, paymentPlan },
                  })
                }
              >
                Edit payment method
              </Button>
            )}
          </Flex>
        )
      default:
        return <></>
    }
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box px={2} style={{ flex: 1 }}>
        <KeyboardAwareFlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box mt={insets.top}>
              <Spacer mb={2} />
              <Sans size="7">Payment & Shipping</Sans>
              <Spacer mb={4} />
            </Box>
          )}
          ItemSeparatorComponent={() => <Spacer mb={3} />}
          keyExtractor={(item, index) => item + String(index)}
          renderItem={renderItem}
          ListFooterComponent={() => <Spacer mb={space(1) * 8 + 50} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={space(2)} style={{ bottom: space(2) }}>
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
          <Button variant="primaryWhite" size="large" width={buttonWidth} onPress={handleCancelBtnPressed}>
            Cancel
          </Button>
          <Spacer ml={1} />
          <Button
            loading={isMutating}
            disabled={isMutating}
            variant="secondaryBlack"
            size="large"
            width={buttonWidth}
            onPress={handleSaveBtnPressed}
          >
            Save
          </Button>
        </Flex>
      </KeyboardAvoidingView>
    </Container>
  )
})
