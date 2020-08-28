import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import stripe from "tipsi-stripe"
import { Dimensions } from "react-native"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, Container, Flex, FixedBackArrow, Radio, Sans, Spacer, TextInput } from "App/Components"
import styled from "styled-components/native"
import { GET_PAYMENT_DATA } from "./PaymentAndShipping"
import {
  GetUserPaymentData_me_customer_billingInfo,
  GetUserPaymentData_me_customer_detail_shippingAddress,
} from "src/generated/getUserPaymentData"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { space } from "App/utils"
import * as Sentry from "@sentry/react-native"

export const GET_CURRENT_PLAN = gql`
  query GetCurrentPlan {
    me {
      customer {
        id
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

const PAYMENT_UPDATE = gql`
  mutation applePayUpdatePaymentMethod($planID: String!, $token: StripeToken!) {
    applePayUpdatePaymentMethod(planID: $planID, token: $token)
  }
`

const UPDATE_PAYMENT_AND_SHIPPING = gql`
  mutation updatePaymentAndShipping(
    $billingAddress: AddressInput!
    $shippingAddress: AddressInput!
    $phoneNumber: String!
  ) {
    updatePaymentAndShipping(
      billingAddress: $billingAddress
      shippingAddress: $shippingAddress
      phoneNumber: $phoneNumber
    )
  }
