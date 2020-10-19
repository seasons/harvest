import React from "react"
import Svg, { Circle, G, Rect, SvgProps } from "react-native-svg"
import { color } from "App/utils"

export const BagPlus = (props: SvgProps) => (
  <Svg width={56} height={56} {...props} viewBox="0 0 66 66">
    <G transform="translate(1 1)" fill="none" fillRule="evenodd">
      <Circle stroke={color("black04")} fill={color("black04")} cx={32} cy={32} r={32} />
      <G transform="translate(20 20)" fill="#000000">
        <Rect x={11} width={2} height={24} rx={1} />
        <Rect transform="rotate(90 12 12)" x={11} width={2} height={24} rx={1} />
      </G>
    </G>
  </Svg>
)
