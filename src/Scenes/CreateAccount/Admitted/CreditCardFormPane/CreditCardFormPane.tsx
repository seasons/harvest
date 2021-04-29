import { Box, Button, CloseButton, Container, Flex, Sans, Separator, Spacer, Toggle } from "App/Components"
import { GetPlans_me_customer, GetPlans_paymentPlans } from "App/generated/GetPlans"
import { isWholeNumber } from "App/helpers/validation"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { StatePickerPopUp } from "App/Scenes/Account/EditShippingAddress/StatePickerPopup"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { color } from "App/utils/color"
import { BackArrowIcon } from "Assets/icons"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useEffect, useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components"
import stripe, { PaymentCardTextField } from "tipsi-stripe"
import { useMutation } from "@apollo/client"
import * as Sentry from "@sentry/react-native"
import { Coupon, State } from "../../CreateAccount"
import { PAYMENT_CHECKOUT } from "../ChoosePlanPane/ChoosePlanPane"
import { calcFinalPrice } from "../ChoosePlanPane/utils"
import { GET_USER } from "App/Scenes/Account/Account"
import { CreditCardFormAddressFields } from "./CreditCardFormAddressFields"

const windowDimensions = Dimensions.get("window")

interface CreditCardFormPaneProps {
  plan: GetPlans_paymentPlans
  customer: GetPlans_me_customer
  onSubmit: () => void
  onRequestBack: () => void
  coupon: Coupon
  currentState: State
}

