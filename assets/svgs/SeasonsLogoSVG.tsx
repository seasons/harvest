import React from "react"
import Svg, { G, Path } from "react-native-svg"

export const SeasonsLogoSVG = props => (
  <Svg width={23} height={23} {...props} viewBox="0 0 40 40">
    <G fill="none" fillRule="evenodd">
      <Path d="M40 20C40 8.954 31.046 0 20 0S0 8.954 0 20h40z" fill="#EEA30E" />
      <Path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20h40z" fill="#2A4BEE" />
    </G>
  </Svg>
)
