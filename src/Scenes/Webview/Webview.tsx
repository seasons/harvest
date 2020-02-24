import { FixedBackArrow, Container } from "App/Components"
import { get } from "lodash"
import React from "react"
import { WebView } from "react-native-webview"

type WebviewVariant = "whiteBackground" | "blackBackground"

export const WebviewComponent: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const uri = get(route, "params.uri")
  const variant = get(route, "params.variant") as WebviewVariant
  return (
    <Container insetsTop insetsBottom={false} backgroundColor={variant === "whiteBackground" ? "white100" : "black100"}>
      <FixedBackArrow navigation={navigation} variant={variant ? variant : "blackBackground"} />
      <WebView source={{ uri }} />
    </Container>
  )
}
