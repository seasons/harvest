import React from "react"
import styled from "styled-components/native"
import { color } from "App/Utils/color"

import { space, SpaceProps, width, WidthProps } from "styled-system"

export interface SeparatorProps extends SpaceProps, WidthProps {
  color?: string
}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.View<SeparatorProps>`
  border: 1px solid ${props => props.color || color("lightGray")};
  border-bottom-width: 0;
  ${space};
  ${width};
`

Separator.defaultProps = {
  width: "100%",
}
