import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const BrowseIcon = (props: SvgProps) => (
  <Svg width={20} height={20} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M-2 22h24V-2H-2z" />
      <Path
        d="M9 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7m10.707 2.293l-3.682-3.682A8.948 8.948 0 0018 9c0-4.962-4.038-9-9-9S0 4.038 0 9s4.038 9 9 9a8.948 8.948 0 005.611-1.975l3.682 3.682a.997.997 0 001.414 0 .999.999 0 000-1.414"
        fill="#FFF"
      />
    </G>
  </Svg>
)
