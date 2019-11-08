import React from "react"
import LottieView from "lottie-react-native"
import styled from "styled-components/native"
import { Box } from "./Box"

export const Loader = () => {
  return (
    <Container>
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
  flex: 1;
  align-items: center;
  justify-content: center;
`
