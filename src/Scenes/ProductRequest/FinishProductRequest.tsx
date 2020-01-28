import React from "react"
import { Dimensions } from "react-native"
import { Image } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Container, FixedButton, Sans, Spacer } from "App/Components"

export const FinishProductRequest = (props: any) => {
  const handleFinishBtnPressed = () => {
    props.navigation.dismiss()
  }

  const insets = useSafeArea()
  const dimensions = Dimensions.get("window")

  return (
    <Container>
      <>
        <Image
          style={{ width: dimensions.width, height: 517, bottom: 0, position: "absolute" }}
          resizeMode="contain"
          source={require("../../../assets/images/SubmitBackground.png")}
        />
        <Box p={2} mt={insets.top} style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
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
          <FixedButton variant={"primaryDark"} onPress={handleFinishBtnPressed}>
            Finish
          </FixedButton>
        </Box>
      </>
    </Container>
  )
}
