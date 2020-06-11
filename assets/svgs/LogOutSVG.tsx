import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const LogOutSVG = (props) => {
  return (
    <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h20v36H0z" />
        <G transform="translate(0 5)">
          <Rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={4} />
          <G fill="#000">
            <Path d="M11 12v2H1v-2z" />
            <Path d="M15 13l-6 4V9z" />
          </G>
        </G>
      </G>
    </Svg>
  )
}
