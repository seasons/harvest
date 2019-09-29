import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"
import { View } from "react-native"

export const HalfLogoSVG = (props: SvgProps) => (
  <View style={{ aspectRatio: 86 / 232 }}>
    <Svg width="100%" height="100%" {...props} viewBox="0 0 86 232">
      <G fill="none" fillRule="evenodd">
        <Path d="M86 116C86 49.726 32.274-4-34-4s-120 53.726-120 120H86z" fill="#EEA30E" />
        <Path d="M86 116c0 66.274-53.726 120-120 120s-120-53.726-120-120H86z" fill="#2A4BEE" />
      </G>
    </Svg>
  </View>
)
