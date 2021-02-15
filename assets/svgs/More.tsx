import React from "react"
import Svg, { Circle, G } from "react-native-svg"
import { color } from "App/utils"

export const More = (props: { color?: string }) => {
  const fillColor = props.color ?? color("black20")
  return (
    <Svg width={25} height={5} viewBox="0 0 25 5">
      <G fill="#000" fillRule="evenodd">
        <Circle cx={2.5} cy={2.5} r={2.5} fill={fillColor} />
        <Circle cx={12.5} cy={2.5} r={2.5} fill={fillColor} />
        <Circle cx={22.5} cy={2.5} r={2.5} fill={fillColor} />
      </G>
    </Svg>
  )
}
