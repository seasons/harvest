import React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

interface SaveIconProps extends SvgProps {
  enabled: Boolean
}

export const SaveIcon = (props: SaveIconProps) => {
  const fillColor = props.enabled ? "#fff" : "#000"
  return (
    <Svg width={28} height={28} {...props}>
      <Path
        d="M10 7a2 2 0 00-2 2v11.826l6-5.143 6 5.143V9a2 2 0 00-2-2h-8z"
        stroke="#FFF"
        fill={fillColor}
        strokeWidth={2}
      />
    </Svg>
  )
}
