import React from "react"
import Svg, { G, Path } from "react-native-svg"

export const TextCheckSVG = (props) => (
  <Svg width={16} height={16} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path fillOpacity={0.05} fill="#232323" opacity={0.05} d="M0 0h16v16H0z" />
      <Path
        stroke={props.color}
        strokeWidth={2}
        opacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 8.47L6.11 12 14 4"
      />
    </G>
  </Svg>
)
