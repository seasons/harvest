import React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
  color?: string
}

export const Check: React.FC<Props> = props => (
  <Svg width={14} height={10} viewBox="0 0 14 10" {...props}>
    <Path
      d="M1 5.47L5.11 9 13 1"
      stroke={props.color ? props.color : "#FFF"}
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
