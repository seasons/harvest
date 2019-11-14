import { Box, FixedBackArrow } from "App/Components"
import { get } from "lodash"
import React from "react"
import { useSafeArea } from "react-native-safe-area-context"
import { WebView } from "react-native-webview"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import styled from "styled-components/native"

export const WebviewComponent: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const insets = useSafeArea()
  const uri = get(navigation, "state.params.uri")
  return (
    <Container style={{ flex: 1, marginTop: insets.top }}>
      <FixedBackArrow navigation={navigation} />
      <WebView source={{ uri }} />
    </Container>
  )
}

const Container = styled(Box)`
  background: black;
`
