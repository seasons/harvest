import { useNavigation } from "@react-navigation/native"
import { Box, Button, CloseButton, Container, Sans, Spacer, TextInput } from "App/Components"
import { TextInputRef } from "App/Components/TextInput"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import React, { useEffect, useRef, useState } from "react"
import { Keyboard, KeyboardAvoidingView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"

interface ApplyPromoCodeProps {
  onPromoCodeApplied?: () => void
}

export const ApplyPromoCode: React.FC<ApplyPromoCodeProps> = screenTrack()(({ onPromoCodeApplied }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  // Hooks
  const [promoCode, setPromoCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const insets = useSafeArea()

  const textInputRef: React.MutableRefObject<TextInputRef> = useRef(null)
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

    tracking.trackEvent({
      actionName: Schema.ActionNames.PromoCodeApplied,
      actionType: Schema.ActionTypes.Tap
    })

    // TODO: Hookup to backend once mutation is made
    setTimeout(() => {
      navigation.navigate("PromoCodeAppliedConfirmation")
    }, 2000)

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
