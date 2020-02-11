import React from "react"
import { Box, Spacer, Button, Container, Flex } from "App/Components"
import { Sans } from "Components/Typography"
import styled from "styled-components/native"
import { SeasonsLogoSVG } from "Assets/svgs"
import { Image, TouchableOpacity, Dimensions, Linking } from "react-native"
import { color, space } from "App/Utils"

const buttonWidth = (Dimensions.get("window").width - space(4)) / 2 - 1

export const Welcome = ({ navigation }) => {
  return (
    <Container>
      <Wrapper>
        <Box p={2}>
          <SeasonsLogoSVG width={40} height={40} />
          <Spacer mb={4} />
          <Sans color="white" size="3">
            This is Seasons
          </Sans>
          <Box pr={3}>
            <Sans size="3" color="gray">
              A members only rental subscription service for menswear and streetwear.
            </Sans>
            <Spacer mb={4} />
          </Box>
          <Button block onPress={() => navigation.navigate("SignIn")} variant="primaryWhite">
            Sign in
          </Button>
          <Spacer mb={2} />
          <Button
            block
            onPress={() => navigation.navigate("Webview", { uri: "http://signup.seasons.nyc/" })}
            variant="black85"
          >
            Join the waitlist
          </Button>
          <Spacer mb={4} />
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" alignItem="center">
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:membership@seasons.nyc`)}>
              <Flex style={{ width: buttonWidth }} flexDirection="row" justifyContent="center">
                <Sans size="2" color={color("black50")}>
                  Contact
                </Sans>
              </Flex>
            </TouchableOpacity>
            <Box style={{ height: 28, width: 2, backgroundColor: color("black50") }} />
            <TouchableOpacity onPress={() => navigation.navigate("Webview", { uri: "https://www.seasons.nyc" })}>
              <Flex style={{ width: buttonWidth }} flexDirection="row" justifyContent="center">
                <Sans size="2" color={color("black50")}>
                  Learn More
                </Sans>
              </Flex>
            </TouchableOpacity>
          </Flex>
        </Box>
        <Spacer mb={100} />
      </Wrapper>
      <ImageContainer source={require(`../../../assets/images/WelcomeViewBackground.png`)} />
    </Container>
  )
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`

const ImageContainer = styled(Image)`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
`
