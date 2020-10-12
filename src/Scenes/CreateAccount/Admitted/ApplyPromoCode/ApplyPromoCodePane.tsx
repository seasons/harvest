import { gql } from "apollo-boost"
import { Box, Button, CloseButton, Container, Sans, Spacer, TextInput } from "App/Components"
import { TextInputRef } from "App/Components/TextInput"
import { get } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, KeyboardAvoidingView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

const CHECK_COUPON = gql`
  mutation CheckCoupon($couponID: String!) {
    checkCoupon(couponID: $couponID)
  }
`
interface ApplyPromoCodePaneProps {
  onApplyPromoCode: (number) => void
}

export const ApplyPromoCodePane: React.FC<ApplyPromoCodePaneProps> = (({ onApplyPromoCode }) => {
  // Hooks
  const [promoCode, setPromoCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const insets = useSafeArea()
  const textInputRef: React.MutableRefObject<TextInputRef> = useRef(null)
  const [checkCoupon] = useMutation(CHECK_COUPON, {
    onCompleted: (success) => {
      console.log(success)
      setIsMutating(false)
      if (get(success, 'checkCoupon')) {
        onApplyPromoCode(5000)
      }
    },
    onError: (err) => {
      console.log("Error ApplyPromoCode.tsx", err)
      setIsMutating(false)
    },
  })
  useEffect(() => {
    textInputRef?.current?.focus()
  }, [true])

  const onPromoCodeChange = (val: string) => {
    setPromoCode(val)
    setIsFormValid(val.length > 0)
  }

  const applyPromoCode = async () => {
    Keyboard.dismiss()
    if (isMutating) {
      return
    }
    // TODO: Hookup to backend once mutation is made
    checkCoupon({
      variables: {
        couponID: "test",
      },
    })

    setIsMutating(true)
  }

  // Render
  return (
    <Container insetsBottom={false} insetsTop={false}>
      <CloseButton variant="light" />
      <Box style={{ paddingTop: 85, paddingHorizontal: 16, flex: 1 }}>
        <Sans color="black100" size="3">
          Enter promo code
        </Sans>
        <Spacer mb={1} />
        <Sans color="black50" size="1">
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
})