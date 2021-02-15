import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"

export const InviteSVG = (props) => {
  return (
    <Svg width={24} height={36} viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none" fillRule="evenodd" opacity={0.3}>
        <Path fill="#FFF" d="M0 0h24v36H0z" />
        <G fill="#FFF" stroke="#000" strokeWidth={1.5} transform="translate(1 5)">
          <Rect x={0.75} y={0.75} width={20.5} height={13.5} rx={2} />
          <Path d="M18.55.843l-7.802 7.16-7.729-6.457L18.55.843z" />
        </G>
        <G fill="#000">
          <Path d="M11.5 23H13v9h-1.5zM17.5 23H19v5h-1.5zM5.5 23H7v5H5.5z" />
        </G>
      </G>
    </Svg>
  )
}
