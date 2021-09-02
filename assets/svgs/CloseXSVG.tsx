import React from "react"
import Svg, { G, Rect } from "react-native-svg"
import { color } from "App/utils"
import { CloseButtonVariant } from "App/Components/CloseButton"

export const CloseXSVG: React.FC<{ variant: CloseButtonVariant }> = ({ variant }) => (
  <Svg width={12} height={12}>
    <G
      transform="rotate(45 9.414 4.586)"
      fill={variant && (variant === "light" || variant === "gray") ? color("white100") : color("black100")}
      fillRule="evenodd"
    >
      <Rect x={7} width={2} height={16} rx={1} />
      <Rect transform="rotate(90 8 8)" x={7} width={2} height={16} rx={1} />
    </G>
  </Svg>
)
