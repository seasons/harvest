import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { CloseXIcon } from "Assets/icons"
import { Box, PopUp, FixedButton, Flex, Sans, Spacer, TextInput, Theme } from "../../Components"
import styled from "styled-components/native"
import { color } from "../../Utils"

export const ResetPasswordComponent = (props: any) => {
  const insets = useSafeArea()

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top, paddingBottom: insets.bottom, background: color("black") }}>
        <CloseButton onPress={() => props.navigation.dismiss()}>
          <Box p="14px">
            <CloseXIcon />
          </Box>
        </CloseButton>
      </Container>
    </Theme>
  )
}

const Container = styled(Box)`
  background: black;
  flex: 1;
`

const CloseButton = styled(TouchableOpacity)`
  background-color: rgba(255, 255, 255, 0.2);
  width: 40;
  height: 40;
  border-radius: 20;
  margin-left: auto;
  margin-right: 20;
  margin-top: 12;
`

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = state => {
  return {}
}

export const ResetPassword = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent)