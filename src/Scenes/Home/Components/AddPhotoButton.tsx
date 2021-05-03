import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"
import { Box, Button } from "App/Components"
import { Schema as NavSchema } from "App/Navigation"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import React, { useState } from "react"
import ImagePicker from "react-native-image-picker"
import { useAuthContext } from "App/Navigation/AuthContext"
import { animated, useSpring } from "react-spring"
import styled from "styled-components/native"

export interface AddPhotoButtonProps {
  visible: boolean
}

export const AddPhotoButton: React.FC<AddPhotoButtonProps> = ({ visible }) => {
  const [isMutating, setIsMutating] = useState(false)
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const {
    authState: { isSignedIn },
  } = useAuthContext()

  const animation = useSpring({
    opacity: visible ? 1 : 0,
    translateY: visible ? 0 : 10,
  })

  const selectedImage = async (uri: string, type?: string) => {
    navigation.navigate("FitPicConfirmation", { uri, imageType: type })
  }

  const onPress = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    if (!isSignedIn) {
      showPopUp({
        title: "Sign in or apply for membership",
        note: "You must be signed in and have a membership to submit a fit pic.",
        buttonText: "Sign in",
        onClose: () => {
          hidePopUp()
          navigation.navigate(NavSchema.StackNames.AccountStack)
        },
      })
      setIsMutating(false)
      return
    }

    ImagePicker.showImagePicker(
      {
        takePhotoButtonTitle: "Take Photo",
        chooseFromLibraryButtonTitle: "Choose from Library",
      },
      (response) => {
        if (response.uri) {
          setIsMutating(false)
          selectedImage(response.uri, response.type)
        } else if (response.error) {
          Sentry.captureException(response.error)
          showPopUp({
            title: "Oops!",
            note:
              "We could not access your camera or photo library. Please go to Settings and check " +
              "your permissions. If this issue persists, please contact us at membership@seasons.nyc.",
            buttonText: "Got it",
            onClose: hidePopUp,
          })
          setIsMutating(false)
        }
      }
    )
  }

  return (
    <FixedButtonContainer
      opacity={animation.opacity}
      style={{ transform: [{ translateY: animation.translateY }] }}
      pointerEvents={visible ? "auto" : "none"}
    >
      <Button
        color="white100"
        onPress={onPress}
        loading={isMutating}
        disabled={isMutating}
        size="small"
        variant="primaryWhite"
        width={120}
      >
        Add photo
      </Button>
    </FixedButtonContainer>
  )
}

const FixedButtonContainer = styled(animated(Box))`
  position: absolute;
  align-self: center;
  bottom: 16;
`
