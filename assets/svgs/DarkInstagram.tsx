import * as React from "react"
import Svg, { Circle, G, Path, Rect } from "react-native-svg"

/* SVGR has dropped some elements not supported by react-native-svg: title */

export const DarkInstagram = (props) => {
  return (
    <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none" fillRule="evenodd">
        <Rect stroke="#000" strokeWidth={1.5} x={0.75} y={0.75} width={22.5} height={22.5} rx={6} />
        <Circle stroke="#000" strokeWidth={1.5} cx={12} cy={12} r={4.25} />
        <Circle fill="#000" cx={18.5} cy={5.5} r={1.5} />
      </G>
    </Svg>
  )
}
