import { useMutation } from "@apollo/react-hooks"
import {
  Flex,
  Sans,
  Box,
  CloseButton,
  Container,
  Spacer,
  Separator,
  TextInput,
  FakeTextInput,
  Button,
} from "App/Components"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { color } from "App/utils/color"
import React, { useState } from "react"
import * as Sentry from "@sentry/react-native"
import { isWholeNumber } from "App/helpers/validation"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { Keyboard, KeyboardAvoidingView, ScrollView, Dimensions, TouchableOpacity } from "react-native"
import stripe, { PaymentCardTextField } from "tipsi-stripe"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { StatePickerPopUp } from "App/Scenes/Account/EditShippingAddress/StatePickerPopup"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components"
import { PAYMENT_CHECKOUT } from "../ChoosePlanPane/ChoosePlanPane"
import { GetPlans_paymentPlans } from "App/generated/GetPlans"
import { BackArrowIcon } from "Assets/icons"
import { Coupon, State } from "../../CreateAccount"

const windowDimensions = Dimensions.get("window")

interface CreditCardFormPaneProps {
  plan: GetPlans_paymentPlans
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
}) => {
  const insets = useSafeAreaInsets()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const [name, setName] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [cvc, setCvc] = useState("")

  const [isStatePickerVisible, setIsStatePickerVisible] = useState(false)

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
      name,
      addressLine1: address1,
      addressLine2: address2,
      addressCity: city,
      addressState: state,
      // addressCountry: "Test Country",
      addressZip: zipCode,
    }
    try {
      const token = await stripe.createTokenWithCard(params)
      paymentCheckout({
        variables: {
          planID: plan?.planID,
          token,
          tokenType: "card",
          couponID: coupon?.couponCode,
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

  const disabled =
    !name.trim() ||
    !address1.trim() ||
    !isWholeNumber(zipCode) ||
    zipCode.length !== 5 ||
    !city.trim() ||
    !state ||
    cardNumber.length !== 16 ||
    cvc.length !== 3 ||
    !expMonth ||
    !expYear

  const description = plan?.description.split("\n")?.[0]

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
              <Sans color="black100" size="3">
                Pay with credit card
              </Sans>
              <Spacer mb={1} />
              <Sans color="black50" size="1">
                Enter payment details to complete checkout
              </Sans>
              <Spacer mb={3} />
              <Sans color="black100" size="1">
                {plan?.name}
              </Sans>
              <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                <Sans color="black50" size="1">
                  {description}
                </Sans>
                <Sans color="black100" size="1">
                  ${plan?.price / 100}
                </Sans>
              </Flex>
              <Spacer mb={4} />
              <Sans color="black100" size="1">
                Payment information
              </Sans>
              <Spacer mb={2} />
              <Flex flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
                <Sans color="black50" size="0.5">
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
              <Sans color="black100" size="1">
                Billing address
              </Sans>
              <Spacer mb={2} />
              <TextInput
                autoFocus={false}
                autoCapitalize="words"
                currentValue={name}
                headerText="Name"
                onChangeText={(_, val) => setName(val)}
              />
              <Spacer mb={3} />
              <TextInput
                autoFocus={false}
                autoCapitalize="words"
                currentValue={address1}
                headerText="Address 1"
                onChangeText={(_, val) => setAddress1(val)}
              />
              <Spacer mb={3} />
              <Flex flexDirection="row">
                <TextInput
                  autoFocus={false}
                  autoCapitalize="words"
                  currentValue={address2}
                  headerText="Address 2"
                  onChangeText={(_, val) => setAddress2(val)}
                  style={{ flex: 1 }}
                />
                <Spacer width={9} />
                <TextInput
                  autoFocus={false}
                  autoCapitalize="words"
                  currentValue={city}
                  headerText="City"
                  onChangeText={(_, val) => setCity(val)}
                  style={{ flex: 1 }}
                />
              </Flex>
              <Spacer mb={3} />
              <Flex flexDirection="row">
                <FakeTextInput
                  currentValue={state}
                  headerText="State"
                  onPress={() => {
                    setIsStatePickerVisible(true)
                  }}
                  style={{ flex: 1 }}
                />
                <Spacer width={9} />
                <TextInput
                  autoFocus={false}
                  currentValue={zipCode}
                  headerText="ZIP"
                  keyboardType="number-pad"
                  onChangeText={(_, val) => setZipCode(val)}
                  style={{ flex: 1 }}
                />
              </Flex>
            </Box>
            <Spacer pb={160} />
          </ScrollView>
        </Box>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={insets.bottom - 16}>
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
        </KeyboardAvoidingView>

        <StatePickerPopUp
          initialState={state}
          onRequestClose={(state) => {
            setState(state)
            setIsStatePickerVisible(false)
          }}
          visible={isStatePickerVisible}
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
