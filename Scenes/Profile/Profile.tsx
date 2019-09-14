import React from "react"
import { Sans, Flex, Box, Theme, Separator, Spacer, Toggle } from "../../components"
import { ProfileList } from "./ProfileList"
import { SafeAreaView } from "react-native"

export class Profile extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Theme>
          <Box p={2}>
            <Flex>
              <Box mb={5} />
              <Sans size="3" color="black">
                Kieran Gillen
              </Sans>
              <Sans size="2" color="gray">
                Brooklyn, NY
              </Sans>
            </Flex>
            <Spacer m={2} />
            <Separator />
            <Spacer m={2} />
            <ProfileList />
            <Spacer m={2} />
            <Separator />
            <Spacer m={2} />
            <Flex flexDirection="row" justifyContent="space-between">
              <Box>
                <Sans size="2">Order updates</Sans>
                <Sans size="2" color="gray">
                  Send me push notifications
                </Sans>
              </Box>
              <Toggle />
            </Flex>
            <Spacer m={2} />
            <Separator />
          </Box>
        </Theme>
      </SafeAreaView>
    )
  }
}
