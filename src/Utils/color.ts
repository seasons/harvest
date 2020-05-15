import { Color, themeProps } from "Components/Theme"

/**
 * A helper to easily access colors when not in a styled-components or
 * styled-systems context.
 */
export const color = (colorKey: Color | string) => {
  return themeProps.colors[colorKey] || colorKey
}
