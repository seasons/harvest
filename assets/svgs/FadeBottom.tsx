import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
import { View } from "react-native"

export const FadeBottom = (props) => {
  return (
    <View style={{ aspectRatio: 375 / 160 }}>
      <Svg width="100%" height="100%" viewBox="0 0 375 160" {...props}>
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__a">
            <Stop offset="0%" />
            <Stop stopOpacity={0} offset="100%" />
          </LinearGradient>
        </Defs>
        <Path
          transform="matrix(1 0 0 -1 0 375)"
          d="M0 215h375v160H0z"
          fill="url(#prefix__a)"
          fillRule="evenodd"
          opacity={0.65}
        />
      </Svg>
    </View>
  )
}
