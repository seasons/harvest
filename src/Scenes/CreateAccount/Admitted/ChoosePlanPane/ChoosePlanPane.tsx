import { PlanTile } from "./PlanTile"
import { Box, Button, Container, Sans, Spacer } from "App/Components"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import * as Sentry from "@sentry/react-native"
import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import stripe from "tipsi-stripe"

const PAYMENT_CHECKOUT = gql`
  mutation applePayCheckout($planID: String!, $token: StripeToken!) {
    applePayCheckout(planID: $planID, token: $token)
  }
`

interface ChoosePlanPaneProps {
  setNextState: () => void
  plans: any
}

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({ plans, setNextState }) => {
  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const insets = useSafeArea()

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [applePayCheckout] = useMutation(PAYMENT_CHECKOUT, {
    onCompleted: () => {
      setIsMutating(false)
      setNextState()
    },
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue processing your payment. Please retry or contact us.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const onChoosePlan = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)

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
                label: `${selectedPlan.name} plan`,
                amount: `${selectedPlan.price / 100}.00`,
              },
            ]
          )
          applePayCheckout({
            variables: {
              planID: selectedPlan.planID,
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

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer mb={5} />
          <Spacer mb={4} />
          <Box p={2}>
            <Sans color="black100" size="3">
              You're in.{"\n"}
              Let's choose your plan
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="1">
              Don't worry, you can change your plan from your profile settings at any time.
            </Sans>
            <Spacer mb={2} />
          </Box>
          {plans?.map((plan) => {
            return (
              <PlanTile
                plan={plan}
                key={plan.id}
                shouldSelect={setSelectedPlan}
                selected={selectedPlan?.id === plan.id}
              />
            )
          })}
          <Box height={footerBoxHeight} />
        </ScrollView>
      </Box>
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Box p={2} onLayout={(e) => setFooterBoxHeight(e.nativeEvent.layout.height)}>
          <Button block disabled={!selectedPlan} loading={isMutating} onPress={onChoosePlan} variant="primaryBlack">
            Choose plan
          </Button>
          <Box style={{ height: insets.bottom }} />
        </Box>
      </FadeBottom2>
    </Container>
  )
}
