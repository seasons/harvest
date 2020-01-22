import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { Box, Flex, ModalCloseButton, Sans, Spacer, Theme } from "../../Components"
import styled from "styled-components/native"
import { color } from "../../Utils"

export const ResetPasswordConfirmationComponent = (props: any) => {
  const insets = useSafeArea()

  return (
    <Theme>
      <Container px={2} pt={insets.top} >
        <ModalCloseButton navigation={props.navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
            <Box style={{ marginTop: 8 }} m={2}>
              <Sans size="3" color="white" weight="medium">
                Reset Password Link Sent
               </Sans>
              <Spacer mb={14} />
              <Sans size="2" color="rgba(255, 255, 255, 0.5)" weight="medium">
                Check your email for a link to reset your password.
               </Sans>
              <Spacer mb={4} />
            </Box>
          </Flex>
        </TouchableWithoutFeedback>
      </Container>
    </Theme>
  )
}

const Container = styled(Box)`
  background: black;
  flex: 1;
`

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = state => {
  return {}
}

export const ResetPasswordConfirmation = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordConfirmationComponent)