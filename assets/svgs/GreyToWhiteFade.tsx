import * as React from "react"
import { View } from "react-native"
import Svg, { Defs, LinearGradient, Stop, Path, Rect } from "react-native-svg"

export const GreyToWhiteFade = (props) => {
  return (
    <View style={{ width: "100%", height: 88, position: "relative" }}>
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="97.096%" id="prefix__a">
            <Stop stopColor="#F6F6F6" offset="0%" />
            <Stop stopColor="#FFF" offset="100%" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#prefix__a)" />
      </Svg>
    </View>
  )
}
