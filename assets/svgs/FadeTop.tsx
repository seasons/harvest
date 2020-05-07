import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
import { View } from "react-native"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const FadeTop = () => {
  return (
    <View style={{ aspectRatio: 375 / 136 }}>
      <Svg width="100%" height="100%" viewBox="0 0 375 136">
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__a">
            <Stop offset="0%" />
            <Stop stopOpacity={0} offset="100%" />
          </LinearGradient>
        </Defs>
        <Path d="M0 0h375v136H0z" fill="url(#prefix__a)" fillRule="evenodd" opacity={0.6} />
      </Svg>
    </View>
  )
}
