import React from "react"
import Svg, { G, Path } from "react-native-svg"

export const Arrow = (props) => {
  return (
    <Svg width={23} height={14} viewBox="0 0 23 14" {...props}>
      <G stroke="#FFF" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 7l-7-7M22 7l-7 7M1 7h20" />
      </G>
    </Svg>
  )
}
