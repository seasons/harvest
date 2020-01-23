import React from "react"
import { Image, ImageProps, View } from "react-native"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"

import FadeIn from "@expo/react-native-fade-in-image"

export const FadeInImage: React.FC<ImageProps> = props => {
  return (
    <Container>
      <FastImage source={props.source} {...props} />
    </Container>
  )
}

const Container = styled(View)`
  background-color: #f6f6f6;
`
