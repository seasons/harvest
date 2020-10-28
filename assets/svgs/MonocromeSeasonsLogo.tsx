import * as React from "react"
import Svg, { Defs, Rect, G, Path, Mask, Use } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const MonocromSeasonsLogo = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <Defs>
        <Rect id="prefix__a" x={0} y={0} width={22} height={22} rx={11} />
      </Defs>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G transform="translate(1 7)">
          <Mask id="prefix__b" fill="#fff">
            <Use xlinkHref="#prefix__a" />
          </Mask>
          <Use stroke="#000" strokeWidth={1.5} fill="#FFF" xlinkHref="#prefix__a" />
          <Path fill="#000" mask="url(#prefix__b)" d="M0 11h22v11H0z" />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
