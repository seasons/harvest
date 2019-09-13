// @ts-ignore
import React from "react"
import styled from "styled-components/native"
import { color } from "../helpers/color"

import { space, SpaceProps, width, WidthProps } from "styled-system"

export interface SeparatorProps extends SpaceProps, WidthProps {}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.View<SeparatorProps>`
  border: 1px solid ${color("lightGray")};
  border-bottom-width: 0;
  ${space};
  ${width};
`

Separator.defaultProps = {
  width: "100%",
}
