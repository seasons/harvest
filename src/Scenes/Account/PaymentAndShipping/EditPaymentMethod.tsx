import {
  Box,
  Button,
  CloseButton,
  Container,
  FixedBackArrow,
  Flex,
  Sans,
  Separator,
  Spacer,
  TextInput,
} from "App/Components"
import { Schema as TrackSchema, useTracking, screenTrack } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { PAYMENT_UPDATE } from "App/Scenes/Account/PaymentAndShipping/EditPaymentAndShipping"
import { GET_PAYMENT_DATA } from "App/Scenes/Account/PaymentAndShipping/PaymentAndShipping"
import { color } from "App/utils/color"
import { CheckCircled } from "Assets/svgs/CheckCircled"
import { String } from "aws-sdk/clients/augmentedairuntime"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Dimensions, Keyboard, KeyboardAvoidingView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import stripe, { PaymentCardTextField } from "tipsi-stripe"
import * as Sentry from "@sentry/react-native"
import { PaymentMethods } from "./PaymentMethods"
import { Schema as NavigationSchema } from "App/Navigation"

interface BillingAddress {
  street1: string
  street2: string
  city: string
  state: string
  postal_code: String
}

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const EditPaymentMethod: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const paymentPlan = route?.params?.paymentPlan
  const routeBillingAddress: BillingAddress = route?.params?.billingAddress
  const [applePaySuccess, setShowApplePaySuccess] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const insets = useSafeAreaInsets()
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [applePayUpdatePayment] = useMutation(PAYMENT_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
    },
    refetchQueries: [
      {
        query: GET_PAYMENT_DATA,
      },
    ],
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(JSON.stringify(err))
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue updating your payment method. Please retry or contact us.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      Keyboard.dismiss()
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const onApplePay = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ApplePayTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
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
                label: "SZNS Inc.",
                amount: `${paymentPlan.price / 100}.00`,
              },
            ]
          )
          applePayUpdatePayment({
            variables: {
              planID: paymentPlan.planID,
              token,
              tokenType: "apple_pay",
            },
            awaitRefetchQueries: true,
          })
          // You should complete the operation by calling
          stripe.completeApplePayRequest()
          setShowApplePaySuccess(true)
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

  const CardSuccess = () => {
    return (
      <Flex style={{ flex: 1 }} flexDirection="row" justifyContent="center" alignItems="flex-start">
        <Box pb={insets.bottom} px={2} style={{ width: windowWidth }}>
          <Spacer mb={4} />
          <CheckCircled backgroundColor={color("green100")} />
          <Spacer mb={2} />
          <Separator />
          <Spacer mb={2} />
          <Sans size="4" style={{ width: windowWidth - 100 }}>
            Your card has been successfully updated.
          </Sans>
          <Spacer mb={4} />
          <Button
            block
            onPress={() => {
              navigation.goBack()
            }}
          >
            Close
          </Button>
        </Box>
      </Flex>
    )
  }

  const onCreditCard = () => {
    navigation.navigate(NavigationSchema.StackNames.AccountStack, {
      screen: NavigationSchema.PageNames.EditCreditCard,
      params: { billingAddress: routeBillingAddress, paymentPlan },
    })
  }

  return (
    <Container>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Spacer mt={100} />
      <Box px={2}>
        <Sans size="7">Update your payment method</Sans>
      </Box>
      {applePaySuccess ? <CardSuccess /> : <PaymentMethods onApplePay={onApplePay} onCreditCard={onCreditCard} />}
    </Container>
  )
})
