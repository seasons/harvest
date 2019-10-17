import { Box, Flex, Sans, Separator, Spacer, Theme, Toggle } from "App/Components"
import { Container } from "Components/Container"
import { ProfileList } from "./ProfileList"
import React from "react"
import { ScrollView } from "react-native"

export class Account extends React.Component {
  render() {
    return (
      <Container>
        <ScrollView>
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
            <ProfileList {...this.props} />
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
        </ScrollView>
      </Container>
    )
  }
}
