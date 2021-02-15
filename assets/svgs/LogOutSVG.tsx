import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const LogOutSVG = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <Rect stroke="#000" strokeWidth={1.5} x={1.75} y={4.75} width={20.5} height={26.5} rx={5} />
        <Path fill="#000" d="M13 17.5h10V19H13z" />
        <Path
          d="M9.357 17.652l5.113-3.196a1 1 0 011.53.848v6.392a1 1 0 01-1.53.848l-5.113-3.196a1 1 0 010-1.696z"
          fill="#000"
        />
      </G>
    </Svg>
  )
}
