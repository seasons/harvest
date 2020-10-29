import * as React from "react"
import Svg, { Defs, Rect, G, Path, Mask, Use, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const PersonalPreferences = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <Defs>
        <Rect id="prefix__a" x={0} y={0} width={22} height={26} rx={5} />
        <Rect id="prefix__c" x={0} y={0} width={22} height={26} rx={5} />
      </Defs>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(1 5)">
          <Mask id="prefix__b" fill="#fff">
            <Use xlinkHref="#prefix__a" />
          </Mask>
          <Rect stroke="#000" x={0.5} y={0.5} width={21} height={25} rx={5} />
          <Path
            d="M1.983 29c2.029-8 5.071-12 9.128-12h10.377c1.34 5.403.733 8.89-1.82 10.46-2.553 1.571-8.448 2.084-17.685 1.54z"
            stroke="#000"
            strokeWidth={1.5}
            fill="#FFF"
            strokeLinecap="round"
            mask="url(#prefix__b)"
          />
          <Circle stroke="#000" strokeWidth={1.5} mask="url(#prefix__b)" cx={11} cy={10} r={3.25} />
          <Rect stroke="#000" strokeWidth={1.5} x={0.75} y={0.75} width={20.5} height={24.5} rx={5} />
        </G>
      </G>
    </Svg>
  )
}
