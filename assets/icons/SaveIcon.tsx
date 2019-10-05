import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const SaveIcon = (props: SvgProps) => (
  <Svg width={28} height={28} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path fill="#000" opacity={0.006} d="M0 0h28v28H0z" />
      <Path d="M10 7a2 2 0 00-2 2v11.826l6-5.143 6 5.143V9a2 2 0 00-2-2h-8z" stroke="#FFF" strokeWidth={2} />
    </G>
  </Svg>
)
