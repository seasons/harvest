import React from "react"
import { Image, ImageProps, View } from "react-native"
import styled from "styled-components/native"
import FadeIn from "@expo/react-native-fade-in-image"

export const FadeInImage: React.FC<ImageProps> = props => {
  return (
    <Container>
      <FadeIn>
        <Image {...props} />
      </FadeIn>
    </Container>
  )
}

const Container = styled(View)`
  background-color: #f6f6f6;
`
