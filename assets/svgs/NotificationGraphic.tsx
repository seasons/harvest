import React from "react"
import Svg, { G, Rect, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const NotificationGraphic = props => {
  return (
    <Svg width={343} height={343} viewBox="0 0 343 343" {...props}>
      <G fill="none" fillRule="evenodd">
        <Rect stroke="#979797" x={132.5} y={132.5} width={79} height={79} rx={16} />
        <Rect stroke="#979797" opacity={0.6} x={108.5} y={108.5} width={127} height={127} rx={24} />
        <Rect stroke="#979797" opacity={0.4} x={80.5} y={80.5} width={183} height={183} rx={44} />
        <Rect stroke="#979797" opacity={0.24} x={40.5} y={40.5} width={263} height={263} rx={80} />
        <Rect
          stroke="#979797"
          strokeWidth={1.3}
          opacity={0.079}
          x={0.65}
          y={0.65}
          width={341.7}
          height={341.7}
          rx={104}
        />
        <Rect fill="#000" x={152} y={152} width={40} height={40} rx={10} />
        <Circle fill="#F85156" cx={190} cy={154} r={7} />
      </G>
    </Svg>
  )
}
