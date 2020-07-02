import { Box, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { useTracking, Schema } from "App/utils/track"
import React from "react"
import { TouchableOpacity, Linking } from "react-native"

interface BottomListProps {
  navigation
  role: string
  signOut: () => void
}

export const BottomList: React.FC<BottomListProps> = ({ navigation, role, signOut }) => {
  const tracking = useTracking()
  const bottomList = [
    {
      text: "Support",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.SupportTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        Linking.openURL(`mailto:membership@seasons.nyc?subject=Help`)
      },
    },
    {
      text: "Privacy policy",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.PrivacyPolicyTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" })
      },
    },
    {
      text: "Terms of Service",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.TermsOfServiceTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })
      },
    },
    {
      text: "Log out",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.LogOutTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        signOut()
      },
    },
    {
      text: "Debug menu",
      onPress: () => {
        navigation.navigate("Modal", {
          screen: "DebugMenu",
        })
      },
    },
  ]

  return (
    <Box px={2} pt={4}>
      {bottomList.map((listItem) => {
        if (listItem.text === "Debug menu" && role !== "Admin") {
          return null
        }
        return (
          <Box key={listItem.text}>
            <TouchableOpacity onPress={listItem.onPress}>
              <Sans size="2" color={listItem.text === "Log out" ? "red" : color("black100")}>
                {listItem.text}
              </Sans>
            </TouchableOpacity>
            <Spacer m={2} />
          </Box>
        )
      })}
    </Box>
  )
}
