import React from "react"
import { WebView } from "react-native-webview"
import { get } from "lodash"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { Flex, FixedBackArrow } from "App/Components"

export const WebviewComponent: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const uri = get(navigation, "state.params.uri")
  return (
    <Flex style={{ flex: 1 }}>
      <FixedBackArrow navigation={navigation} />
      <WebView source={{ uri }} />
    </Flex>
  )
}
