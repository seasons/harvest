import React from "react"
import { Sans, Box, Theme, Spacer, Button } from "../../../components"
import { SafeAreaView } from "react-native"
import { DisplayView } from "./DisplayView"
import { EditView } from "./EditView"

interface State {
  renderEditView: boolean
}

export class PaymentAndShipping extends React.Component<State> {
  state = {
    renderEditView: false,
  }

  toggleView = () => {
    this.setState({
      renderEditView: !this.state.renderEditView,
    })
  }

  render() {
    const { renderEditView } = this.state

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Theme>
          <Box p={2} mt={6}>
            <Sans size="3">Payment & shipping</Sans>
            <Spacer mb={4} />
            {renderEditView ? <EditView /> : <DisplayView />}
            <Box mt={1}>
              <Button variant={renderEditView ? "primaryDark" : "secondaryDark"} onPress={() => this.toggleView()}>
                {renderEditView ? "Done" : "Edit"}
              </Button>
            </Box>
          </Box>
        </Theme>
      </SafeAreaView>
    )
  }
}
