import React from "react"
import Svg, { G, Path, SvgProps, Rect } from "react-native-svg"

export const MembershipInfoIcon = (props: SvgProps) => (
  <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
    <G fill="none" fillRule="evenodd" opacity={0.3}>
      <Path fill="#FFF" d="M0 0h20v36H0z" />
      <G transform="translate(0 5)" stroke="#000" strokeWidth={2}>
        <Rect fill="#FFF" x={1} y={1} width={18} height={24} rx={5.6} />
        <Path d="M6.135 17.5h7.73" strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </G>
  </Svg>
)
