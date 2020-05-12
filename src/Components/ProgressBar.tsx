import React from "react"
import styled from "styled-components/native"
import { color } from "App/utils/color"
import { Box, BoxProps } from "./Box"

export interface ProgressBarProps extends BoxProps {
  height?: number
  percentCompleted: number
  width: number
}

/**
 * A progress bar used to indicate the progress or loading of something
 */
export const ProgressBar: React.SFC<ProgressBarProps> = ({ height = 3, percentCompleted, width }) => {
  return (
    <OuterBar style={{ height, width }}>
      <InnerBar style={{ height, width: width * percentCompleted }} />
    </OuterBar>
  )
}

const OuterBar = styled(Box)<ProgressBarProps>`
  background: ${color("black10")};
  border-radius: 100;
`

const InnerBar = styled(Box)`
  background: ${color("black100")};
  border-radius: 100;
`
