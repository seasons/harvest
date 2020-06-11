import * as React from "react"
import Svg, { G, Path, Ellipse, Rect, Circle } from "react-native-svg"

export const PrivacyPolicy = (props) => {
  return (
    <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <G fill="#FFF" fillRule="evenodd" opacity={0.3}>
        <Path d="M0 0h20v36H0z" />
        <G transform="translate(0 5)" stroke="#000" strokeWidth={2}>
          <Ellipse cx={10} cy={5.5} rx={5} ry={5.5} />
          <Rect x={1} y={7} width={18} height={18} rx={4} />
          <Circle cx={10} cy={16} r={3} />
        </G>
      </G>
    </Svg>
  )
}
