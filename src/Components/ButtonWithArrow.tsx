import { Flex } from "./Flex"
import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Sans } from "./"
import { Arrow } from "Assets/svgs"
import { color } from "App/utils"
import styled from "styled-components/native"

export const ButtonWithArrow = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Wrapper px={2} justifyContent="space-between" flexDirection="row" flexWrap="nowrap" alignItems="center">
        <Sans size="4" color="white100">
          {children}
        </Sans>
        <Arrow />
      </Wrapper>
    </TouchableOpacity>
  )
}

const Wrapper = styled(Flex)`
  width: 100%;
  background-color: ${color("black100")};
  border-radius: 8px;
  height: 48px;
`
