import React from "react"
import { Linking } from "react-native"
import { FixedButton } from "./FixedButton"

export interface ContactUsButtonProps {
  subject: string
}

export const ContactUsButton: React.FC<ContactUsButtonProps> = ({ subject }) => {
  return (
    <FixedButton
      block
      variant="primaryWhite"
      onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject=${subject}`)}
    >
      Contact us
    </FixedButton>
  )
}
