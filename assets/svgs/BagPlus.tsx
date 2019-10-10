import React from "react"
import Svg, { G, Circle, Rect, SvgProps } from "react-native-svg"

export const BagPlus = (props: SvgProps) => (
  <Svg width={66} height={66} {...props}>
    <G transform="translate(1 1)" fill="none" fillRule="evenodd">
      <Circle stroke="#EBEBEB" cx={32} cy={32} r={32} />
      <G transform="translate(20 20)" fill="#D2D2D2">
        <Rect x={11} width={2} height={24} rx={1} />
        <Rect transform="rotate(90 12 12)" x={11} width={2} height={24} rx={1} />
      </G>
    </G>
  </Svg>
)
