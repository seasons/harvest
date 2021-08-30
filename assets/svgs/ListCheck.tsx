import { color } from "App/utils"
import * as React from "react"
import Svg, { Path } from "react-native-svg"


/* SVGR has dropped some elements not supported by react-native-svg: title */

export const ListCheck = (props) => {
  return (
    <Svg width={18} height={12} viewBox="0 0 14 10" {...props}

    >
      <Path
        d="M1 5.216L5.062 9 13 1"
        stroke={props.feature ? color("black100") : color("black50")}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
