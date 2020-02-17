import React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

export const SmallGreenCheck = props => (
  <Svg width="16pt" height="16pt" viewBox="0 0 16 16" {...props}>
    <Defs>
      <ClipPath id="prefix__a">
        <Path d="M8 16A8 8 0 108 0a8 8 0 000 16zm0 0" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#prefix__a)" clipRule="evenodd">
      <Path fill="#04b853" d="M0 0h16v16H0z" />
    </G>
    <Path
      d="M5 8.637L7.371 11 12 6"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#fff"
      strokeMiterlimit={10}
    />
  </Svg>
)
