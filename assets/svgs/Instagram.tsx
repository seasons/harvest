import * as React from "react"
import Svg, { G, Path, Rect, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Instagram = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(0 6)">
          <Rect stroke="#000" strokeWidth={1.5} x={0.75} y={0.75} width={22.5} height={22.5} rx={6} />
          <Circle stroke="#000" strokeWidth={1.5} fill="#FFF" cx={12} cy={12} r={4.25} />
          <Circle fill="#000" cx={18.5} cy={5.5} r={1.5} />
        </G>
      </G>
    </Svg>
  )
}
