import { Box, Button, Container, Flex, Sans, Spacer, Separator } from "App/Components"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { ListCheck } from "Assets/svgs/ListCheck"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import gql from "graphql-tag"
import { uniq } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation } from "react-apollo"
import { ScrollView, Dimensions, Linking } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components"
import stripe from "tipsi-stripe"
import { TabBar } from "Components/TabBar"
import * as Sentry from "@sentry/react-native"
import { Schema as TrackSchema, useTracking } from "App/utils/track"
import { PlanButton } from "./PlanButton"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { GetPlans } from "App/generated/GetPlans"
import { ChevronIcon } from "Assets/icons"
import { color } from "App/utils"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"

const PAYMENT_CHECKOUT = gql`
  mutation ApplePayCheckout($planID: String!, $token: StripeToken!) {
    applePayCheckout(planID: $planID, token: $token)
  }
`

const PLAN_UPDATE = gql`
  mutation ChangeCustomerPlan($planID: String!) {
    changeCustomerPlan(planID: $planID)
  }
`

export enum PaneType {
  Update = 0,
  Create = 1,
}

interface ChoosePlanPaneProps {
  onComplete?: () => void
  headerText: String
  data: GetPlans
  paneType: PaneType
}

const viewWidth = Dimensions.get("window").width

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({ onComplete, headerText, data, paneType }) => {
  const plans = data?.paymentPlans
  const faqSections = data?.faq?.sections

  const [selectedPlan, setSelectedPlan] = useState(plans?.[0])
  const insets = useSafeArea()
  const tracking = useTracking()
  const [currentView, setCurrentView] = useState(0)
  const [tiers, setTiers] = useState([])
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [applePayCheckout] = useMutation(PAYMENT_CHECKOUT, {
    onCompleted: () => {
      setIsMutating(false)
      onComplete?.()
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
  const [updatePaymentPlan] = useMutation(PLAN_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
      onComplete?.()
    },
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue updating your plan. Please retry or contact us.",
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
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
  })

  useEffect(() => {
    // Update the selected plan if you switch tabs
    const newSelectedPlan =
      plans?.filter(
        (plan) => tierToReadableText(plan.tier) === tiers?.[currentView] && plan.itemCount === selectedPlan.itemCount
      ) || plans?.filter((plan) => tierToReadableText(plan.tier) === tiers?.[currentView])?.[0]
    setSelectedPlan(newSelectedPlan?.[0])
  }, [currentView])

  useEffect(() => {
    if (plans && plans.length > 0) {
      setSelectedPlan(plans?.[0])
      const planTiers = uniq(plans?.map((plan) => tierToReadableText(plan.tier)))
      setTiers(planTiers)
    }

    const customerPlan = data?.me?.customer?.membership?.plan
    const initialPlan = customerPlan ? plans?.find((plan) => plan.id === customerPlan.id) : plans?.[0]
    const initialTab = customerPlan?.tier === "AllAccess" ? 1 : 0

    setCurrentView(initialTab)
    setSelectedPlan(initialPlan)
  }, [plans])

  const onChoosePlanCreate = async () => {
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

  const onChoosePlanUpdate = () => {
    updatePaymentPlan({
      variables: {
        planID: selectedPlan.planID,
      },
      awaitRefetchQueries: true,
    })
  }

  const onChoosePlan = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)

    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ChoosePlanTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })

    if (paneType === PaneType.Create) {
      await onChoosePlanCreate()
    } else if (paneType === PaneType.Update) {
      await onChoosePlanUpdate()
    }
  }

  const descriptionLines = selectedPlan?.description?.split("\n") || []
  const planColors = ["#000", "#e6b759"]
  const currentColor = planColors[currentView] || "black"

  const tierToReadableText = (tier) => {
    if (tier === "AllAccess") {
      return "All Access"
    } else {
      return tier
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
              {headerText}
            </Sans>
            <Spacer mb={1} />
            <Sans color="black50" size="1">
              Here's what's included in your selected plan:
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
          <Spacer mb={1} />
          <TabBar
            tabColor={currentColor}
            spaceEvenly
            tabs={tiers}
            activeTab={currentView}
            goToPage={(page) => {
              tracking.trackEvent({
                actionName:
                  page === 0 ? TrackSchema.ActionNames.Tier0PlanTabTapped : TrackSchema.ActionNames.Tier1PlanTabTapped,
                actionType: TrackSchema.ActionTypes.Tap,
              })
              setCurrentView(page as number)
            }}
          />
          <Spacer mb={2} />
          {plans
            ?.filter((plan) => tierToReadableText(plan.tier) === tiers?.[currentView])
            ?.sort((a, b) => b.itemCount - a.itemCount)
            ?.map((plan) => {
              return (
                <Box key={plan.id} px={2}>
                  <PlanButton
                    plan={plan}
                    key={plan.id}
                    shouldSelect={setSelectedPlan}
                    selected={selectedPlan?.id === plan.id}
                    selectedColor={currentColor}
                  />
                </Box>
              )
            })}
          <Spacer mb={2} />
          <Separator />
          {!!faqSections?.length &&
            faqSections.map((section, index) => (
              <Box mt={4} key={index} px={2}>
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Sans size="1">{section.title}</Sans>
                  <ChevronIcon rotateDeg="90deg" color={color("black100")} />
                </Flex>
                <Spacer mb={4} />
                {section.subsections.map((subSection) => {
                  return (
                    <Box key={subSection.title}>
                      <Sans size="1">{subSection.title}</Sans>
                      <Spacer mb={1} />
                      <Separator />
                      <Spacer mb={1} />
                      <Sans size="1" color="black50">
                        {subSection.text}
                      </Sans>
                      <Spacer mb={4} />
                    </Box>
                  )
                })}
              </Box>
            ))}
          <Spacer mb={1} />
          <Box px={2}>
            <Button
              block
              variant="primaryWhite"
              onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)}
            >
              Contact us
            </Button>
          </Box>
          <Spacer pb={120} />
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
