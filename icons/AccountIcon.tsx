import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

export const AccountIcon = (props: SvgProps) => (
  <Svg width={22} height={22} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M-1 23h24V-1H-1z" />
      <G fill="#000">
        <Path d="M11 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C4.935 0 0 4.935 0 11s4.935 11 11 11 11-4.935 11-11S17.065 0 11 0" />
        <Path d="M8 9a1 1 0 100-2 1 1 0 000 2M14 7a1 1 0 100 2 1 1 0 000-2M13.293 13.05a3.247 3.247 0 01-4.586 0 .999.999 0 10-1.414 1.414A5.227 5.227 0 0011 15.997a5.227 5.227 0 003.707-1.533.999.999 0 10-1.414-1.414" />
      </G>
    </G>
  </Svg>
)