`

const BILLING_ADDRESS = "Billing address"
const EDIT_BILLING_INFO = "Edit billing info"
const PHONE_NUMBER = "Phone number"
const SHIPPING_ADDRESS = "Shipping address"

export const EditPaymentAndShipping: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { data } = useQuery(GET_CURRENT_PLAN)
  const billingInfo: GetUserPaymentData_me_customer_billingInfo = route?.params?.billingInfo
  const currentShippingAddress: GetUserPaymentData_me_customer_detail_shippingAddress = route?.params?.shippingAddress
  const currentPhoneNumber = route?.params?.phoneNumber
  const insets = useSafeArea()
  const [isMutating, setIsMutating] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address1: currentShippingAddress?.address1 || "",
    address2: currentShippingAddress?.address2 || "",
    city: currentShippingAddress?.city || "",
    state: currentShippingAddress?.state || "",
    zipCode: currentShippingAddress?.zipCode || "",
  })
  const [billingAddress, setBillingAddress] = useState({
    address1: billingInfo?.street1 || "",
    address2: billingInfo?.street2 || "",
    city: billingInfo?.city || "",
    state: billingInfo?.state || "",
    zipCode: billingInfo?.postal_code || "",
  })
  const [sameAsDeliveryRadioSelected, setSameAsDeliveryRadioSelected] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber)

  const [applePayUpdatePayment] = useMutation(PAYMENT_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(JSON.stringify(err))
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue updating your payment method. Please retry or contact us.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [updatePaymentAndShipping] = useMutation(UPDATE_PAYMENT_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Make sure your shipping and billing address are valid.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      Sentry.captureException(error)
      showPopUp(popUpData)
      console.log("Error EditView.tsx: ", error)
    },
  })

  const {
    address1: shippingAddress1,
    address2: shippingAddress2,
    city: shippingCity,
    state: shippingState,
    zipCode: shippingZipCode,
  } = shippingAddress

  const {
    address1: billingAddress1,
    address2: billingAddress2,
    city: billingCity,
    state: billingState,
    zipCode: billingZipCode,
  } = billingAddress

  const paymentPlan = data?.me?.customer?.paymentPlan

  const handleSameAsDeliveryAddress = () => {
    if (sameAsDeliveryRadioSelected) {
      setBillingAddress({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      })
    } else {
      setBillingAddress({
        address1: shippingAddress1,
        address2: shippingAddress2,
        city: shippingCity,
        state: shippingState,
        zipCode: shippingZipCode,
      })
    }
    setSameAsDeliveryRadioSelected(!sameAsDeliveryRadioSelected)
  }

  const handleSaveBtnPressed = async () => {
    setIsMutating(true)
    const result = await updatePaymentAndShipping({
      variables: {
        billingAddress: {
          city: billingCity,
          postalCode: billingZipCode,
          state: billingState,
          street1: billingAddress1,
          street2: billingAddress2,
        },
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

  const handleEditBillingInfoBtnPressed = async () => {
    const applePaySupportedOnDevice = await stripe.deviceSupportsApplePay()
    if (applePaySupportedOnDevice) {
      const canMakeApplePayment = await stripe.canMakeApplePayPayments()
      if (canMakeApplePayment) {
        // Customer has a payment card set up
        try {
          const token = await stripe.paymentRequestWithNativePay(
            {
              requiredBillingAddressFields: ["all"],
            },
            [
              {
                label: `${paymentPlan.name} plan`,
                amount: `${paymentPlan.price / 100}.00`,
              },
            ]
          )
          applePayUpdatePayment({
            variables: {
              planID: paymentPlan.planID,
              token: token,
            },
          })
          // You should complete the operation by calling
          stripe.completeApplePayRequest()
        } catch (error) {
          console.log("error", error)
          stripe.cancelApplePayRequest()
          setIsMutating(false)
        }
      } else {
        // Customer hasn't set up apple pay on this device so we request payment setup
        stripe.openApplePaySetup()
        setIsMutating(false)
      }
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
            <Sans size="1">{SHIPPING_ADDRESS}</Sans>
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
      case BILLING_ADDRESS:
        return (
          <>
            <Sans size="1">{BILLING_ADDRESS}</Sans>
            <Spacer mb={2} />
            <Radio
              borderRadius={4}
              selected={sameAsDeliveryRadioSelected}
              onSelect={handleSameAsDeliveryAddress}
              label="Same as delivery address"
              labelSize="1"
            />
            <Spacer mb={2} />
            <TextInput
              currentValue={billingAddress1}
              placeholder="Address 1"
              onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address1: text })}
            />
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={billingAddress2}
                placeholder="Address 2"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address2: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={billingZipCode}
                placeholder="Zipcode"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, zipCode: text })}
              />
            </Flex>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
              <TextInput
                currentValue={billingCity}
                placeholder="City"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, city: text })}
              />
              <Spacer ml={1} />
              <TextInput
                currentValue={billingState}
                placeholder="State"
                style={{ flex: 1 }}
                onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, state: text })}
              />
            </Flex>
          </>
        )
      case PHONE_NUMBER:
        return (
          <>
            <Sans size="1">{PHONE_NUMBER}</Sans>
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
          <Flex flexDirection="row" justifyContent="space-between">
            {paymentPlan && (
              <Button variant="primaryWhite" size="large" width="100%" onPress={handleEditBillingInfoBtnPressed}>
                Edit payment method
              </Button>
            )}
          </Flex>
        )
      default:
        return null
    }
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Box px={2}>
        <KeyboardAwareFlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box mt={insets.top}>
              <Spacer mb={2} />
              <Sans size="3">Payment & Shipping</Sans>
              <Spacer mb={4} />
            </Box>
          )}
          ItemSeparatorComponent={() => <Spacer mb={6} />}
          keyExtractor={(item, index) => item + String(index)}
          renderItem={renderItem}
          ListFooterComponent={() => <Spacer mb={space(1) * 8 + 50} />}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <ButtonWrapper>
        <Flex flexDirection="row" justifyContent="space-between" p={2}>
          <Button variant="primaryWhite" size="large" width={buttonWidth} onPress={handleCancelBtnPressed}>
            Cancel
          </Button>
          <Button
            loading={isMutating}
            variant="secondaryBlack"
            size="large"
            width={buttonWidth}
            onPress={handleSaveBtnPressed}
          >
            Save
          </Button>
        </Flex>
      </ButtonWrapper>
    </Container>
  )
}

const ButtonWrapper = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`
