import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const BagIcon = (props: SvgProps) => (
  <Svg width={20} height={22} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M-2 24h24V0H-2z" />
      <Path
        d="M18 16.625C18 18.485 16.654 20 15 20H5c-1.654 0-3-1.514-3-3.375V6.5h4v2.25c0 .621.448 1.125 1 1.125s1-.504 1-1.125V6.5h4v2.25c0 .621.448 1.125 1 1.125s1-.504 1-1.125V6.5h4v10.125zM10 2c1.103 0 2 1.121 2 2.5H8C8 3.121 8.897 2 10 2zm9 2.4h-5C14 1.973 12.206 0 10 0S6 1.973 6 4.4H1c-.552 0-1 .493-1 1.1v11C0 19.533 2.243 22 5 22h10c2.757 0 5-2.467 5-5.5v-11c0-.607-.448-1.1-1-1.1z"
        fill="#FFF"
      />
    </G>
  </Svg>
)
