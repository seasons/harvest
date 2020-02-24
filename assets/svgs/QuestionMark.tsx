import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

export const QuestionMark = props => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <G fill="none" fillRule="evenodd">
        <Rect stroke="#000" strokeWidth={2} fill="#FFF" x={1} y={1} width={18} height={18} rx={9} />
        <Rect fill="#000" x={9} y={13} width={2} height={2} rx={1} />
        <Path d="M10 12v-2a2 2 0 10-2-2h0" stroke="#000" strokeWidth={2} strokeLinejoin="round" />
      </G>
    </Svg>
  )
}
