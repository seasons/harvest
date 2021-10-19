import { Box, Button, Container, FixedBackArrow, Flex, Sans, Separator, Spacer, TextInput } from "App/Components"
import { Schema as NavigationSchema } from "App/Navigation"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { color } from "App/utils/color"
import { space } from "App/utils/space"
import { Schema as TrackSchema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs/CheckCircled"
import { String } from "aws-sdk/clients/augmentedairuntime"
import React, { useEffect, useState } from "react"
import { Dimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import styled from "styled-components"
import stripe, { PaymentCardTextField } from "tipsi-stripe"
import { useMutation, useQuery } from "@apollo/client"
import { useNotificationBarContext } from "@seasons/eclipse"
import * as Sentry from "@sentry/react-native"

import { PAYMENT_UPDATE } from "./PaymentAndShipping"
import { GET_PAYMENT_DATA } from "./queries"

interface BillingAddress {
  street1: string
  street2: string
  city: string
  state: string
  postal_code: String
}

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width
const singleButtonWidth = windowWidth - 42
const buttonWidth = singleButtonWidth / 2

const PaymentForm = ({ setBillingAddress, isMutating, handleFieldParamsChange, billingAddress }) => {
  const address1 = billingAddress?.address1
  const address2 = billingAddress?.address2
  const city = billingAddress?.city
  const state = billingAddress?.state
  const zipCode = billingAddress?.zipCode

  return (
    <Box px={2} pb={150}>
      <Spacer mb={4} />
      <Sans size="4">Card information</Sans>
      <Spacer mb={3} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
        <Sans color="black50" size="3">
          Card number, Expiration date & CIV
        </Sans>
      </Flex>
      <PaymentField
        cursorColor={color("black50")}
        textErrorColor={color("black50")}
        placeholderColor={color("black50")}
        numberPlaceholder="16 digits"
        expirationPlaceholder="MM / YY"
        cvcPlaceholder="3-digits"
        disabled={isMutating}
        onParamsChange={handleFieldParamsChange}
      />
      <Separator />
      <Spacer mb={4} />
      <Sans size="4">Billing address</Sans>
      <Spacer mb={2} />
      <TextInput
        currentValue={address1}
        placeholder="Address 1"
        onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address1: text })}
      />
      <Spacer mb={2} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        <TextInput
          currentValue={address2}
          placeholder="Address 2"
          style={{ flex: 1 }}
          onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, address2: text })}
        />
        <Spacer ml={1} />
        <TextInput
          currentValue={zipCode}
          placeholder="Zip code"
          style={{ flex: 1 }}
          onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, zipCode: text })}
        />
      </Flex>
      <Spacer mb={2} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        <TextInput
          currentValue={city}
          placeholder="City"
          style={{ flex: 1 }}
          onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, city: text })}
        />
        <Spacer ml={1} />
        <TextInput
          currentValue={state}
          placeholder="State"
          style={{ flex: 1 }}
          onChangeText={(inputKey, text) => setBillingAddress({ ...billingAddress, state: text })}
        />
      </Flex>
    </Box>
  )
}

