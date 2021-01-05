import * as React from "react"
import Svg, { Circle, G, Rect } from "react-native-svg"

/* SVGR has dropped some elements not supported by react-native-svg: title */

export const DarkInstagram = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd">
        <Rect width={22.5} height={22.5} x={0.75} y={0.75} stroke="#FFF" strokeWidth={1.5} rx={6} />
        <Circle cx={12} cy={12} r={4.25} fill="#000" stroke="#FFF" strokeWidth={1.5} />
        <Circle cx={18.5} cy={5.5} r={1.5} fill="#FFF" />
      </G>
    </Svg>
  )
}
