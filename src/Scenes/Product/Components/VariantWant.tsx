import { Box, Button, Flex, Sans, Theme } from "App/Components"
import { color } from "App/Utils"
import React, { useState } from "react"
import { Dimensions, Image, ScrollView, Text, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { VariantList } from "./VariantList"
import { SmallGreenCheck, LeftTabCorner, RightTabCorner } from "Assets/svgs"

export const VariantWant = props => {
  const [shouldShowGreenCheck, setShouldShowGreenCheck] = useState(false)
  const [plainText, setPlainText] = useState("Want this item? ")
  const [underlinedText, setUnderlinedText] = useState("Let us know!")

  const { width } = Dimensions.get("window")

  const handleWantVariant = () => {
    setShouldShowGreenCheck(true)
    setPlainText(" Thanks! We'll let you know")
    setUnderlinedText("")
  }

  return (
    <>
      <Theme>
        <Container style={{ width }}>
          <LeftCorner />
          <RightCorner />
          <TextContainer>
            {shouldShowGreenCheck && <SmallGreenCheck />}
            <Text>
              <Sans size="2" color="white">
                {plainText}
              </Sans>
              <TouchableWithoutFeedback onPress={handleWantVariant}>
                <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("white")}>
                  {underlinedText}
                </Sans>
              </TouchableWithoutFeedback>
            </Text>
          </TextContainer>
        </Container>
      </Theme>
    </>
  )
}

const Container = styled(Flex)`
  position: absolute;
  background: black;
  bottom: 0;
  height: 52;
`

const TextContainer = styled(Flex)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20;
`

const LeftCorner = styled(LeftTabCorner)`
  position: absolute;
  bottom: 52;
  left: 0;
`

const RightCorner = styled(RightTabCorner)`
  position: absolute;
  bottom: 52;
  right: 0;
`
