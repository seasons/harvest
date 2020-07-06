import { Container, FixedBackArrow, Spacer } from "App/Components"
import React from "react"
import { useSafeArea } from "react-native-safe-area-context"

export const EditPhoneNumber: React.FC<{
  navigation: any
  route: any
}> = ({ navigation, route }) => {
  const layout = useSafeArea()

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Spacer mb={layout.top} />
    </Container>
  )
}
