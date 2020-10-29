import * as React from "react"
import Svg, { G, Path, Rect, Circle } from "react-native-svg"

export const PrivacyPolicy = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(0 3)" stroke="#000" strokeWidth={1.5}>
          <Rect fill="#FFF" x={7} width={10} height={16} rx={5} />
          <Rect fill="#FFF" x={0.75} y={6.75} width={22.5} height={22.5} rx={11.25} />
          <Circle cx={12} cy={18} r={4} />
        </G>
      </G>
    </Svg>
  )
}
