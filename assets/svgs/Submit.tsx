import React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Submit = (props) => {
  return (
    <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h20v36H0z" />
        <G transform="translate(0 5)">
          <Rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={4} />
          <Path fill="#000" d="M9 14h2v10H9z" />
          <Path fill="#000" d="M10 10l4 6H6z" />
        </G>
      </G>
    </Svg>
  )
}
