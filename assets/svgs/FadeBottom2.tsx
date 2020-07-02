import React from "react"
import { View } from "react-native"
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg"

// A more generalized FadeBottom without a fixed aspect ratio or dimensions.
export const FadeBottom2 = (props) => {
  return (
    <View {...props}>
      <View style={{ zIndex: 2 }}>{props.children}</View>
      <Svg style={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor="white" stopOpacity="0" />
            <Stop offset="0.3" stopColor="white" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  )
}
