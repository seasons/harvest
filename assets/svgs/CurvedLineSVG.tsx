import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { View } from "react-native"

export const CurvedLineSVG = (props: SvgProps) => (
  <View style={{ aspectRatio: 305 / 261 }}>
    <Svg width="100%" height="100%" {...props} viewBox="0 0 305 261">
      <Path
        d="M1.197 53C21.12 44.383 80.821-15.892 86.941 7c6.12 22.892-112.724 112.916-70.046 115.63C74.739 126.307 141.835-3.807 169.31 4.062 196.785 11.93 69.508 167.3 86.94 180.844 104.375 194.39 273.65-7.143 299.45 12.208c25.8 19.35-75.317 103.153-138.449 247.85"
        stroke="#FFF"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  </View>
)
