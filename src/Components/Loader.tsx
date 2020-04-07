import LottieView from "lottie-react-native"
import React from "react"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { Box } from "./Box"
import { themeProps } from "./Theme"

type LoaderVariant = "whiteBackground" | "blackOpaque85"

export const Loader: React.FC<{
  variant?: LoaderVariant
}> = ({ variant = "whiteBackground" }) => {
  const getColorAndOpacityForVariant = (variant: LoaderVariant) => {
    const {
      colors: { black100, white100 },
    } = themeProps

    switch (variant) {
      case "whiteBackground":
        return {
          backgroundColor: white100,
          opacity: 1.0,
        }
      case "blackOpaque85":
        return {
          backgroundColor: black100,
          opacity: 0.85,
        }
    }
  }

  const variantProps = getColorAndOpacityForVariant(variant)

  return (
    <Container backgroundColor={variantProps.backgroundColor} opacity={variantProps.opacity}>
      <LottieView
        source={require("../../assets/animations/logo-loader.json")}
        autoPlay
        loop
        style={{ width: 80, height: 80, alignSelf: "center" }}
      />
    </Container>
  )
}

const Container = styled(Box)`
  background-color: ${(p) => p.backgroundColor};
  width: ${Dimensions.get("window").width};
  height: ${Dimensions.get("window").height};
  opacity: ${(p) => p.opacity};
  z-index: 51;
  position: absolute;
  flex: 1;
  align-items: center;
  justify-content: center;
`
