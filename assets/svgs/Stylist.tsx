import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Stylist = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(1 3)">
          <Path d="M7 0h7a8 8 0 018 8v6H7A7 7 0 017 0z" fill="#7F7F7F" />
          <Rect fill="#FFF" x={4} y={6} width={14} height={2} rx={1} />
        </G>
        <G transform="matrix(-1 0 0 1 23 19)">
          <Path d="M7 0h7a8 8 0 018 8v6H7A7 7 0 017 0z" fill="#D8D8D8" />
          <Rect fill="#FFF" x={4} y={6} width={14} height={2} rx={1} />
        </G>
      </G>
    </Svg>
  )
}
