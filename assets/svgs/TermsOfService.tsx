import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"

export const TermsOfService = (props) => {
  return (
    <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h20v36H0z" />
        <G transform="translate(0 5)">
          <Rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={24} rx={4} />
          <Rect fill="#000" x={5} y={8} width={10} height={2} rx={1} />
          <Rect fill="#000" x={5} y={12} width={10} height={2} rx={1} />
          <Rect fill="#000" x={5} y={16} width={10} height={2} rx={1} />
        </G>
      </G>
    </Svg>
  )
}
