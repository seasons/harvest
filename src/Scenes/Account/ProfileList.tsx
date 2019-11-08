import React from "react"
import { Box, Flex, Sans } from "App/Components"
import {
  SavedPiecesIcon,
  MembershipInfoIcon,
  PersonalPreferencesIcon,
  PaymentShippingIcon,
  OrderHistoryIcon,
  ChevronIcon,
} from "Assets/icons"
import { TouchableWithoutFeedback } from "react-native"

const lists = [
  { title: "Membership info", icon: <MembershipInfoIcon />, link: "MembershipInfo" },
  { title: "Personal preferences", icon: <PersonalPreferencesIcon />, link: "PersonalPreferences" },
  { title: "Payments & Shipping", icon: <PaymentShippingIcon />, link: "PaymentAndShipping" },
  { title: "Saved pieces", icon: <SavedPiecesIcon />, link: "" },
  { title: "Order history", icon: <OrderHistoryIcon />, link: "" },
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
            <TouchableWithoutFeedback key={item.title} onPress={this.openURL.bind(this, item)}>
              <Box style={index !== lists.length - 1 ? { marginBottom: 50 } : null}>
                <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
                  <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
                    <Box style={{ marginRight: 20 }}>{item.icon}</Box>
                    <Sans size="2">{item.title}</Sans>
                  </Flex>
                  <ChevronIcon />
                </Flex>
              </Box>
            </TouchableWithoutFeedback>
          )
        })}
      </Box>
    )
  }
}
