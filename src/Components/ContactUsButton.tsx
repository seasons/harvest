import React from "react"
import { Linking } from "react-native"
import { FixedButton } from "./FixedButton"

export const ContactUsButton: React.FC<{}> = () => {
  return (
    <FixedButton
      block
      variant="primaryWhite"
      onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject=Feedback`)}
    >
      Contact us
    </FixedButton>
  )
}
