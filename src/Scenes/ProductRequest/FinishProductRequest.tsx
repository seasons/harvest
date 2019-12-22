import { Box, Container, Flex, FixedButton, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { CloseXIcon } from "Assets/icons"
import { color } from "App/Utils"
import { get } from "lodash"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { useMutation } from "react-apollo"
import * as Animatable from "react-native-animatable"
import { Image, ImageBackground, ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import styled from "styled-components/native"

export const FinishProductRequestComponent = (props: any) => {
  const handleFinishBtnPressed = () => {
    props.navigation.dismiss()
  }

  const insets = useSafeArea();
  const dimensions = Dimensions.get('window');

  return (
    <Container>
      <>
        <Image
          style={{ width: dimensions.width, height: 517, bottom: 0, position: "absolute" }}
          resizeMode="contain"
          source={require("../../../assets/images/SubmitBackground.png")}
        />
        <Box p={2} mt={insets.top} style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Spacer mb={60} />
            <Sans size="3" color="black">
              We're on it!
            </Sans>
            <Spacer mb={14} />
            <Sans size="2" color="gray">
              Thanks for your submission. We’ll take a look and let you know if we carry it.
            </Sans>
          </Box>
          <FixedButton
            variant={"primaryDark"}
            onPress={handleFinishBtnPressed} >
            Finish
          </FixedButton>
        </Box>
      </>
    </Container >
  )
}


const mapStateToProps = state => {
  return {}
}

export const FinishProductRequest = connect(mapStateToProps)(FinishProductRequestComponent)
