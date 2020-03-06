import React from "react"
import { ImageProps, View } from "react-native"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"
import FadeIn from "@expo/react-native-fade-in-image"

interface FadeInImageProps extends ImageProps {
  radius?: boolean
}

export const FadeInImage: React.FC<FadeInImageProps> = props => {
  return (
    <Container radius={props.radius}>
      <FadeIn>
        <FastImage source={props.source} {...props} />
      </FadeIn>
    </Container>
  )
}

const Container = styled(View)`
  background-color: #f6f6f6;
  overflow: hidden;
  border-radius: ${p => (p.radius ? 15 : 0)};
`
