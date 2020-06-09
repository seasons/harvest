import React from "react"
import { ImageProps, View } from "react-native"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"
import FadeIn from "@expo/react-native-fade-in-image"
import { color } from "App/utils"

interface FadeInImageProps extends ImageProps {
  radius?: boolean
}

export const FadeInImage: React.FC<FadeInImageProps> = (props) => {
  console.log("props.source", props.source)
  return (
    <Container radius={props.radius}>
      <FadeIn>
        <FastImage source={props.source} {...props} />
      </FadeIn>
    </Container>
  )
}

const Container = styled(View)`
  background-color: ${color("black04")};
  overflow: hidden;
  border-radius: ${(p) => (p.radius ? 15 : 0)};
`
