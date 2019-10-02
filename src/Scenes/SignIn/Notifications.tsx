import React from "react"
import { Theme, Sans, Box, Spacer, Button } from "App/Components"
import { SafeAreaView } from "react-native"
import styled from "styled-components/native"
import { goToSignIn } from "App/Navigation"

export class Notifications extends React.Component {
  handleAllow = () => {
    //FIXME: Handle handleAllow
  }

  render() {
    return (
      <Outer>
        <SafeAreaView style={{ flex: 1 }}>
          <Theme>
            <Wrapper>
              <Box style={{ flex: 1 }}>
                <Box style={{ padding: 50, width: "100%", height: "100%" }}>
                  <Placeholder />
                </Box>
              </Box>
              <Box m={2} mt={4}>
                <Sans color="white" size="3">
                  Allow notifications
                </Sans>
                <Spacer mb={2} />
                <Sans size="2" color="gray">
                  Get notified about your order status, new products, and restocks.
                </Sans>
                <Spacer mb={2} />
                <Button onPress={() => this.handleAllow()} variant="primaryLight">
                  Allow
                </Button>
                <Spacer mb={2} />
                <Button onPress={() => goToSignIn()} variant="secondaryLight">
                  Maybe later
                </Button>
              </Box>
            </Wrapper>
          </Theme>
        </SafeAreaView>
      </Outer>
    )
  }
}

const Placeholder = styled.View`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 50;
`

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`

const Outer = styled.View`
  flex: 1;
  background-color: black;
`
