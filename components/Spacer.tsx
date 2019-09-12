import React from "react"
import { HeightProps, SpaceProps, WidthProps } from "styled-system"
import { Box } from "./Box"

export interface SpacerProps extends SpaceProps, WidthProps, HeightProps {}

/**
 * A component used to inject space where it's needed
 */
export const Spacer: React.SFC<SpacerProps & { id?: string }> = props => {
  return <Box {...props} />
}

Spacer.displayName = "Spacer"
