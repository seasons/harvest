import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { CloseXIcon } from "Assets/icons"
import { Box, Button, CloseButton, PopUp, FixedBackArrow, FixedButton, Flex, ModalCloseButton, Sans, Spacer, TextInput, Theme } from "../../Components"
import { isValidEmail } from "../../helpers/regex"
import styled from "styled-components/native"
import { color } from "../../Utils"

export const ResetPasswordConfirmationComponent = (props: any) => {
  const handleDoneButton = () => {
    props.navigation.dismiss()
  }

  const insets = useSafeArea()

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top, paddingBottom: insets.bottom, background: color("black") }}>
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