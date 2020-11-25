import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { PopUp } from "App/Components/PopUp"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { PAYMENT_UPDATE } from "App/Scenes/Account/PaymentAndShipping/EditPaymentAndShipping"
import { GET_PAYMENT_DATA } from "App/Scenes/Account/PaymentAndShipping/PaymentAndShipping"
import { color } from "App/utils/color"
import { CheckCircled } from "Assets/svgs/CheckCircled"
import { String } from "aws-sdk/clients/augmentedairuntime"
import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { useMutation } from "react-apollo"
import { Dimensions, FlatList } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components"
import stripe, { PaymentCardTextField } from "tipsi-stripe"

import * as Sentry from "@sentry/react-native"

import { PaymentMethods } from "./PaymentMethods"

interface BillingAddress {
  address1: string
  address2: string
  city: string
  state: string
  zipCode: String
}

interface Props {
  setOpenPopUp: (open: boolean) => void
  onApplePay: () => void
  onAddCreditCard: () => void
  openPopUp: boolean
  planID: string
  billingAddress: BillingAddress
}

export enum EditPaymentPopUpState {
  ChoosePaymentType = "ChoosePaymentType",
  EditCreditCard = "EditCreditCard",
  Confirmation = "Confirmation",
}

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width
const windowHeight = windowDimensions.height

export const EditPaymentPopUp: React.FC<Props> = ({
  onAddCreditCard,
  openPopUp,
  onApplePay,
  setOpenPopUp,
  billingAddress,
  planID,
}) => {
  const insets = useSafeAreaInsets()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [index, setIndex] = useState(0)
  const flatListRef = useRef(null)

  useEffect(() => flatListRef?.current?.scrollToIndex?.({ index }), [index, flatListRef])

  const [updateCreditCard] = useMutation(PAYMENT_UPDATE, {
    refetchQueries: [
      {
        query: GET_PAYMENT_DATA,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      setIndex(index + 1)
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

  const address1 = billingAddress?.address1
  const address2 = billingAddress?.address2
  const city = billingAddress?.city
  const state = billingAddress?.state
  const zipCode = billingAddress?.zipCode

  const handleOnSubmit = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)

    onAddCreditCard()

    if (!address1 || !city || !state || !zipCode) {
      showPopUp({
        title: "Your billing address is incomplete",
        note: "Please complete your billing address before updating your card number.",
        buttonText: "Close",
        onClose: hidePopUp,
      })
      setIsMutating(false)
      return
    }

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
      updateCreditCard({
        variables: {
          planID,
          token,
          tokenType: "card",
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

  const paneForState = (state: EditPaymentPopUpState) => {
    let pane

    switch (state) {
      case EditPaymentPopUpState.ChoosePaymentType:
        pane = (
          <Flex style={{ flex: 1 }} flexDirection="row" justifyContent="center" alignItems="flex-start">
            <PaymentMethods
              onApplePay={onApplePay}
              setOpenPopUp={setOpenPopUp}
              onCreditCard={() => setIndex(index + 1)}
            />
          </Flex>
        )
        break
      case EditPaymentPopUpState.EditCreditCard:
        pane = (
          <Box pb={insets.bottom} px={2} style={{ width: windowWidth, height: windowHeight }}>
            <Spacer mb={4} />
            <Sans size="1" style={{ textAlign: "center" }}>
              Update your card
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={3} />
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
            <Button block onPress={handleOnSubmit} loading={isMutating} disabled={isMutating}>
              Submit
            </Button>
            <Spacer mb={3} />
            <Sans
              size="1"
              style={{ textAlign: "center", textDecorationLine: "underline" }}
              onPress={() => {
                setOpenPopUp(false)
                setTimeout(() => {
                  setIndex(0)
                }, 200)
              }}
            >
              Cancel
            </Sans>
            <Spacer mb={4} />
          </Box>
        )
        break
      case EditPaymentPopUpState.Confirmation:
        pane = (
          <Flex style={{ flex: 1 }} flexDirection="row" justifyContent="center" alignItems="flex-start">
            <Box pb={insets.bottom} px={2} style={{ width: windowWidth }}>
              <Spacer mb={4} />
              <Flex flexDirection="row" alignItems="center" justifyContent="center">
                <CheckCircled backgroundColor={color("green100")} />
              </Flex>
              <Spacer mb={2} />
              <Separator />
              <Spacer mb={2} />
              <Sans size="1" style={{ width: windowWidth - 100 }}>
                Your card has been successfully updated.
              </Sans>
              <Spacer mb={4} />
              <Button
                block
                onPress={() => {
                  setOpenPopUp(false)
                  setTimeout(() => {
                    setIndex(0)
                  }, 200)
                }}
              >
                Close
              </Button>
            </Box>
          </Flex>
        )
        break
    }

    return pane
  }

  return (
    <PopUp show={openPopUp}>
      <FlatList
        data={["ChoosePaymentType", "EditCreditCard", "Confirmation"] as EditPaymentPopUpState[]}
        horizontal
        initialScrollIndex={index}
        keyExtractor={(item) => item.toString()}
        onScrollToIndexFailed={(info) => {
          // When first rendering this component, the layout may not yet be complete
          // depending on the initial index, so we have to wait for the layout to
          // finish and then retry.
          setTimeout(() => {
            flatListRef?.current?.scrollToIndex?.({ index: info.index })
          }, 100)
        }}
        ref={flatListRef}
        renderItem={({ item }) => paneForState(item)}
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
      />
    </PopUp>
  )
}

const PaymentField = styled(PaymentCardTextField)`
  color: ${color("black100")};
  font-size: 16px;
`
