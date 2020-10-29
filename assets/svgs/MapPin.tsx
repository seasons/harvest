import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use, Rect, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const MapPin = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" {...props}>
      <Defs>
        <Path id="prefix__a" d="M0 0h24v36H0z" />
      </Defs>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Mask id="prefix__b" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use fill="#FFF" xlinkHref="#prefix__a" />
        <G mask="url(#prefix__b)">
          <G transform="translate(7 13)">
            <Rect stroke="#000" strokeWidth={1.5} fill="#FFF" width={16} height={20} rx={3} />
            <Path fill="#000" d="M11 0h1.5v20H11z" />
          </G>
        </G>
        <G mask="url(#prefix__b)">
          <G transform="translate(0 3)">
            <G strokeWidth={1.5}>
              <Path
                stroke="#000"
                d="M7 .75c1.047 0 2.092.233 3.139.694a5.208 5.208 0 013.111 4.77c0 1.905-.452 3.783-1.318 5.48h0l-4.71 9.221-5.154-9.222A12.046 12.046 0 01.75 6.215a5.208 5.208 0 013.111-4.77C4.908.982 5.953.75 7 .75h0z"
                strokeLinejoin="square"
                fill="#FFF"
              />
              <Path
                stroke="#FFF"
                d="M7-.75c1.247 0 2.496.272 3.743.822a6.706 6.706 0 014.007 6.143c0 2.142-.508 4.253-1.482 6.16h0l-4.71 9.222a1.745 1.745 0 01-3.117 0h0L.732 12.376A13.546 13.546 0 01-.75 6.215 6.706 6.706 0 013.257.072C4.504-.478 5.753-.75 7-.75z"
              />
            </G>
            <Circle fill="#000" cx={7} cy={8} r={2} />
          </G>
        </G>
      </G>
    </Svg>
  )
}
