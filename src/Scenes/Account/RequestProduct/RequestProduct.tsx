import { Box, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"

export const RequestProduct: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const insets = useSafeArea()

  return (
    <Container>
      <>
        <FixedBackArrow navigation={navigation} />
        <ScrollView>
          <Box p={2} mt={insets.top}>
            <Spacer mb={60} />
            <Sans size="3" color="black">
              Request Product
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={6} />
          </Box>
        </ScrollView>
      </>
    </Container>
  )
}
