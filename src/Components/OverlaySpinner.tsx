import styled from "styled-components/native"
import React from "react"
import { Spinner } from "App/Components/Spinner"
import { Box, Flex } from "App/Components"

export const OverlaySpinner = () => {
  return (
    <Overlay>
      <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    </Overlay>
  )
}

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 200;
`
