import React from "react"
import Svg, { Circle, G, Path } from "react-native-svg"

export const CircledSaveIcon = props => (
  <Svg width={56} height={56} {...props}>
    <G fill="none" fillRule="evenodd">
      <Circle fill="#000" cx={28} cy={28} r={28} />
      <Path
        d="M24 18h8a4 4 0 014 4v13.882a1 1 0 01-1.635.773L28 31.419l-6.365 5.236A1 1 0 0120 35.882V22a4 4 0 014-4z"
        fill="#FFF"
      />
    </G>
  </Svg>
)
