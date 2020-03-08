import * as React from "react"
import Svg, { G, Rect, Circle, Path, SvgProps } from "react-native-svg"

export const DefaultNeutralFace = (props: SvgProps) => (
  <Svg width={64} height={64} viewBox="0 0 64 64" {...props}>
    <G fill="none" fillRule="evenodd">
      <Rect fill="#F6F6F6" width={64} height={64} rx={32} />
      <Circle fill="#000" cx={24} cy={24} r={2} />
      <Circle fill="#000" cx={40} cy={24} r={2} />
      <Path
        d="M22 40h20"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
)
