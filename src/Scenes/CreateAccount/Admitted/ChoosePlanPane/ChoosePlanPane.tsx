import { Box, Button, CloseButton, Container, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { OverlaySpinner } from "App/Components/OverlaySpinner"
import { PopUp } from "App/Components/PopUp"
import { CreateAccount_Cached_Query as CreateAccount_Cached_Query_Type } from "App/generated/CreateAccount_Cached_Query"
import { CreateAccount_NoCache_Query as CreateAccount_NoCache_Query_Type } from "App/generated/CreateAccount_NoCache_Query"
import { GetPlans_paymentPlans } from "App/generated/GetPlans"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_USER } from "App/Scenes/Account/Account"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { PaymentMethods } from "App/Scenes/Account/PaymentAndShipping/PaymentMethods"
import { GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { color } from "App/utils"
import { Schema as TrackSchema, useTracking } from "App/utils/track"
import { ListCheck } from "Assets/svgs/ListCheck"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { Dimensions, ImageBackground, Linking, ScrollView, Text, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import stripe from "tipsi-stripe"

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

const windowWidth = Dimensions.get("window").width
const imageHeight = Dimensions.get("window").height - 55
const imageURL =
  "https://seasons-s3.imgix.net/harvest/Seasons+-+Choose+Plan+-+Background+-2.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb"
export enum PaneType {
  Update = 0,
  Create = 1,
}

interface ChoosePlanPaneProps {
  onComplete?: (method: PaymentMethod) => void
  selectedPlan: GetPlans_paymentPlans
  setSelectedPlan: (plan: GetPlans_paymentPlans) => void
  data: CreateAccount_Cached_Query_Type
  dataNoCache: CreateAccount_NoCache_Query_Type
  coupon?: Coupon
  source: "CreateAccountModal" | "UpdatePaymentPlanModal"
}

export const ChoosePlanPane: React.FC<ChoosePlanPaneProps> = ({
  onComplete,
  data,
  dataNoCache,
  setSelectedPlan,
  selectedPlan,
  coupon: appliedCoupon,
  source,
}) => {
  const coupon = setCoupon(appliedCoupon, dataNoCache?.me?.customer?.coupon)

  const plans = data?.paymentPlans
  const [openPopUp, setOpenPopUp] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const insets = useSafeAreaInsets()
  const tracking = useTracking()
  const navigation = useNavigation()
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

  const sortedPlans = plans?.slice()?.sort((a, b) => b.price - a.price)
  const lowestPlanPrice = sortedPlans?.map((plan) => plan.price)?.reduce((a, b) => Math.min(a, b))

  useEffect(() => {
    if (sortedPlans && sortedPlans.length > 0 && !selectedPlan) {
      const customerPlan = dataNoCache?.me?.customer?.membership?.plan
      const initialPlan = customerPlan ? sortedPlans?.find((plan) => plan.id === customerPlan.id) : sortedPlans[0]

      setSelectedPlan(initialPlan)
    }
  }, [sortedPlans, selectedPlan])

  const onAddCreditCard = () => {
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.AddCreditCardTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    onComplete(PaymentMethod.CreditCard)
  }

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
                label: `SZNS, Inc.`,
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

  const features = selectedPlan?.features

  if (!sortedPlans) {
    return (
      <>
        <CloseButton variant="gray" />
        <Container insetsBottom={false} insetsTop={false}>
          <Loader />
        </Container>
      </>
    )
  }

  return (
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          <ImageBackground
            resizeMode="cover"
            source={{ uri: imageURL }}
            style={{ width: windowWidth, height: imageHeight }}
          >
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
              <Box style={{ position: "absolute", width: "100%" }} pt={5}>
                <Spacer mb={4} />
                <Box px={2}>
                  <Sans color={color("black100")} size="7">
                    You're in.
                  </Sans>
                  <Sans color={color("black100")} size="7">
                    Let's choose your plan
                  </Sans>
                  <Spacer mb={1} />
                </Box>
                <Flex flexDirection="column" pt={3} pb={1}>
                  {features?.included?.map((feature, index) => {
                    return (
                      <Flex flexDirection="row" pb={1.5} px={1} alignItems="center" key={index} width="100%">
                        <Box mx={1} mr={1.5}>
                          <ListCheck feature={true} />
                        </Box>
                        <Sans size="4" color={color("black100")}>
                          {feature}
                        </Sans>
                      </Flex>
                    )
                  })}
                  {features?.excluded?.map((feature, index) => {
                    return (
                      <Flex flexDirection="row" pb={1.5} px={1} alignItems="center" key={index} width="100%">
                        <Box mx={1} mr={1.5}>
                          <ListCheck feature={false} />
                        </Box>
                        <Sans size="4" color={color("black50")} style={{ textDecorationLine: "line-through" }}>
                          {feature}
                        </Sans>
                      </Flex>
                    )
                  })}
                </Flex>
                <Spacer mb={2} />
                {sortedPlans?.map((plan) => {
                  return (
                    <Box key={plan.id} px={2}>
                      <PlanButton
                        lowestPlanPrice={lowestPlanPrice}
                        plan={plan}
                        key={plan.id}
                        shouldSelect={setSelectedPlan}
                        selected={selectedPlan?.id === plan.id}
                        coupon={coupon}
                      />
                    </Box>
                  )
                })}
                <Spacer mb={3} />
                <Box px={2}>
                  <Sans size="3" color="black50">
                    Cancel for any reason within 24 hours for a full refund. Free shipping & dry cleaning are only
                    included on one order per month. Have a question?{" "}
                    <Text
                      style={{ textDecorationLine: "underline" }}
                      onPress={() => Linking.openURL(`mailto:membership@seasons.nyc`)}
                    >
                      Contact us
                    </Text>
                  </Sans>
                </Box>
                <Spacer pb={150} />
              </Box>
            </ScrollView>
          </ImageBackground>
        </Box>

        <Box width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Box p={2} style={{ alignItems: "center" }}>
            <Button
              block
              disabled={!selectedPlan}
              loading={isMutating}
              onPress={onChoosePlan}
              variant="primaryBlack"
              height={50}
            >
              Choose plan
            </Button>
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
        </Box>
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
