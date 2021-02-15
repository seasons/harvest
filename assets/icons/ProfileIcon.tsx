import React from "react"
import Svg, { Circle, G, Path } from "react-native-svg"

export const ProfileIcon = (props) => {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" {...props}>
      <G transform="translate(1 1)" stroke="#FFF" strokeWidth={2} fill="none" fillRule="evenodd">
        <Circle cx={8} cy={5} r={5} />
        <Path d="M0 18c1.71-5.333 4.378-8 8-8s6.29 2.667 8 8" strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </Svg>
  )
}
