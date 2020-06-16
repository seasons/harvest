import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { View } from "react-native"

interface Props extends SvgProps {
  rotate?: boolean
  scale?: number
}

export const DownChevronIcon = (props: Props) => {
  const rotationStyle = props.rotate ? { transform: [{ rotate: "180deg" }] } : {}
  const scale = props.scale || 1
  const color = props.color ? props.color : "#FFF"
  return (
    <View {...props}>
      <Svg width={9 * scale} height={6 * scale} viewBox="0 0 9 6" style={rotationStyle}>
        <Path
          d="M1 5l3.5-4L8 5"
          stroke={color}
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
