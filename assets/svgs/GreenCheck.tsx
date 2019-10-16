import React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

export const GreenCheck = props => (
  <Svg width={56} height={56} {...props}>
    <G fill="none" fillRule="evenodd">
      <Circle fill="#04B853" cx={28} cy={28} r={28} />
      <Path stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M18 28.263L24.85 34 38 21" />
    </G>
  </Svg>
)
