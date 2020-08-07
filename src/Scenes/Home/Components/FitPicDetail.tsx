import React, { useState } from "react"
import { Box, Container, Flex, Spacer, Sans } from "App/Components"
import { TouchableOpacity, Dimensions } from "react-native"
import { color } from "App/utils"
import { CloseXSVG, More } from "Assets/svgs"
import { useActionSheet } from "@expo/react-native-action-sheet"
import { Homepage_fitPics as FitPic } from "src/generated/Homepage"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"
import { useAuthContext } from "App/Navigation/AuthContext"
import { SharedElement } from "react-navigation-shared-element"
import FastImage from "react-native-fast-image"
import { useSafeArea } from "react-native-safe-area-context"
import { DateTime } from "luxon"

interface FitPicDetailProps {
  navigation: any
  route: any
}

const REPORT_FIT_PIC = gql`
  mutation ReportFitPic($id: ID!) {
    reportFitPic(id: $id)
  }
`

const screenWidth = Dimensions.get("screen").width
const imageHeight = screenWidth * (5 / 4)
const spacing = 4 * 8
const closeButtonHeight = 40

export const FitPicDetail: React.FC<FitPicDetailProps> = ({ navigation, route }) => {
  const {
    authState: { isSignedIn },
  } = useAuthContext()
  const actionSheet = useActionSheet()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const topInset = useSafeArea().top + 2 * 8
  const [reportFitPic] = useMutation(REPORT_FIT_PIC, {
    onCompleted: () => {
      showPopUp({
        title: "Thanks for reporting",
        note: "We’ll review and take the appropriate action.",
        buttonText: "Done",
        onClose: hidePopUp,
      })
      setIsMutating(false)
    },
    onError: (err) => {
      console.log("[Error AddPhotoButton.tsx]", err)
      showPopUp({
        title: "Uh Oh. Something went wrong",
        note: "Please try again, and contact us at membership@seasons.nyc if this persists.",
        buttonText: "Close",
        onClose: hidePopUp,
      })
      setIsMutating(false)
    },
  })

  const item = route?.params?.item as FitPic
  if (!item) {
    return null
  }

  const showActionSheet = async () => {
    actionSheet.showActionSheetWithOptions(
      {
        options: ["Report Post", "Cancel"],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (index) => {
        if (index === 0) {
          if (isMutating) {
            return
          }

          if (!isSignedIn) {
            showPopUp({
              title: "One sec!",
              note: "You have to sign in or create an account before you report a fit pic.",
              buttonText: "Sign in",
              onClose: () => {
                hidePopUp()
                navigation.navigate("Account")
              },
            })
            return
          }

          setIsMutating(true)

          reportFitPic({
            variables: {
              id: item.id,
            },
          })
        }
      }
    )
  }

  // console.log("~~", JSON.stringify(DateTime.fromISO(item.createdAt).DATE_MED))
  // Position the shared image target absolutely so that the transitioner knows the final layout after the tab bar disappears.
  return (
    <Container insetsTop={false} insetsBottom={false}>
      <SharedImageTarget
        id={`fitpic.photo.${item.id}`}
        uri={item.image?.url}
        y={topInset + closeButtonHeight + spacing}
        height={imageHeight}
      />

      <Flex flexGrow={1}>
        <Flex flexDirection="row" justifyContent="flex-end" mt={topInset} mr={2}>
          <CloseButton onRequestClose={navigation?.goBack} />
        </Flex>

        <Spacer height={spacing + imageHeight + spacing} />

        <Box pl={2} pr={2}>
          <Sans size="0.5">{item.author}</Sans>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="0.5" color="black50">
              {item.location
                ? `${item.location.city}, ${item.location.state}`
                : ((date: DateTime) => `${date.monthLong} ${date.day}, ${date.year}`)(DateTime.fromISO(item.createdAt))}
            </Sans>
            <TouchableOpacity onPress={showActionSheet} hitSlop={{ top: 30, bottom: 30, left: 10, right: 10 }}>
              <More />
            </TouchableOpacity>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

const CloseButton: React.FC<{
  onRequestClose: () => void
}> = ({ onRequestClose }) => (
  <TouchableOpacity onPress={onRequestClose}>
    <Box
      backgroundColor={color("white100")}
      display="flex"
      height={closeButtonHeight}
      style={{
        alignItems: "center",
        borderColor: color("black10"),
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
      }}
      width={closeButtonHeight}
    >
      <CloseXSVG variant={"light"} />
    </Box>
  </TouchableOpacity>
)

// The target for the shared element transition
const SharedImageTarget = (props: { id: string; uri: string; y: number; height: number }) => (
  <SharedElement id={props.id}>
    <Box
      style={{
        position: "absolute",
        left: 0,
        top: props.y,
      }}
    >
      <FastImage
        source={{
          uri: props.uri,
        }}
        style={{ width: screenWidth, height: props.height }}
      />
    </Box>
  </SharedElement>
)
