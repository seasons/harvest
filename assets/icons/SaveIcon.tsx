import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

interface SaveIconProps extends SvgProps {
  enabled: Boolean
}

export const SaveIcon = (props: SaveIconProps) => {
  const fillColor = props.enabled ? "#000" : "#fff"
  return (
    <Svg width={16} height={21} viewBox="0 0 16 21" {...props}>
      <Path
        d="M15.25 19.746L8 13.75l-6.832 6.183L.75.75h14.5v18.996z"
        fill={fillColor}
        stroke="#000"
        strokeWidth={1.5}
        fillRule="evenodd"
      />
    </Svg>
  )
}
