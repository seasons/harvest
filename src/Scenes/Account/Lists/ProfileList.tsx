import React from "react"
import { Box, Flex, Sans } from "App/Components"
import { MembershipInfoIcon, PersonalPreferencesIcon, PaymentShippingIcon, ChevronIcon } from "Assets/icons"
import { TouchableOpacity } from "react-native"
import { QuestionMark } from "Assets/svgs"
import { useTracking, Schema } from "App/utils/track"

const lists = [
  {
    title: "Membership info",
    icon: <MembershipInfoIcon />,
    link: "MembershipInfo",
    tracking: Schema.ActionNames.MembershipInfoTapped,
  },
  {
    title: "Personal preferences",
    icon: <PersonalPreferencesIcon />,
    link: "PersonalPreferences",
    tracking: Schema.ActionNames.PersonalPreferencesTapped,
  },
  {
    title: "Payments & shipping",
    icon: <PaymentShippingIcon />,
    link: "PaymentAndShipping",
    tracking: Schema.ActionNames.PaymentAndShippingTapped,
  },
  { title: "FAQ", icon: <QuestionMark />, link: "Faq", tracking: Schema.ActionNames.FAQTapped },
]

interface ProfileListProps {
  navigation: any
}

export const ProfileList: React.FC<ProfileListProps> = ({ navigation }) => {
  const tracking = useTracking()

  const openURL = (item) => {
    if (item.link) {
      tracking.trackEvent({
        actionName: item.tracking,
        actionType: Schema.ActionTypes.Tap,
      })
      navigation.navigate(item.link)
    }
  }

  return (
    <Box>
      {lists.map((item, index) => {
        return (
          <TouchableOpacity key={item.title} onPress={() => openURL(item)}>
            <Box style={index !== lists.length - 1 ? { marginBottom: 40 } : null}>
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