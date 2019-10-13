import React from "react"
import { Box, Spacer, Button } from "App/Components"
import { Theme } from "Components/Theme"
import { Sans } from "Components/Typography"
import { SafeAreaView } from "react-native"
import styled from "styled-components/native"
import { HalfLogoSVG, CurvedLineSVG } from "Assets/svgs"
import { color } from "App/Utils"
import { goToSignIn } from "App/Navigation"

const image = {
  id: 1,
  height: 300,
  width: 200,
  url: "https://i.pinimg.com/564x/ef/84/64/ef84647415e51db15a87993393aa8fe2.jpg",
}

const handleApply = () => {}

export const Welcome = () => {
  return (
    <Outer>
      <SafeAreaView style={{ flex: 1 }}>
        <Theme>
          <Wrapper>
            <Box style={{ flex: 1, position: "relative" }} mr={2}>
              <HalfLogoWrapper>
                <HalfLogoSVG />
              </HalfLogoWrapper>
              <CurvedLineWrapper pr={4}>
                <CurvedLineSVG />
              </CurvedLineWrapper>
              <ImageBackgroundShadowWrapper>
                <ImageBackgroundShadow width={image.width} height={image.height} />
              </ImageBackgroundShadowWrapper>
              <ImageContainerWrapper>
                <ImageContainer source={{ uri: image.url }}></ImageContainer>
              </ImageContainerWrapper>
            </Box>
            <Box m={2} mt={4}>
              <Sans color="white" size="3">
                Welcome
              </Sans>
              <Spacer mb={2} />
              <Sans size="2" color="gray">
                Sign in to access the most coveted menswear and streetwear brands.
              </Sans>
              <Spacer mb={2} />
              <Button onPress={() => goToSignIn()} variant="primaryLight">
                Sign in
              </Button>
              <Spacer mb={2} />
              <Button onPress={handleApply} variant="secondaryLight">
                Apply
              </Button>
            </Box>
          </Wrapper>
        </Theme>
      </SafeAreaView>
    </Outer>
  )
}

const ImageContainerWrapper = styled(Box)`
  right: 0;
  bottom: 0;
  width: 70%;
  height: 85%;
  padding-left: 30;
  position: absolute;
  z-index: 4;
`

const ImageContainer = styled.ImageBackground`
  background: ${color("lightGray")};
  width: 100%;
  height: 100%;
`

const ImageBackgroundShadowWrapper = styled.View`
  position: absolute;
  width: 70%;
  height: 85%;
  right: 20;
  bottom: 20;
  z-index: 0;
  padding-left: 30;
`

const ImageBackgroundShadow = styled.View`
  background-color: ${color("lightGray")};
  height: 100%;
  width: 100%;
`

const CurvedLineWrapper = styled(Box)`
  position: absolute;
  width: 100%;
  z-index: 1;
`

const HalfLogoWrapper = styled(Box)`
  position: absolute;
  top: 30;
  z-index: 3;
  padding-right: 20;
  width: 30%;
`

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`

const Outer = styled.View`
  flex: 1;
  background-color: black;
`
