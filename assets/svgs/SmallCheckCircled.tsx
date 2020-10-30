import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const SmallCheckCircled = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <G fill="none" fillRule="evenodd">
      <Circle fill="#04B853" cx={12} cy={12} r={12} />
      <Path stroke="#FFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M6 12.216L10.062 16 18 8" />
    </G>
  </Svg>
)
