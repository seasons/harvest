import React, { useState } from "react"
import { Box, Container, Flex, Spacer, FadeInImage, Sans } from "App/Components"
import { TouchableOpacity } from "react-native"
import { color } from "App/utils"
import { CloseXSVG, More } from "Assets/svgs"
import { useActionSheet } from "@expo/react-native-action-sheet"
import { Homepage_communityStyle as CommunityStyle } from "src/generated/Homepage"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"
import { useAuthContext } from "App/Navigation/AuthContext"

interface CommunityStyleDetailProps {
  navigation: any
  route: any
}

const REPORT_STYLE = gql`
  mutation ReportCommunityStyle($id: ID!) {
    reportStyle(id: $id)
  }
`

export const CommunityStyleDetail: React.FC<CommunityStyleDetailProps> = ({ navigation, route }) => {
  const {
    authState: { isSignedIn },
  } = useAuthContext()
  const actionSheet = useActionSheet()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const [reportStyle] = useMutation(REPORT_STYLE, {
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

  const item = route?.params?.item as CommunityStyle
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
              note: "You have to sign in or create an account before you report a Community Style.",
              buttonText: "Sign in",
              onClose: () => {
                hidePopUp()
                navigation.navigate("Account")
              },
            })
            return
          }

          setIsMutating(true)

          reportStyle({
            variables: {
              id: item.id,
            },
          })
        }
      }
    )
  }
  return (
    <Container insetsTop={false}>
      <Flex flexGrow={1} justifyContent="center">
        <Flex flexDirection="row" justifyContent="flex-end">
          <CloseButton onRequestClose={navigation?.goBack} />
          <Spacer mr={2} />
        </Flex>

        <Spacer mb={36} />

        <FadeInImage
          source={{
            uri: item.image.url,
          }}
          style={{ height: 484 }}
        />

        <Spacer mb={5} />

        <Box pl={2} pr={2}>
          <Sans size="0.5">{`${item.user.firstName} ${item.user.lastName}`}</Sans>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="0.5" color="black50">
              {item.location
                ? `${item.location.city}, ${item.location.state}`
                : `${new Date(item.createdAt).toLocaleString("en-US", { month: "long", day: "numeric" })}`}
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
      height="40"
      style={{
        alignItems: "center",
        borderColor: color("black10"),
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
      }}
      width="40"
    >
      <CloseXSVG variant={"light"} />
    </Box>
  </TouchableOpacity>
)
