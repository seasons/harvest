import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
import { View } from "react-native"

export const FadeBottom3 = (props) => {
  return (
    <View {...props}>
      <View style={{ zIndex: 2 }}>{props.children}</View>
      <Svg style={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }}>
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="69.523%" id="prefix__a">
            <Stop stopColor="#FFF" stopOpacity={0} offset="0%" />
            <Stop stopColor="#FFF" stopOpacity={0.934} offset="72.913%" />
            <Stop stopColor="#FFF" offset="100%" />
          </LinearGradient>
        </Defs>
        <Path d="M0 644h375v72H0z" transform="translate(0 -644)" fill="url(#prefix__a)" fillRule="evenodd" />
      </Svg>
    </View>
  )
}
