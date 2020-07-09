import { Box, Sans, Flex } from "App/Components"
import { useTracking, Schema } from "App/utils/track"
import React from "react"
import { TouchableOpacity, Linking } from "react-native"
import { QuestionMark, PrivacyPolicy, TermsOfService, LogOutSVG } from "Assets/svgs"
import { ChevronIcon } from "Assets/icons"

interface BottomListProps {
  navigation
  role: string
  signOut: () => void
}

export const BottomList: React.FC<BottomListProps> = ({ navigation, role, signOut }) => {
  const tracking = useTracking()
  const bottomList = [
    {
      title: "Help and support",
      icon: <QuestionMark />,
      onPress: () => Linking.openURL(`mailto:membership@seasons.nyc?subject=Support`),
      tracking: Schema.ActionNames.SupportTapped,
    },
    {
      title: "Privacy policy",
      icon: <PrivacyPolicy />,
      tracking: Schema.ActionNames.PrivacyPolicyTapped,
      onPress: () => {
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" })
      },
    },
    {
      title: "Terms of Service",
      icon: <TermsOfService />,
      tracking: Schema.ActionNames.TermsOfServiceTapped,
      onPress: () => {
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })
      },
    },
    {
      title: "Sign out",
      icon: <LogOutSVG />,
      tracking: Schema.ActionNames.LogOutTapped,
      onPress: () => {
        signOut()
      },
    },
    {
      title: "Debug menu",
      icon: null,
      tracking: null,
      onPress: () => {
        navigation.navigate("Modal", {
          screen: "DebugMenu",
        })
      },
    },
  ]

  const handleOnPress = (item) => {
    if (item.tracking) {
      tracking.trackEvent({
        actionName: item.tracking,
        actionType: Schema.ActionTypes.Tap,
      })
    }
    item.onPress?.()
  }

  return (
    <Box px={2}>
      {bottomList.map((item, index) => {
        if (item.title === "Debug menu" && role !== "Admin") {
          return null
        }
        return (
          <TouchableOpacity key={item.title} onPress={() => handleOnPress(item)}>
            <Box style={index !== bottomList.length - 1 ? { marginBottom: 40 } : null}>
              <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
                <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
                  <Box style={{ marginRight: 20 }}>{item.icon}</Box>
                  <Sans size="2">{item.title}</Sans>
                </Flex>
                <ChevronIcon />
              </Flex>
            </Box>
          </TouchableOpacity>
        )
      })}
    </Box>
  )
}
