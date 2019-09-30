import { SpacingUnit, themeProps } from "../components/Theme"

/**
 * A helper to easily access space values when not in a styled-components or
 * styled-systems context.
 */
export const space = (spaceKey: SpacingUnit) => themeProps.space[spaceKey]
