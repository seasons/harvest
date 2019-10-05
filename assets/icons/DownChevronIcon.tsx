import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { View } from "react-native"

interface Props extends SvgProps {
  rotate?: boolean
}

export const DownChevronIcon = (props: Props) => {
  const style = props.rotate ? { transform: [{ rotate: "180deg" }] } : {}
  return (
    <View style={style}>
      <Svg width={9} height={6} {...props}>
        <Path
          d="M1 5l3.5-4L8 5"
          stroke="#FFF"
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  )
}
