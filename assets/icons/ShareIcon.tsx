import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"

export const ShareIcon = (props) => {
  const color = props.color || "#000"
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
      <G transform="translate(1 1)" fill="none" fillRule="evenodd">
        <Path d="M16 8L8 0 0 8m8-8v16" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <Rect fill={color} y={15.5} width={16} height={1.5} rx={0.75} />
      </G>
    </Svg>
  )
}
