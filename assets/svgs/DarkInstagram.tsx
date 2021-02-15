import * as React from "react"
import Svg, { Circle, G, Path, Rect } from "react-native-svg"

/* SVGR has dropped some elements not supported by react-native-svg: title */

export const DarkInstagram = (props) => {
  return (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={26} height={36} viewBox="0 0 26 36">
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h26v36H0z" />
        <Path fill="#FFF" d="M1 5h24v26H1z" />
        <G transform="translate(1 6)">
          <Rect width={24} height={24} fill="#D8D8D8" rx={6} />
          <Circle cx={12} cy={12} r={5} stroke="#FFF" strokeWidth={2} />
          <Circle cx={18.5} cy={5.5} r={1.5} fill="#FFF" />
        </G>
      </G>
    </Svg>
  )
}
