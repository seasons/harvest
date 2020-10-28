import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Envelope = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <Rect stroke="#000" strokeWidth={1.5} x={0.75} y={8.75} width={22.5} height={18.5} rx={4} />
        <Path d="M22 10.004a16.013 16.013 0 01-20 0h20z" />
        <Path d="M22 10.004l-8.127 6.498a3 3 0 01-3.746 0L2 10.004h0" stroke="#000" strokeWidth={1.5} />
      </G>
    </Svg>
  )
}
