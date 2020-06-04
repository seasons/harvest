import React from "react"
import { Box } from "App/Components"
import { color } from "App/utils"

export const Skeleton: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  return <Box style={{ backgroundColor: color("black04") }} width={width} height={height} />
}
