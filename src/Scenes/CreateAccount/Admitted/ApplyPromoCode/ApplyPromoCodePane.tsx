import * as Sentry from "@sentry/react-native"
import gql from "graphql-tag"
import { Box, Button, CloseButton, Container, Sans, Spacer, TextInput } from "App/Components"
import { TextInputRef } from "App/Components/TextInput"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema as TrackSchema, useTracking } from "App/utils/track"
import React, { useEffect, useRef, useState } from "react"
import { useMutation } from "@apollo/client"
import { Keyboard, KeyboardAvoidingView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const CHECK_COUPON = gql`
  mutation CheckCoupon($couponID: String!) {
    checkCoupon(couponID: $couponID) {
      id
      amount
      percentage
      type
    }
  }
`
interface ApplyPromoCodePaneProps {
  onApplyPromoCode: (amount, percentage, type, code) => void
}

export const ApplyPromoCodePane: React.FC<ApplyPromoCodePaneProps> = ({ onApplyPromoCode }) => {
  const tracking = useTracking()
  const insets = useSafeAreaInsets()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [promoCode, setPromoCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const textInputRef: React.MutableRefObject<TextInputRef> = useRef(null)
  const [checkCoupon] = useMutation(CHECK_COUPON, {
    onCompleted: (data) => {
      const { id, amount, percentage, type } = data?.checkCoupon
      setIsMutating(false)
      onApplyPromoCode(amount, percentage, type, id)
    },
    onError: (err) => {
      const popUpData = {
        title: "Sorry!",
        note: "We couldn't apply that promo code.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      showPopUp(popUpData)
      Sentry.captureException(err)
      console.log("Error ApplyPromoCodePane.tsx", err)
      setIsMutating(false)
    },
  })

  useEffect(() => textInputRef?.current?.focus(), [textInputRef])

  const onPromoCodeChange = (val: string) => {
    setPromoCode(val)
    setIsFormValid(val.length > 0)
  }

  const applyPromoCode = async () => {
    Keyboard.dismiss()
    if (isMutating) {
      return
    }
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ApplyPromoCodeTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    checkCoupon({
      variables: {
        couponID: promoCode,
      },
    })

    setIsMutating(true)
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <CloseButton variant="light" />
      <Box style={{ paddingTop: 85, paddingHorizontal: 16, flex: 1 }}>
        <Sans color="black100" size="7">
          Enter promo code
        </Sans>
        <Spacer mb={1} />
        <Sans color="black50" size="4">
          Funds will be sent back to the card on file
        </Sans>
        <Spacer mb={4} />
        <TextInput
          currentValue={promoCode}
          inputKey="code"
          onChangeText={(_, val) => onPromoCodeChange(val)}
          headerText="Promo code"
          ref={textInputRef}
          variant="light"
        />
        <Spacer mb={3} />
      </Box>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Math.max(insets.bottom - 8, 8)}>
        <Box style={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
          <Button block disabled={!isFormValid} loading={isMutating} onPress={applyPromoCode} variant="primaryBlack">
            Apply
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Container>
  )
}
