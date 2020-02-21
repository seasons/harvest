import React from "react"
import styled from "styled-components/native"
import { Box } from "./Box"
import { CloseXIcon } from "Assets/icons"
import { TouchableOpacity } from "react-native"

export const ModalCloseButton = ({ navigation }) => {
  return (
    <CloseButton onPress={() => navigation.goBack()}>
      <Box p="14px">
        <CloseXIcon />
      </Box>
    </CloseButton>
  )
}

const CloseButton = styled(TouchableOpacity)`
  background-color: rgba(255, 255, 255, 0.2);
  width: 40;
  height: 40;
  border-radius: 20;
  margin-left: auto;
  margin-right: 20;
  margin-top: 12;
`
