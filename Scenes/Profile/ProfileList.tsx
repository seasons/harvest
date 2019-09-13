import React from "react"
import { Box } from "../../components"
import { ProfileListItem } from "./ProfileListItem"
import {
  SavedPiecesIcon,
  MembershipInfoIcon,
  PersonalPreferencesIcon,
  PaymentShippingIcon,
  OrderHistoryIcon,
} from "../../icons"

const lists = [
  { title: "Membership info", icon: <MembershipInfoIcon />, link: "" },
  { title: "Personal preferences", icon: <PersonalPreferencesIcon />, link: "" },
  { title: "Payment & shipping", icon: <PaymentShippingIcon />, link: "" },
  { title: "Saved pieces", icon: <SavedPiecesIcon />, link: "" },
  { title: "Order history", icon: <OrderHistoryIcon />, link: "" },
]

export class ProfileList extends React.Component {
  render() {
    return (
      <Box>
        {lists.map(item => {
          return <ProfileListItem item={item} />
        })}
      </Box>
    )
  }
}
