import React from "react"
import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { CheckCircled } from "Assets/svgs/CheckCircled"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { color } from "App/utils/color"
import { Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const PaymentSuccess = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  return (
    <Flex style={{ flex: 1 }} flexDirection="row" justifyContent="center" alignItems="flex-start">
      <Box pb={insets.bottom} px={2} style={{ width: windowWidth }}>
        <Spacer mb={4} />
        <CheckCircled backgroundColor={color("green100")} />
        <Spacer mb={2} />
        <Separator />
        <Spacer mb={2} />
        <Sans size="4" style={{ width: windowWidth - 100 }}>
          Your card has been successfully updated.
        </Sans>
        <Spacer mb={4} />
        <Button
          block
          onPress={() => {
            navigation.goBack()
          }}
        >
          Close
        </Button>
      </Box>
    </Flex>
  )
}
