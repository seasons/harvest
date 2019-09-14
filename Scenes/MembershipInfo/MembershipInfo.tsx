import React from "react"
import { Sans, Button, Box, Theme, Separator, Spacer } from "../../components"
import { SafeAreaView } from "react-native"

export class MembershipInfo extends React.Component {
  handlePauseMembership = () => {
    // FIXME: Handle pause membership
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Theme>
          <Box mt={6} p={2}>
            <Sans size="3" color="black">
              Membership info
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={6} />
            <Sans size="4" color="black">
              $155
            </Sans>
            <Sans size="2" color="gray">
              per month
            </Sans>
            <Spacer mb={6} />
            <Sans size="3">Whats included</Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={3} />
            <Sans size="2">4 pieces per month</Sans>
            <Spacer mb={3} />
            <Sans size="2">1 rotation every month</Sans>
            <Spacer mb={3} />
            <Sans size="2">Free returns & dry cleaning</Sans>
            <Spacer mb={3} />
            <Sans size="2">Personalized style recommendations</Sans>
            <Spacer mb={3} />
            <Sans size="2">Swap out your pieces early for $60</Sans>
            <Spacer mb={3} />
            <Separator />
            <Spacer mb={3} />
            <Button onPress={() => this.handlePauseMembership()} variant="secondaryDark" size="large">
              Pause membership
            </Button>
          </Box>
        </Theme>
      </SafeAreaView>
    )
  }
}
