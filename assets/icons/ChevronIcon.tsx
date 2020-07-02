import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const ChevronIcon = (props: SvgProps) => (
  <Svg width={11} height={18} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path fill="#FFF" d="M0 0h11v18H0z" />
      <Path
        stroke={props.color || "#C6C6C6"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 2l7 7-7 7"
      />
    </G>
  </Svg>
)
