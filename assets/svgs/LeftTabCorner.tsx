import React from "react"
import Svg, { Path } from "react-native-svg"

export const LeftTabCorner = props => {
  return (
    <Svg width={27} height={28} {...props}>
      <Path d="M0 0v28h27c-7.651-.356-14.064-3.31-19.238-8.86C2.587 13.59 0 7.21 0 0z" fill="#000" fillRule="evenodd" />
    </Svg>
  )
}
