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
        <BackArrowIcon color={color("black")} />
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 20;
  left: 20;
  z-index: 100;
`
