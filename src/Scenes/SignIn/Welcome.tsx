import React from "react"
import { Box, Spacer, Button, Container } from "App/Components"
import { Sans } from "Components/Typography"
import styled from "styled-components/native"
import { SeasonsLogoSVG } from "Assets/svgs"
import { color } from "App/Utils"
import LottieView from "lottie-react-native"
import { Dimensions } from "react-native"

export const Welcome = ({ navigation }) => {
  const dimensions = Dimensions.get("window")
  return (
    <Container>
      <Wrapper>
        <LottieView
          source={require("../../../assets/animations/welcome.json")}
          autoPlay
          loop
          style={{ height: dimensions.height, width: dimensions.width, alignSelf: "center", position: "absolute" }}
        />
        <Box p={2}>
          <SeasonsLogoSVG width={40} height={40} />
          <Spacer mb={4} />
          <Sans color="white" size="3">
            This is Seasons
          </Sans>
          <Sans size="3" color="gray">
            A members only rental subscription service for menswear and streetwear.
          </Sans>
          <Spacer mb={4} />
          <Button onPress={() => navigation.navigate("SignIn")} variant="primaryLight">
            Sign in
          </Button>
          <Spacer mb={2} />
          <Button
            onPress={() => navigation.navigate("Webview", { uri: "http://signup.seasons.nyc/" })}
            variant="secondaryLight"
          >
            Join the waitlist
          </Button>
        </Box>
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${color("black")};
`
