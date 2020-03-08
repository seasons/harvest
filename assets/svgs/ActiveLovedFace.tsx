import * as React from "react"
import Svg, { G, Rect, Circle, Path, SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const ActiveLovedFace = (props: SvgProps) => (
  <Svg width={64} height={64} viewBox="0 0 64 64" {...props}>
    <G fill="none" fillRule="evenodd">
      <Rect fill="#C7F1DC" width={64} height={64} rx={32} />
      <Circle fill="#000" cx={24} cy={24} r={2} />
      <Circle fill="#000" cx={40} cy={24} r={2} />
      <Path
        d="M22 37c2.222 4 5.556 6 10 6s7.778-2 10-6"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
)
