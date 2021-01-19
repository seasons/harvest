import { gql } from "apollo-boost"
import { ReactNativeFile } from "apollo-upload-client"
import { Button, Container, FixedBackArrow, Flex, Sans, Spacer, TextInput, Toggle } from "App/Components"
import { TextInputRef } from "App/Components/TextInput"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useRef, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Dimensions, Image, KeyboardAvoidingView, ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SUBMIT_FIT_PIC = gql`
  mutation SubmitFitPic($image: Upload!, $options: FitPicSubmissionOptionsInput) {
    submitFitPic(image: $image, options: $options)
  }
`
const GET_INSTAGRAM_HANDLE = gql`
  query GetInstagramHandle {
    me {
      customer {
        id
        detail {
          instagramHandle
        }
      }
    }
  }
`

export const FitPicConfirmation = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()
  const insets = useSafeAreaInsets()

  const { data, loading } = useQuery(GET_INSTAGRAM_HANDLE, { fetchPolicy: "no-cache" })

  const [instagramHandle, setInstagramHandle] = useState("")
  const [includeInstagramHandle, setIncludeInstagramHandle] = useState(true)
  const [isMutating, setIsMutating] = useState(false)
  const textInputRef: React.MutableRefObject<TextInputRef> = useRef(null)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [submitFitPic] = useMutation(SUBMIT_FIT_PIC, {
    onCompleted: () => {
      setIsMutating(false)
      showPopUp({
        title: "Thanks for your submission",
        note: "We’ll let you know if your photo gets chosen to be featured on our community board.",
        buttonText: "Done",
        onClose: () => {
          hidePopUp()
          navigation.goBack()
        },
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

  const uri = route?.params?.uri
  const type = route?.params?.imageType
  const hasPreloadedInstagramHandle = !!data?.me?.customer?.detail?.instagramHandle

  const buttonHorizontalPadding = space(2)
  const interButtonSpacing = space(1)
  const twoButtonWidth = (Dimensions.get("window").width - buttonHorizontalPadding * 2 - interButtonSpacing) / 2

  const onUsePhoto = async () => {
    if (isMutating) {
      return
    }

    setIsMutating(true)
    tracking.trackEvent({
      actionName: Schema.ActionNames.FitPicConfirmationUsePhotoButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    const file = new ReactNativeFile({ uri, type, name: "" })
    await submitFitPic({
      variables: {
        options: {
          // Either user already has and wants to include, or doesnt have and filled out text field
          includeInstagramHandle:
            (hasPreloadedInstagramHandle && includeInstagramHandle) ||
            (!hasPreloadedInstagramHandle && !!instagramHandle),
          instagramHandle: instagramHandle,
        },
        image: file,
      },
    })
  }

  return (
    <Container>
      <FixedBackArrow variant="whiteBackground" navigation={navigation} />
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior="position"
        enabled
      >
        <ScrollView>
          <Spacer mt={64} />
          <Sans px={2} size="7">
            Confirm photo
          </Sans>
          <Image style={{ width: "100%", height: 450 }} source={{ uri }} />
          <Flex px={2} pt={3}>
            {!loading && hasPreloadedInstagramHandle && (
              <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                <Sans size="4">Add an Instagram handle</Sans>
                <Toggle
                  onChange={(newValue) => setIncludeInstagramHandle(newValue)}
                  selected={includeInstagramHandle}
                />
              </Flex>
            )}
            {!loading && !hasPreloadedInstagramHandle && (
              <>
                <Sans size="4" pb={1}>
                  Add an Instagram handle
                </Sans>
                <TextInput
                  placeholder="@username"
                  currentValue={instagramHandle}
                  onChangeText={(_, val) => {
                    if (textInputRef.current.isFocused()) {
                      setInstagramHandle(`@${val.replace("@", "")}`)
                    }
                  }}
                  onFocus={() => {
                    if (instagramHandle === "") {
                      setInstagramHandle("@")
                    }
                  }}
                  onBlur={() => {
                    if (instagramHandle === "@") {
                      setInstagramHandle("")
                    }
                  }}
                  ref={textInputRef}
                ></TextInput>
                <Sans size="3" pt={2} style={{ opacity: 0.5 }}>
                  Help other members find you on IG. You can edit this handle later in your personal prefences.
                </Sans>
              </>
            )}
            <Spacer mb={80} />
          </Flex>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{ position: "absolute", width: "100%", bottom: space(1) + insets.bottom }}>
        <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
          <Flex flexDirection="row" justifyContent="space-between" px={buttonHorizontalPadding}>
            <Button
              width={twoButtonWidth}
              variant="primaryWhite"
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.FitPicConfirmationCancelButtonTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                navigation.goBack()
              }}
            >
              Cancel
            </Button>
            <Button
              width={twoButtonWidth}
              variant="secondaryBlack"
              loading={isMutating}
              disabled={isMutating}
              onPress={onUsePhoto}
            >
              Use photo
            </Button>
          </Flex>
        </FadeBottom2>
      </View>
    </Container>
  )
})
