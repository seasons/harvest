import * as React from "react"
import Svg, { Path } from "react-native-svg"

/* This is needed to pass down to a Button as an Icon where passing props is unsupported */
export const BlackListCheck = (props) => {
  return (
    <Svg width={14} height={10} viewBox="0 0 14 10" {...props}>
      <Path
        d="M1 5.216L5.062 9 13 1"
        stroke="#000"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
