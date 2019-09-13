import React from "react"
import { Sans, Flex, Box, Theme, Separator } from "../../components"
import { ProfileList } from "./ProfileList"

export class Profile extends React.Component {
  render() {
    return (
      <Theme>
        <Box style={{ margin: 20 }}>
          <Flex>
            <Box style={{ marginBottom: 40 }} />
            <Sans size="3" color="black">
              Kieran Gillen
            </Sans>
            <Sans size="2" color="gray">
              Brooklyn, NY
            </Sans>
          </Flex>
          <Box style={{ marginBottom: 20 }} />
          <Separator />
          <Box style={{ marginBottom: 20 }} />
          <ProfileList />
        </Box>
      </Theme>
    )
  }
}
