import React from "react"
import { Box, Flex, Sans } from "App/Components"
import { MembershipInfoIcon, PersonalPreferencesIcon, PaymentShippingIcon, ChevronIcon } from "Assets/icons"
import { TouchableOpacity } from "react-native"
import { Shirt, QuestionMark } from "Assets/svgs"
import { space } from "App/Utils"

const lists = [
  { title: "Membership info", icon: <MembershipInfoIcon />, link: "MembershipInfo" },
  { title: "Personal preferences", icon: <PersonalPreferencesIcon />, link: "PersonalPreferences" },
  { title: "Payments & shipping", icon: <PaymentShippingIcon />, link: "PaymentAndShipping" },
  { title: "Submit an item", icon: <Shirt />, link: "ProductRequest" },
  { title: "FAQ", icon: <QuestionMark />, link: "Faq" },
]

export class ProfileList extends React.Component<any> {
  openURL = item => {
    if (item.link) {
      this.props.navigation.navigate(item.link)
    }
  }

  render() {
    return (
      <Box>
        {lists.map((item, index) => {
          return (
            <TouchableOpacity key={item.title} onPress={this.openURL.bind(this, item)}>
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
}
