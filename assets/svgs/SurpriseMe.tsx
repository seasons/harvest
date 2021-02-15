import * as React from "react"
import Svg, { G, Path, Rect, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const SurpriseMe = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(0 1)">
          <Rect fill="#7F7F7F" width={15} height={15} rx={2} />
          <Circle fill="#FFF" cx={11.5} cy={11.5} r={1.5} />
          <Circle fill="#FFF" cx={3.5} cy={11.5} r={1.5} />
          <Circle fill="#FFF" cx={11.5} cy={3.5} r={1.5} />
          <Circle fill="#FFF" cx={3.5} cy={3.5} r={1.5} />
        </G>
        <G transform="translate(8 20)">
          <Rect fill="#CCC" width={15} height={15} rx={2} />
          <Circle fill="#FFF" cx={4.5} cy={4.5} r={1.5} />
          <Circle fill="#FFF" cx={7.5} cy={7.5} r={1.5} />
          <Circle fill="#FFF" cx={10.5} cy={10.5} r={1.5} />
        </G>
      </G>
    </Svg>
  )
}
