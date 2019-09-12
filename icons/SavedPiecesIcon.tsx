import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={36} {...props}>
    <G fill="#FFF" fillRule="evenodd">
      <Path d="M0 0h20v36H0z" />
      <Path
        d="M4 5a3 3 0 00-3 3v19.657a1 1 0 001.65.76L10 22.128l7.35 6.289a1 1 0 001.65-.76V8a3 3 0 00-3-3H4z"
        stroke="#000"
        strokeWidth={2}
      />
    </G>
  </Svg>
)
