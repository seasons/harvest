import { Box, Button, Container, Flex, Sans, Spacer, Separator, CloseButton } from "App/Components"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { color } from "App/utils"
import { Schema as TrackSchema, useTracking } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { ListCheck } from "Assets/svgs/ListCheck"
import { TabBar } from "Components/TabBar"
import gql from "graphql-tag"
import { uniq } from "lodash"
import React, { useEffect, useState } from "react"
import { useMutation } from "react-apollo"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Dimensions, Linking, ScrollView, TouchableOpacity } from "react-native"
import styled from "styled-components"
import stripe from "tipsi-stripe"
import { PlanButton } from "./PlanButton"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { GetPlans, GetPlans_paymentPlans } from "App/generated/GetPlans"
import { ChevronIcon } from "Assets/icons"
import { Coupon, PaymentMethod } from "../../CreateAccount"
import { PopUp } from "App/Components/PopUp"
import { themeProps } from "App/Components/Theme"
import { PaymentMethods } from "./PaymentMethods"
import { calcFinalPrice } from "./utils"
import { AllAccessDisabledPopup } from "./AllAccessDisabledPopup"
import { GET_USER } from "App/Scenes/Account/Account"
import { Spinner } from "App/Components/Spinner"

export const PAYMENT_CHECKOUT = gql`
  mutation ApplePayCheckout($planID: String!, $token: StripeToken!, $tokenType: String, $couponID: String) {
    applePayCheckout(planID: $planID, token: $token, tokenType: $tokenType, couponID: $couponID)
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
  onComplete?: (method: PaymentMethod) => void
  selectedPlan: GetPlans_paymentPlans
  setSelectedPlan: (plan: GetPlans_paymentPlans) => void
  headerText: String
  data: GetPlans
  coupon?: Coupon
  source: "CreateAccountModal" | "UpdatePaymentPlanModal"
  onMountScrollToFaqSection?: boolean
}

const viewWidth = Dimensions.get("window").width

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({
  onComplete,
  headerText,
  data,
  setSelectedPlan,
  selectedPlan,
  coupon,
  source,
  onMountScrollToFaqSection,
}) => {
  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled
  const plans = data?.paymentPlans
  const faqSections = data?.faq?.sections
  const [openPopUp, setOpenPopUp] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const insets = useSafeAreaInsets()
  const tracking = useTracking()
  const navigation = useNavigation()
  const [currentView, setCurrentView] = useState(0)
  const [tiers, setTiers] = useState([])
  const [isMutating, setIsMutating] = useState(false)
  const [showAllAccessDisabledMessage, setShowAllAccessDisabledMessage] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const scrollViewRef = React.useRef(null)
  const [applePayCheckout] = useMutation(PAYMENT_CHECKOUT, {
    onCompleted: () => {
      setIsMutating(false)
      setOpenPopUp(false)
      setShowLoadingOverlay(false)
      onComplete?.(PaymentMethod.ApplePay)
    },
    onError: (err) => {
      setShowLoadingOverlay(false)
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(err)
      let popUpData
      if (err.message.includes("(card_declined)")) {
        popUpData = {
          title: "Sorry, your card was declined",
          note: "You can enter in a different card in the Apple Pay menu.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      } else {
        popUpData = {
          title: "Oops! Try again!",
          note: "There was an issue processing your payment. Please retry or contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
      { query: GET_USER },
    ],
  })

  const [updatePaymentPlan] = useMutation(PLAN_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
      onComplete?.(PaymentMethod.ApplePay)
    },
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      const errorAsString = err.toString()
      Sentry.captureException(err)
      let popUpData
      if (errorAsString.includes("return your current reservation before")) {
        popUpData = {
          title: "Please return your current order first",
          note: "You must return your current reservation before changing your plan.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
      } else {
        popUpData = {
          title: "Oops! Try again!",
          note: "There was an issue updating your plan. Please retry or contact us.",
          buttonText: "Close",
          onClose: hidePopUp,
        }
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
        (plan) => tierToReadableText(plan.tier) === tiers?.[currentView] && plan.itemCount === selectedPlan?.itemCount
      ) || plans?.filter((plan) => tierToReadableText(plan.tier) === tiers?.[currentView])?.[0]
    setSelectedPlan(newSelectedPlan?.[0])
  }, [currentView, setSelectedPlan])

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

  const onAddCreditCard = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.AddCreditCardTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    onComplete(PaymentMethod.CreditCard)
  }

  console.log("data", data)

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
          setShowLoadingOverlay(true)
          const finalPrice = calcFinalPrice(selectedPlan.price, coupon)
          const token = await stripe.paymentRequestWithNativePay(
            {
              requiredBillingAddressFields: ["all"],
            },
            [
              {
                label: `${selectedPlan.name} plan`,
                amount: `${finalPrice / 100}.00`,
              },
            ]
          )
          setOpenPopUp(false)
          applePayCheckout({
            variables: {
              planID: selectedPlan.planID,
              token,
              tokenType: "apple_pay",
              couponID: coupon?.couponCode,
            },
            awaitRefetchQueries: true,
          })
          // You should complete the operation by calling
          stripe.completeApplePayRequest()
        } catch (error) {
          setShowLoadingOverlay(false)
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
    if (isMutating) {
      return
    }
    setIsMutating(true)
    updatePaymentPlan({
      variables: {
        planID: selectedPlan.planID,
      },
      awaitRefetchQueries: true,
    })
  }

  const onChoosePlan = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ChoosePlanTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })

    if (source === "CreateAccountModal") {
      setOpenPopUp(true)
    } else {
      if (selectedPlan.id === data?.me?.customer?.membership?.plan?.id) {
        showPopUp({
          title: "Select a new plan",
          note: "You're already subscribed to this plan. Select a new plan to update.",
          buttonText: "Close",
          onClose: hidePopUp,
        })
      } else {
        onChoosePlanUpdate()
      }
    }
  }

  const onApplyPromoCode = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ApplyPromoCodeEntrypointTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })

    navigation.navigate("Modal", { screen: "ApplyPromoCode", params: { source } })
  }

  const onFaqSectionHeaderLayout = (event) => {
    if (onMountScrollToFaqSection && scrollViewRef.current) {
      const { x, y } = event.nativeEvent.layout
      // layout event y does not include section header top margin,
      // manually subtract so that we don't overshoot the component.
      const scrollDestY = y - themeProps.space["4"]
      scrollViewRef.current.scrollTo({ x, y: scrollDestY, animated: false })
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
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
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
              strikethroughTabs={allAccessEnabled ? [] : ["All Access"]}
              activeTab={currentView}
              goToPage={(page) => {
                tracking.trackEvent({
                  actionName:
                    page === 0
                      ? TrackSchema.ActionNames.Tier0PlanTabTapped
                      : TrackSchema.ActionNames.Tier1PlanTabTapped,
                  actionType: TrackSchema.ActionTypes.Tap,
                })
                if (page === 1 && !allAccessEnabled) {
                  setShowAllAccessDisabledMessage(true)
                } else {
                  setCurrentView(page as number)
                }
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
                      coupon={coupon}
                    />
                  </Box>
                )
              })}
            <Spacer mb={2} />
            <Separator />
            {!!faqSections?.length &&
              faqSections.map((section, index) => (
                <Box mt={4} key={index} px={2} onLayout={onFaqSectionHeaderLayout}>
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
            <Spacer pb={160} />
          </ScrollView>
        </Box>

        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Box p={2} style={{ alignItems: "center" }}>
            <ColoredButton
              block
              disabled={!selectedPlan}
              onPress={onChoosePlan}
              variant="primaryBlack"
              backgroundColor={currentColor}
            >
              Choose plan
            </ColoredButton>
            {source === "CreateAccountModal" && (
              <>
                <Spacer mt={2} />
                <TouchableOpacity onPress={onApplyPromoCode}>
                  <Sans size="1" style={{ textDecorationLine: "underline" }}>
                    Apply promo code
                  </Sans>
                </TouchableOpacity>
              </>
            )}
            <Box style={{ height: insets.bottom }} />
          </Box>
        </FadeBottom2>
      </Container>

      <PopUp show={openPopUp}>
        <PaymentMethods onApplePay={onApplePay} setOpenPopUp={setOpenPopUp} onCreditCard={onAddCreditCard} />
      </PopUp>
      <AllAccessDisabledPopup
        show={showAllAccessDisabledMessage}
        onPress={() => setShowAllAccessDisabledMessage(false)}
      />
      {showLoadingOverlay && (
        <Overlay>
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        </Overlay>
      )}
    </>
  )
}

const ColoredButton = styled(Button)`
  background-color: ${(p: any) => p.backgroundColor};
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 200;
`
