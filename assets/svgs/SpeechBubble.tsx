import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const SpeechBubble = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <Path
          d="M4 7.75a3.24 3.24 0 00-2.298.952A3.24 3.24 0 00.75 11h0v11c0 .897.364 1.71.952 2.298A3.24 3.24 0 004 25.25h14.345l2.706 3.157a1.246 1.246 0 001.762.136 1.25 1.25 0 00.437-.95h0V11a3.24 3.24 0 00-.952-2.298A3.24 3.24 0 0020 7.75h0z"
          stroke="#000"
          strokeWidth={1.5}
          fill="#FFF"
        />
        <Rect fill="#000" x={7} y={18} width={10} height={1.5} rx={0.75} />
        <Rect fill="#000" x={7} y={14} width={10} height={1.5} rx={0.75} />
      </G>
    </Svg>
  )
}
