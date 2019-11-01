import React from "react"
import Svg, { G, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const CloseXSVG = props => (
  <Svg width={12} height={12} {...props}>
    <G transform="rotate(45 9.414 4.586)" fill="#FFF" fillRule="evenodd">
      <Rect x={7} width={2} height={16} rx={1} />
      <Rect transform="rotate(90 8 8)" x={7} width={2} height={16} rx={1} />
    </G>
  </Svg>
)
