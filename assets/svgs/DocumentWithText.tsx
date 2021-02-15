import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const DocumentWithText = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(1 4)">
          <Rect stroke="#000" strokeWidth={1.5} width={22} height={28} rx={5} />
          <Rect fill="#000" x={4} y={13} width={14} height={1.5} rx={0.75} />
          <Rect fill="#000" x={4} y={17} width={14} height={1.5} rx={0.75} />
          <Rect fill="#000" x={4} y={9} width={7} height={1.5} rx={0.75} />
        </G>
      </G>
    </Svg>
  )
}
