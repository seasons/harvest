import { Box, Button, Container, Flex, Sans, Spacer } from "App/Components"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { ListCheck } from "Assets/svgs/ListCheck"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation } from "react-apollo"
import { ScrollView, Dimensions } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components"
import stripe from "tipsi-stripe"

import * as Sentry from "@sentry/react-native"

import { PlanTile } from "./PlanTile"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"

const PAYMENT_CHECKOUT = gql`
  mutation applePayCheckout($planID: String!, $token: StripeToken!) {
    applePayCheckout(planID: $planID, token: $token)
  }
`

interface ChoosePlanPaneProps {
  setNextState: () => void
  plans: any
}

const viewWidth = Dimensions.get("window").width

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({ plans, setNextState }) => {
  const [selectedPlan, setSelectedPlan] = useState(plans?.[0])
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
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
  })

  useEffect(() => {
    if (plans && plans.length > 0) {
      setSelectedPlan(plans[0])
    }
  }, [plans])

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
            awaitRefetchQueries: true,
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

  const descriptionLines = selectedPlan?.description?.split("\n") || []
  const planColors = {
    essential: "#000",
    "all-access": "#e6b759",
  }
  const currentColor = planColors[selectedPlan?.planID] || "black"

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
              Here’s whats included in this membership:
            </Sans>
            <Spacer mb={1} />
          </Box>
          <Flex flexDirection="column">
            {descriptionLines.map((line) => {
              return (
                <Flex flexDirection="row" pb={1} px={1} alignItems="center" key={line} width="100%">
                  <Box mx={1} mr={1.5}>
                    <ListCheck />
                  </Box>
                  <Sans color="black50" size="1" style={{ width: viewWidth - 75 }}>
                    {line}
                  </Sans>
                </Flex>
              )
            })}
          </Flex>
          <Flex flexDirection="row" pl={"12px"} mt={2}>
            {plans?.map((plan) => {
              return (
                <PlanTile
                  plan={plan}
                  key={plan.id}
                  shouldSelect={setSelectedPlan}
                  selected={selectedPlan?.id === plan.id}
                  selectedColor={currentColor}
                />
              )
            })}
          </Flex>
          <Box mt={3} px={2}>
            <Sans color="black50" size="1">
              Have a question about membership? Contact us at membership@seasons.nyc and we’ll be happy to help.
            </Sans>
          </Box>
          <Spacer pb={150} />
        </ScrollView>
      </Box>
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Box p={2}>
          <ColoredButton
            block
            disabled={!selectedPlan}
            loading={isMutating}
            onPress={onChoosePlan}
            variant="primaryBlack"
            backgroundColor={currentColor}
          >
            Choose plan
          </ColoredButton>
          <Box style={{ height: insets.bottom }} />
        </Box>
      </FadeBottom2>
    </Container>
  )
}

const ColoredButton = styled(Button)`
  background-color: ${(p: any) => p.backgroundColor};
`
