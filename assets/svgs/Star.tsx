import * as React from "react"
import Svg, { G, Path, Rect, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Star = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <Rect fill="#E5E5E5" x={10.5} y={27} width={3} height={3} rx={1.5} />
        <Circle fill="#E5E5E5" cx={22.5} cy={21.5} r={1.5} />
        <Circle fill="#E5E5E5" cx={18.5} cy={9.5} r={1.5} />
        <Circle fill="#E5E5E5" cx={1.5} cy={21.5} r={1.5} />
        <Circle fill="#E5E5E5" cx={5.5} cy={9.5} r={1.5} />
        <Path
          d="M12 22.473l-5.134 3.81a.75.75 0 01-1.157-.841l2.037-6.06-5.21-3.705a.75.75 0 01.442-1.36l6.393.064 1.913-6.1a.75.75 0 011.432 0l1.913 6.1 6.393-.065a.75.75 0 01.442 1.361l-5.21 3.705 2.037 6.06a.75.75 0 01-1.157.841L12 22.473z"
          fill="#000"
          opacity={0.3}
        />
      </G>
    </Svg>
  )
}