export const CreditCardFormPane: React.FC<CreditCardFormPaneProps> = ({
  currentState,
  onSubmit,
  plan,
  onRequestBack,
  coupon,
  customer,
}) => {
  const addressInitialState = {
    name: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    state: "",
  }
  const insets = useSafeAreaInsets()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)

  const [billingAddress, setBillingAddress] = useState(addressInitialState)
  const [shippingAddress, setShippingAddress] = useState(addressInitialState)

  const [cardNumber, setCardNumber] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [cvc, setCvc] = useState("")

  const [isBillingStatePickerVisible, setIsBillingStatePickerVisible] = useState(false)
  const [isShippingStatePickerVisible, setIsShippingStatePickerVisible] = useState(false)
  const [sameAsShipping, setSameAsShipping] = useState(true)

  useEffect(() => {
    if (customer) {
      const userFirstName = customer?.user?.firstName
      const userLastName = customer?.user?.lastName
      const initialShippingAddress = customer?.detail?.shippingAddress

      if (!shippingAddress.name && ((!!userLastName && !!userFirstName) || initialShippingAddress)) {
        setShippingAddress({
          ...shippingAddress,
          name: !!userFirstName && !!userLastName ? `${userFirstName} ${userLastName}` : "",
          zipCode: initialShippingAddress?.zipCode || "",
          city: initialShippingAddress?.city || "",
          state: initialShippingAddress?.state || "",
        })
      }
    }
  }, [customer])

  const [paymentCheckout] = useMutation(PAYMENT_CHECKOUT, {
    onCompleted: () => {
      setIsMutating(false)
      onSubmit()
    },
    onError: (err) => {
      Keyboard.dismiss()
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(err)
      let popUpData
      if (err.message.includes("(card_declined)")) {
        popUpData = {
          title: "Sorry, your card was declined",
          note: "Please try again with a different card.",
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

  const handleFieldParamsChange = (valid, values) => {
    const { number, expMonth, expYear, cvc } = values

    setCardNumber(number)
    setExpMonth(expMonth)
    setExpYear(expYear)
    setCvc(cvc)
  }

  const handleOnSubmit = async () => {
    Keyboard.dismiss()
    if (isMutating) {
      return
    }
    setIsMutating(true)
    const params = {
      // mandatory
      number: cardNumber,
      expMonth,
      expYear,
      cvc,
      // optional
      name: sameAsShipping ? shippingAddress.name : billingAddress.name,
      addressLine1: sameAsShipping ? shippingAddress.address1 : billingAddress.address1,
      addressLine2: sameAsShipping ? shippingAddress.address2 : billingAddress.address2,
      addressCity: sameAsShipping ? shippingAddress.city : billingAddress.city,
      addressState: sameAsShipping ? shippingAddress.state : billingAddress.state,
      addressZip: sameAsShipping ? shippingAddress.zipCode : billingAddress.zipCode,
    }
    try {
      const token = await stripe.createTokenWithCard(params)
      paymentCheckout({
        variables: {
          planID: plan?.planID,
          token,
          tokenType: "card",
          couponID: coupon?.couponCode,
          shipping: shippingAddress,
        },
        awaitRefetchQueries: true,
      })
      // You should complete the operation by calling
      stripe.completeApplePayRequest()
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

  const creditCardComplete = cardNumber.length === 16 && cvc.length === 3 && expMonth && expYear
  const shippingComplete =
    !!shippingAddress.name &&
    !!shippingAddress.address1 &&
    !!shippingAddress.zipCode &&
    isWholeNumber(shippingAddress.zipCode) &&
    !!shippingAddress.state &&
    !!shippingAddress.city
  const billingComplete =
    (!!billingAddress.name &&
      !!billingAddress.address1 &&
      !!billingAddress.zipCode &&
      isWholeNumber(billingAddress.zipCode) &&
      !!billingAddress.state &&
      !!billingAddress.city) ||
    sameAsShipping

  const disabled = !billingComplete || !shippingComplete || !creditCardComplete

  const description = plan?.description.split("\n")?.[0]
  const originalPrice = plan?.price
  const finalPrice = calcFinalPrice(originalPrice, coupon)
  const isDiscounted = originalPrice !== finalPrice && !!finalPrice

  if (currentState !== State.CreditCardForm) {
    return null
  }

  return (
    <>
      <BackArrowWrapper>
        <TouchableOpacity onPress={onRequestBack}>
          <ArrowWrapper backgroundColor={color("white100")}>
            <Arrow color="black100" />
          </ArrowWrapper>
        </TouchableOpacity>
      </BackArrowWrapper>
      <CloseButton variant="light" />

      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer mb="100px" />
            <Box p={2}>
              <Sans color="black100" size="7">
                Pay with credit card
              </Sans>
              <Spacer mb={1} />
              <Sans color="black50" size="4">
                Enter payment details to complete checkout
              </Sans>
              <Spacer mb={3} />
              <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                <Box>
                  <Sans color="black100" size="4">
                    {plan?.name}
                  </Sans>
                  <Sans color="black50" size="4">
                    {description}
                  </Sans>
                </Box>
                <Box>
                  {isDiscounted ? (
                    <>
                      <Sans color="black100" size="4" textAlign="right">
                        This month ${finalPrice / 100}
                      </Sans>
                      <Sans color="black50" size="4" textAlign="right">
                        Next month ${originalPrice / 100}
                      </Sans>
                    </>
                  ) : (
                    <Sans color="black100" size="4" textAlign="right">
                      ${originalPrice / 100}
                    </Sans>
                  )}
                </Box>
              </Flex>
              <Spacer mb={4} />
              <Sans color="black100" size="4">
                Shipping address
              </Sans>
              <Spacer mb={2} />
              <CreditCardFormAddressFields
                address={shippingAddress}
                setAddress={setShippingAddress}
                setIsStatePickerVisible={setIsShippingStatePickerVisible}
              />
              <Spacer mb={4} />
              <Sans color="black100" size="4">
                Billing address
              </Sans>
              <Spacer mb={2} />
              <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                <Sans color="black50" size="4">
                  Same as shipping
                </Sans>
                <Toggle onChange={(newValue) => setSameAsShipping(newValue)} selected={sameAsShipping} />
              </Flex>
              {!sameAsShipping && (
                <>
                  <Spacer mb={3} />
                  <CreditCardFormAddressFields
                    address={billingAddress}
                    setAddress={setBillingAddress}
                    setIsStatePickerVisible={setIsBillingStatePickerVisible}
                  />
                </>
              )}
              <Spacer mb={4} />
              <Sans color="black100" size="4">
                Payment information
              </Sans>
              <Spacer mb={2} />
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
            </Box>
            <Spacer pb={160} />
          </ScrollView>
        </Box>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={insets.bottom - 16}>
          <Box width="100%" style={{ position: "relative" }}>
            <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
              <Flex p={2} flexDirection="row">
                <Box style={{ flex: 1 }}>
                  <Button
                    block
                    disabled={disabled}
                    loading={isMutating}
                    onPress={handleOnSubmit}
                    size="large"
                    variant="primaryBlack"
                  >
                    Submit payment
                  </Button>
                </Box>
              </Flex>
              <Spacer height={insets.bottom + 8} />
            </FadeBottom2>
          </Box>
        </KeyboardAvoidingView>

        <StatePickerPopUp
          initialState={isBillingStatePickerVisible ? billingAddress.state : shippingAddress.state}
          onRequestClose={(state) => {
            isBillingStatePickerVisible
              ? setBillingAddress({ ...billingAddress, state })
              : setShippingAddress({ ...shippingAddress, state })
            setIsShippingStatePickerVisible(false)
            setIsBillingStatePickerVisible(false)
          }}
          visible={isBillingStatePickerVisible || isShippingStatePickerVisible}
        />
      </Container>
    </>
  )
}

const PaymentField = styled(PaymentCardTextField)`
  color: ${color("black100")};
  font-size: 16px;
  width: ${windowDimensions.width - 32};
`

const BackArrowWrapper = styled(Box)`
  position: absolute;
  top: 42;
  left: 7;
  z-index: 2000;
`

const ArrowWrapper = styled(Flex)<{ backgroundColor: string }>`
  flex-direction: row;
  background-color: ${(p) => p.backgroundColor};
  border-radius: 100;
  height: 40;
  width: 40;
  align-items: center;
  justify-content: center;
`

const Arrow = styled(BackArrowIcon)`
  left: 4;
`
