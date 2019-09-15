import React from "react"
import { Box, Flex, Sans } from "../../components"
import {
  SavedPiecesIcon,
  MembershipInfoIcon,
  PersonalPreferencesIcon,
  PaymentShippingIcon,
  OrderHistoryIcon,
  ChevronIcon,
} from "../../icons"
import { TouchableWithoutFeedback } from "react-native"

const lists = [
  { title: "Membership info", icon: <MembershipInfoIcon />, link: "" },
  { title: "Personal preferences", icon: <PersonalPreferencesIcon />, link: "" },
  { title: "Payment & shipping", icon: <PaymentShippingIcon />, link: "" },
  { title: "Saved pieces", icon: <SavedPiecesIcon />, link: "" },
  { title: "Order history", icon: <OrderHistoryIcon />, link: "" },
]

export class ProfileList extends React.Component {
  openURL = () => {
    // FIXME: Add href to list item view
  }

  render() {
    return (
      <Box>
        {lists.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={item.title} onPress={this.openURL}>
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
