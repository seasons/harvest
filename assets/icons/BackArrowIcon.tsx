import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const BackArrowIcon = (props: SvgProps) => (
  <Svg width={18} height={28} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path fill="#000" opacity={0.5} d="M0 0h18v28H0z" />
      <Path stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 6l-8 8 8 8M1 14h15" />
    </G>
  </Svg>
)
