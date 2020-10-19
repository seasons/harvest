import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const AddSlot = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G fill="#000">
          <G transform="translate(1 22)">
            <Rect width={22} height={2} rx={1} />
            <Rect width={2} height={6} rx={1} />
            <Rect x={20} width={2} height={6} rx={1} />
          </G>
          <G opacity={0.5} transform="translate(3 15)">
            <Rect x={16} width={2} height={5} rx={1} />
            <Rect width={2} height={5} rx={1} />
            <Rect width={18} height={2} rx={1} />
          </G>
          <G opacity={0.2} transform="translate(5 8)">
            <Rect x={12} width={2} height={5} rx={1} />
            <Rect width={2} height={5} rx={1} />
            <Rect width={14} height={2} rx={1} />
          </G>
        </G>
      </G>
    </Svg>
  )
}
