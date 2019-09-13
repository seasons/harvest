import React from "react"
import Svg, { G, Path, SvgProps, Rect } from "react-native-svg"

export const OrderHistoryIcon = (props: SvgProps) => (
  <Svg width={20} height={36} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path fill="#000" d="M0 0h20v36H0z" />
      <G transform="translate(0 5)" stroke="#000" strokeWidth={2}>
        <Rect fill="#000" x={1} y={1} width={18} height={24} rx={9} />
        <Path strokeLinecap="round" strokeLinejoin="round" d="M10 9v5h4" />
      </G>
    </G>
  </Svg>
)
