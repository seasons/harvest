import { Box, Button, Flex, Theme } from "App/Components"
import { DisplayView } from "./DisplayView"
import { EditView } from "./EditView"
import React from "react"
import { SafeAreaView } from "react-native"
import { space } from "App/Utils"
import styled from "styled-components/native"

interface Props {}

interface State {
  renderEditView: boolean
}

export class PaymentAndShipping extends React.Component<Props, State> {
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
          <Flex style={{ flex: 1 }}>
            {renderEditView ? <EditView {...this.props} /> : <DisplayView {...this.props} />}
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
