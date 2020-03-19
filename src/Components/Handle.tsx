import React from "react"
import styled from "styled-components/native"
import { color } from "App/utils/color"
import { Box, BoxProps } from "./Box"

export interface HandleProps extends BoxProps {
  color?: string
}

/**
 * A handle displayed on top of modal screens to indicate to users that
 * they can drag it.
 */
export const Handle = styled(Box) <HandleProps>`
  width: 40px;
  height: 5px;
  border-radius: 100;
  background: ${props => color(props.color) || color("white")};
  margin: auto;
`
