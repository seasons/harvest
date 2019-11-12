import React from "react"
import styled from "styled-components/native"
import { Box } from "./Box"
import { BackArrowIcon } from "../../assets/icons"
import { TouchableOpacity } from "react-native"
import { color } from "App/Utils"

export const FixedBackArrow = ({ navigation }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Arrow color={color("black")} />
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 50;
  left: 20;
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: white;
  border-radius: 100;
  height: 30;
  width: 30;
  z-index: 100;
`

const Arrow = styled(BackArrowIcon)`
  position: absolute;
  left: 6;
  top: 1;
`