export const EditCreditCard: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  let paymentPlan = route?.params?.paymentPlan
  let routeBillingAddress: BillingAddress = route?.params?.billingAddress
  const { data } = useQuery(GET_PAYMENT_DATA, { skip: !!paymentPlan })
  if (!paymentPlan) {
    paymentPlan = data?.me?.customer?.paymentPlan
    routeBillingAddress = data?.me?.customer?.billingInfo
  }

  const tracking = useTracking()

  const { hideNotificationBar } = useNotificationBarContext()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const [onPaymentUpdate, setOnPaymentUpdate] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [billingAddress, setBillingAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const address1 = billingAddress?.address1
  const address2 = billingAddress?.address2
  const city = billingAddress?.city
  const state = billingAddress?.state
  const zipCode = billingAddress?.zipCode

  useEffect(() => {
    if (routeBillingAddress) {
      const address1 = routeBillingAddress?.street1 || ""
      const address2 = routeBillingAddress?.street2 || ""
      const city = routeBillingAddress?.city || ""
      const state = routeBillingAddress?.state || ""
      const zipCode = routeBillingAddress?.postal_code || ""

      setBillingAddress({
        address1,
        address2,
        city,
        state,
        zipCode,
      })
    }
  }, [routeBillingAddress])

  const [updateCreditCard] = useMutation(PAYMENT_UPDATE, {
    refetchQueries: [
      {
        query: GET_PAYMENT_DATA,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      setOnPaymentUpdate(true)
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

  const handleFieldParamsChange = (valid, values) => {
    const { number, expMonth, expYear, cvc } = values

    setCardNumber(number)
    setExpMonth(expMonth)
    setExpYear(expYear)
    setCvc(cvc)
  }

  const handleOnSubmit = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)

    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.AddCreditCardTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })

    if (!address1 || !city || !state || !zipCode) {
      showPopUp({
        title: "Your billing address is incomplete",
        note: "Please complete your billing address before updating your card number.",
        buttonText: "Close",
        onClose: hidePopUp,
      })
      setIsMutating(false)
    } else {
      try {
        const params = {
          // mandatory
          number: cardNumber,
          expMonth,
          expYear,
          cvc,
          // optional
          addressLine1: address1,
          addressLine2: address2,
          addressCity: city,
          addressState: state,
          // addressCountry: "Test Country",
          addressZip: zipCode,
        }
        const token = await stripe.createTokenWithCard(params)
        updateCreditCard({
          variables: {
            planID: paymentPlan.planID,
            token,
            tokenType: "card",
          },
          awaitRefetchQueries: true,
        })
        // You should complete the operation by calling
        stripe.completeApplePayRequest()
        hideNotificationBar()
      } catch (error) {
        const popUpData = {
          title: "Oops! Try again!",
          note: "Your card is invalid.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
        showPopUp(popUpData)
        console.log("error", error)
        setIsMutating(false)
      }
    }
  }

  return (
    <Container insetsBottom={false}>
      {!onPaymentUpdate && (
        <FixedBackArrow
          navigation={navigation}
          onPress={() => {
            navigation.navigate(NavigationSchema.StackNames.AccountStack, {
              screen: NavigationSchema.PageNames.PaymentAndShipping,
            })
          }}
          variant="whiteBackground"
        />
      )}
      <ScrollView style={{ flex: 1 }}>
        <Spacer mt={100} />
        <Box px={2}>
          {onPaymentUpdate && (
            <>
              <CheckCircled backgroundColor={color("green100")} />
              <Spacer mb={2} />
            </>
          )}
          <Sans size="7">{onPaymentUpdate ? "Payment method updated" : "Update your payment method"}</Sans>
        </Box>
        {!onPaymentUpdate && (
          <PaymentForm
            setBillingAddress={setBillingAddress}
            isMutating={isMutating}
            handleFieldParamsChange={handleFieldParamsChange}
            billingAddress={billingAddress}
          />
        )}
      </ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={space(2)} style={{ bottom: space(2) }}>
        {onPaymentUpdate ? (
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
            <Button
              disabled={isMutating}
              variant="primaryBlack"
              size="large"
              width={singleButtonWidth}
              onPress={() => {
                navigation.navigate(NavigationSchema.StackNames.AccountStack, {
                  screen: NavigationSchema.PageNames.PaymentAndShipping,
                })
              }}
            >
              Close
            </Button>
          </Flex>
        ) : (
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center">
            <Button
              disabled={isMutating}
              variant="primaryWhite"
              width={buttonWidth}
              onPress={() => {
                navigation.goBack()
              }}
            >
              Go back
            </Button>
            <Spacer ml={1} />
            <Button width={buttonWidth} block onPress={handleOnSubmit} loading={isMutating} disabled={isMutating}>
              Submit
            </Button>
          </Flex>
        )}
      </KeyboardAvoidingView>
    </Container>
  )
})

const PaymentField = styled(PaymentCardTextField)`
  color: ${color("black100")};
  font-size: 16px;
`
