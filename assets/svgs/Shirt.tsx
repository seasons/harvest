import React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const Shirt = props => {
  return (
    <Svg width={20} height={36} viewBox="0 0 20 36" {...props}>
      <G fill="#FFF" fillRule="evenodd">
        <Path d="M0 0h20v36H0z" />
        <Path
          d="M15 17.816V29a.997.997 0 01-1 1H6a.997.997 0 01-1-1V17.816H1V9.473a.997.997 0 01.914-.996l8.089 1.686 7.788-1.667a.997.997 0 011.165.685l.04 8.635H15z"
          stroke="#000"
          strokeWidth={2}
        />
      </G>
    </Svg>
  )
}
