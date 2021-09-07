import { color } from "App/utils"
import React from "react"
import { ImageProps, View } from "react-native"
import FadeIn from "react-native-fade-in-image"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"

interface FadeInImageProps extends ImageProps {
  radius?: number
}

export const FadeInImage: React.FC<FadeInImageProps> = (props) => {
  return (
    <Container radius={props.radius}>
      <FadeIn>
        <FastImage source={props.source} {...props} />
      </FadeIn>
    </Container>
  )
}

const Container = styled(View)<{ radius: number }>`
  background-color: ${color("black04")};
  overflow: hidden;
  border-radius: ${(p) => (p.radius ? p.radius : 0)};
`
