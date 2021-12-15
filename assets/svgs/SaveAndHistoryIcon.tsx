import * as React from "react"
import Svg, { Defs, Path, G } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const SaveAndHistoryIcon = (props) => (
  <Svg width={24} height={36} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Defs>
      <Path
        d="M7 6h10a5 5 0 0 1 5 5v16.172a2 2 0 0 1-3.414 1.414L12 22l-6.586 6.586A2 2 0 0 1 2 27.172V11a5 5 0 0 1 5-5Z"
        id="a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd" opacity={0.3}>
      <Path fill="#FFF" d="M0 0h24v36H0z" />
      <Path
        stroke="#000"
        strokeWidth={1.5}
        d="M17 6.75c1.174 0 2.236.476 3.005 1.245A4.237 4.237 0 0 1 21.25 11v16.172a1.246 1.246 0 0 1-1.25 1.25 1.25 1.25 0 0 1-.884-.367L12 20.94l-7.116 7.116a1.246 1.246 0 0 1-1.768 0 1.25 1.25 0 0 1-.366-.883V11c0-1.174.476-2.236 1.245-3.005A4.237 4.237 0 0 1 7 6.75Z"
      />
    </G>
  </Svg>
)
