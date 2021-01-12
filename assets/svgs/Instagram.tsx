import * as React from "react"
import Svg, { Circle, G, Path, Rect, SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export interface InstagramIconProps extends SvgProps {
  opacity?: number
}
export const Instagram = (props: InstagramIconProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd" opacity={props.opacity ?? 1}>
        <Path fill="#FFF" d="M0 0h24v26H0z" />
        <G>
          <Rect width={22.5} height={22.5} x={0.75} y={0.75} stroke="#000" strokeWidth={1.5} rx={6} />
          <Circle cx={12} cy={12} r={4.25} fill="#FFF" stroke="#000" strokeWidth={1.5} />
          <Circle cx={18.5} cy={5.5} r={1.5} fill="#000" />
        </G>
      </G>
    </Svg>
  )
}
