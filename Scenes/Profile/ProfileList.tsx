import React from "react"
import { Box } from "../../components"
import { ProfileListItem } from "./ProfileListItem"

const lists = []

export class ProfileList extends React.Component {
  render() {
    return (
      <Box style={{ margin: 20 }}>
        {lists.map(list => {
          return <ProfileListItem list={list} />
        })}
      </Box>
    )
  }
}
