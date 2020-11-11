import { Box, Button } from "App/Components"
import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components/native"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import * as Sentry from "@sentry/react-native"
import ImagePicker from "react-native-image-picker"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"
import { useAuthContext } from "App/Navigation/AuthContext"
import { ReactNativeFile } from "apollo-upload-client"
import { useNavigation } from "@react-navigation/native"
import { Schema as NavSchema } from "App/Navigation"

const SUBMIT_FIT_PIC = gql`
  mutation SubmitFitPic($image: Upload!) {
    submitFitPic(image: $image)
  }
`

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
  const [submitFitPic] = useMutation(SUBMIT_FIT_PIC, {
    onCompleted: () => {
      setIsMutating(false)
      showPopUp({
        title: "Thanks for your submission",
        note: "We’ll let you know if your photo gets chosen to be featured on our community board.",
        buttonText: "Done",
        onClose: hidePopUp,
      })
    },
    onError: (err) => {
      console.log("[Error AddPhotoButton.tsx]", err)
      setIsMutating(false)
      showPopUp({
        title: "Uh Oh. Something went wrong",
        note:
          "It looks like we're having trouble processing your request. Please " +
          "try again, and contact us at membership@seasons.nyc if this persists.",
        buttonText: "Close",
        onClose: hidePopUp,
      })
    },
  })

  const animation = useSpring({
    opacity: visible ? 1 : 0,
    translateY: visible ? 0 : 10,
  })

  const selectedImage = async (uri: string, type?: string) => {
    if (isMutating) {
      return
    }

    setIsMutating(true)

    const file = new ReactNativeFile({ uri, type, name: "" })
    await submitFitPic({
      variables: {
        image: file,
      },
    })
  }

  const onPress = async () => {
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
      return
    }

    ImagePicker.showImagePicker(
      {
        takePhotoButtonTitle: "Take Photo",
        chooseFromLibraryButtonTitle: "Choose from Library",
      },
      (response) => {
        if (response.uri) {
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
