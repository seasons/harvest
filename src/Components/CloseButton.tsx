import React from "react"
import styled from "styled-components/native"
import { Box } from "./Box"
import { CloseXSVG } from "../../assets/svgs"
import { TouchableOpacity } from "react-native"

export const CloseButton = ({ navigation }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Circle>
          <CloseXSVG />
        </Circle>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 60;
  right: 20;
  z-index: 100;
`

const Circle = styled(Box)`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
