import { Box, Button, CloseButton, Container, Flex, Sans, Separator, Spacer } from "App/Components"
import { OverlaySpinner } from "App/Components/OverlaySpinner"
import { PopUp } from "App/Components/PopUp"
import { themeProps } from "App/Components/Theme"
import {
  CreateAccount_Cached_Query as CreateAccount_Cached_Query_Type
} from "App/generated/CreateAccount_Cached_Query"
import {
  CreateAccount_NoCache_Query as CreateAccount_NoCache_Query_Type
} from "App/generated/CreateAccount_NoCache_Query"
import { GetPlans_paymentPlans } from "App/generated/GetPlans"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_USER } from "App/Scenes/Account/Account"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { PaymentMethods } from "App/Scenes/Account/PaymentAndShipping/PaymentMethods"
import { GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { color } from "App/utils"
import { Schema as TrackSchema, useTracking } from "App/utils/track"
import { ChevronIcon } from "Assets/icons"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { ListCheck } from "Assets/svgs/ListCheck"
import { TabBar } from "Components/TabBar"
import gql from "graphql-tag"
import { uniq } from "lodash"
import React, { useEffect, useState } from "react"
import { Dimensions, Linking, ScrollView, TouchableOpacity } from "react-native"
import ConfettiCannon from "react-native-confetti-cannon"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components"

import { useMutation } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { GET_NOTIFICATION_BAR } from "@seasons/eclipse"
import * as Sentry from "@sentry/react-native"

import { Coupon, PaymentMethod } from "../../CreateAccount"
import { PlanButton } from "./PlanButton"
import { calcFinalPrice } from "./utils"

export const PAYMENT_CHECKOUT = gql`
  mutation ApplePayCheckout(
    $planID: String!
    $token: StripeToken!
    $tokenType: String
    $couponID: String
    $shipping: JSON
  ) {
    applePayCheckout(planID: $planID, token: $token, tokenType: $tokenType, couponID: $couponID, shipping: $shipping)
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
  data: CreateAccount_Cached_Query_Type
  dataNoCache: CreateAccount_NoCache_Query_Type
  coupon?: Coupon
  source: "CreateAccountModal" | "UpdatePaymentPlanModal"
  onMountScrollToFaqSection?: boolean
}

const viewWidth = Dimensions.get("window").width

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({
  onComplete,
  headerText,
  data,
  dataNoCache,
  setSelectedPlan,
  selectedPlan,
  coupon: appliedCoupon,
  source,
  onMountScrollToFaqSection,
}) => {
  const coupon = setCoupon(appliedCoupon, dataNoCache?.me?.customer?.coupon)

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
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      { query: GET_USER },
      { query: GET_NOTIFICATION_BAR },
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
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: GET_MEMBERSHIP_INFO,
      },
      { query: GET_NOTIFICATION_BAR },
    ],
  })

  useEffect(() => {
    // Update the selected plan if you switch tabs
    const newSelectedPlan =
      plans?.filter((plan) => plan.tier === tiers?.[currentView] && plan.itemCount === selectedPlan?.itemCount) ||
      plans?.filter((plan) => plan.tier === tiers?.[currentView])?.[0]
    setSelectedPlan(newSelectedPlan?.[0])
  }, [currentView, setSelectedPlan])

  useEffect(() => {
    if (plans && plans.length > 0) {
      const threeItemPlan = plans?.find((p) => p.itemCount === 3)
      const planTiers = uniq(plans?.map((plan) => plan.tier))
      const customerPlan = dataNoCache?.me?.customer?.membership?.plan
      const initialPlan = customerPlan ? plans?.find((plan) => plan.id === customerPlan.id) : threeItemPlan
      const initialTab = 0

      setTiers(planTiers)
      setCurrentView(initialTab)
      setSelectedPlan(initialPlan)
    }
  }, [plans])

  const onAddCreditCard = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.AddCreditCardTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    onComplete(PaymentMethod.CreditCard)
  }

  const onApplePay = async () => {
    // if (isMutating) {
    //   return
    // }
    // setIsMutating(true)
    // tracking.trackEvent({
    //   actionName: TrackSchema.ActionNames.ApplePayTapped,
    //   actionType: TrackSchema.ActionTypes.Tap,
    // })
    // const applePaySupportedOnDevice = await stripe.deviceSupportsApplePay()
    // if (applePaySupportedOnDevice) {
    //   const canMakeApplePayment = await stripe.canMakeApplePayPayments()
    //   if (canMakeApplePayment) {
    //     // Customer has a payment card set up
    //     try {
    //       setShowLoadingOverlay(true)
    //       const finalPrice = calcFinalPrice(selectedPlan.price, coupon)
    //       const token = await stripe.paymentRequestWithNativePay(
    //         {
    //           requiredBillingAddressFields: ["all"],
    //         },
    //         [
    //           {
    //             label: `SZNS, Inc.`,
    //             amount: `${finalPrice / 100}.00`,
    //           },
    //         ]
    //       )
    //       setOpenPopUp(false)
    //       applePayCheckout({
    //         variables: {
    //           planID: selectedPlan.planID,
    //           token,
    //           tokenType: "apple_pay",
    //           couponID: coupon?.couponCode,
    //         },
    //         awaitRefetchQueries: true,
    //       })
    //       // You should complete the operation by calling
    //       stripe.completeApplePayRequest()
    //     } catch (error) {
    //       setShowLoadingOverlay(false)
    //       console.log("error", error)
    //       stripe.cancelApplePayRequest()
    //       setIsMutating(false)
    //     }
    //   } else {
    //     // Customer hasn't set up apple pay on this device so we request payment setup
    //     stripe.openApplePaySetup()
    //     setIsMutating(false)
    //   }
    // }
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
      if (selectedPlan.id === dataNoCache?.me?.customer?.membership?.plan?.id) {
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

  const tabs = tiers.map((t) => (t === "Essential" ? "Monthly" : t))

  return (
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          {source === "CreateAccountModal" && (
            <ConfettiWrapper pointerEvents="none">
              <ConfettiCannon count={150} origin={{ x: 0, y: 0 }} autoStart explosionSpeed={0} />
            </ConfettiWrapper>
          )}
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <Spacer mb={5} />
            <Spacer mb={4} />
            <Box p={2}>
              <Sans color="black100" size="7">
                {headerText}
              </Sans>
              <Spacer mb={1} />
              <Sans color="black50" size="4">
                What's included in your membership
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
                    <Sans color="black50" size="4" style={{ width: viewWidth - 75 }}>
                      {line}
                    </Sans>
                  </Flex>
                )
              })}
            </Flex>
            <Spacer mb={1} />
            {tabs.length > 1 && (
              <>
                <TabBar
                  tabColor={currentColor}
                  spaceEvenly
                  tabs={tabs}
                  strikethroughTabs={[]}
                  activeTab={currentView}
                  goToPage={(page) => {
                    tracking.trackEvent({
                      actionName:
                        page === 0
                          ? TrackSchema.ActionNames.Tier0PlanTabTapped
                          : TrackSchema.ActionNames.Tier1PlanTabTapped,
                      actionType: TrackSchema.ActionTypes.Tap,
                    })
                    setCurrentView(page as number)
                  }}
                />
              </>
            )}
            <Spacer mb={2} />
            {plans
              ?.filter((plan) => plan.tier === tiers?.[currentView])
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
                    <Sans size="4">{section.title}</Sans>
                    <ChevronIcon rotateDeg="90deg" color={color("black100")} />
                  </Flex>
                  <Spacer mb={4} />
                  {section.subsections.map((subSection) => {
                    return (
                      <Box key={subSection.title}>
                        <Sans size="4">{subSection.title}</Sans>
                        <Spacer mb={1} />
                        <Separator />
                        <Spacer mb={1} />
                        <Sans size="4" color="black50">
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
              loading={isMutating}
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
                  <Sans size="4" style={{ textDecorationLine: "underline" }}>
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
        <PaymentMethods onApplePay={onApplePay} onCreditCard={onAddCreditCard} setOpenPopUp={setOpenPopUp} />
      </PopUp>
      {showLoadingOverlay && <OverlaySpinner />}
    </>
  )
}

const setCoupon = (appliedCoupon: Coupon, returnedCoupon): Coupon => {
  let coupon
  if (!!appliedCoupon?.couponCode) {
    coupon = appliedCoupon
  } else {
    if (!!returnedCoupon?.id) {
      coupon = {
        discountAmount: returnedCoupon.amount,
        discountPercentage: returnedCoupon.percentage,
        couponCode: returnedCoupon.id,
        couponType: returnedCoupon.type,
      } as Coupon
    }
  }
  return coupon
}

const ColoredButton = styled(Button)`
  background-color: ${(p: any) => p.backgroundColor};
`

const ConfettiWrapper = styled(Box)`
  z-index: 300;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  top: 0;
`
