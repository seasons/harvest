import React from "react"
import { Sans, Box, Theme, Spacer, Button, Flex } from "../../../components"
import { SafeAreaView } from "react-native"
import { DisplayView } from "./DisplayView"
import { EditView } from "./EditView"
import { space } from "../../../helpers"
import styled from "styled-components/native"

interface State {
  renderEditView: boolean
}

export class PaymentAndShipping extends React.Component<State> {
  state = {
    renderEditView: true,
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
          <Flex style={{ flex: 1 }}>
            {renderEditView ? <EditView /> : <DisplayView />}
            <FixedButtonWrapper px={2}>
              <Button variant={renderEditView ? "primaryDark" : "secondaryDark"} onPress={() => this.toggleView()}>
                {renderEditView ? "Done" : "Edit"}
              </Button>
            </FixedButtonWrapper>
          </Flex>
        </Theme>
      </SafeAreaView>
    )
  }
}

const FixedButtonWrapper = styled(Box)`
  position: absolute;
  bottom: ${space(1)};
`
