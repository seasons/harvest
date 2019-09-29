import React from "react"
import Svg, { G, SvgProps, Path } from "react-native-svg"

export const HomeIcon = (props: SvgProps) => (
  <Svg width={16} height={20} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path opacity={0.05} d="M-4 22h24V-2H-4z" />
      <Path
        d="M14 18H2V7.46l6-5.143 6 5.143V18zm1.651-11.759l-7-6a.998.998 0 00-1.302 0l-7 6A.998.998 0 000 7v12a1 1 0 001 1h14a1 1 0 001-1V7a.998.998 0 00-.349-.759z"
        fill="#FFF"
      />
    </G>
  </Svg>
)
