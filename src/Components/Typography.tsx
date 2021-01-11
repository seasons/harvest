import { color as colorHelper } from "App/utils/color"
import React, { CSSProperties } from "react"
import styled from "styled-components/native"
import {
  color,
  ColorProps,
  display,
  DisplayProps as StyledSystemDisplayProps,
  fontSize,
  FontSizeProps,
  lineHeight,
  LineHeightProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  style,
  textAlign,
  TextAlignProps,
} from "styled-system"
import { Color, DisplaySize, SansSize, themeProps } from "./Theme"

/**
 * Type definition for font objects
 */
export interface FontDefinition {
  fontFamily: string
  fontWeight?: string | number
  fontStyle?: string
}

/**
 * Type definition for font value properties which can either
 * be an object for complex definitions or a string for single entries.
 */
export type FontValue = string | FontDefinition

/**
 * Defines the shape of the font family
 */
export interface FontFamilyProps {
  sans: {
    thin: FontValue
    medium: FontValue
    bold: FontValue
  }
  display: {
    regular: FontValue
  }
}

/**
 * A map of the font families and their settings
 */
export const fontFamily: FontFamilyProps = {
  sans: {
    thin: "ProximaNovaT-Thin",
    medium: "ProximaNova-Medium",
    bold: "ProximaNova-Bold",
  },
  display: {
    regular: "Apercu-Mono",
  },
}

export interface VerticalAlignProps {
  verticalAlign?:
    | "baseline"
    | "sub"
    | "super"
    | "text-top"
    | "text-bottom"
    | "middle"
    | "top"
    | "bottom"
    | "inherit"
    | "initial"
    | "unset"
}
const verticalAlign = style({
  prop: "verticalAlign",
})

/** renderFontValue */
export const renderFontValue = (fontValue: FontValue) => {
  if (typeof fontValue === "string") {
    return `font-family: ${fontValue}`
  } else {
    return [`font-family: ${fontValue.fontFamily}`]
      .concat(fontValue.fontStyle ? `font-style: ${fontValue.fontStyle}` : [])
      .concat(fontValue.fontWeight ? `font-weight: ${fontValue.fontWeight}` : [])
      .join(";\n")
  }
}

export interface TextProps
  extends ColorProps,
    FontSizeProps,
    LineHeightProps,
    MaxWidthProps,
    SpaceProps,
    StyledSystemDisplayProps,
    TextAlignProps,
    VerticalAlignProps {
  fontFamily?: string
  style?: CSSProperties
  numberOfLines?: number
}

/** Base Text component for typography */
export const Text = styled.Text<TextProps>`
  ${({ fontFamily }) => fontFamily && renderFontValue(fontFamily)};
  ${fontSize};
  ${lineHeight};
  ${color};
  ${display};
  ${maxWidth};
  ${space};
  ${textAlign};
  ${verticalAlign};
`

/**
 * Any valid font family
 */
export type FontFamily = typeof themeProps["fontFamily"]

/**
 * Determines which font sizes/line heights to use for typography.
 */
export function determineFontSizes(size: string | string[] | number) {
  if (typeof size == "number") {
    return { fontSize: size }
  }

  if (!Array.isArray(size)) {
    const match = themeProps.typeSizes[size]
    if (!match) {
      return {}
    }
    return {
      fontSize: match.fontSize,
      lineHeight: match.lineHeight,
    }
  }

  return size
    .map((s) => themeProps.typeSizes[s])
    .reduce(
      (accumulator, current) => {
        return {
          fontSize: [...accumulator.fontSize, current.fontSize],
          lineHeight: [...accumulator.lineHeight, current.lineHeight],
        }
      },
      { fontSize: [], lineHeight: [] }
    )
}

/**
 * Sans
 */

export interface SansProps extends Partial<TextProps> {
  italic?: boolean
  role?: string
  size: SansSize
  color?: Color | string
  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "thin" | "medium"
  onPress?: () => void
}

/**
 * The Sans typeface is the main Seasons typeface
 */

export const Sans: React.SFC<SansProps> = (props) => {
  const { size, weight, numberOfLines } = props
  const color = props.color ? colorHelper(props.color) : colorHelper("black")
  return (
    <Text
      {...props}
      fontFamily={fontFamily.sans[weight || "medium"]}
      {...determineFontSizes(size)}
      color={color}
      numberOfLines={numberOfLines}
    />
  )
}

Sans.displayName = "Sans"

export interface DisplayProps extends Partial<TextProps> {
  role?: string
  size: DisplaySize | number
  color?: Color | string
  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  onPress?: () => void
}

export const Display: React.SFC<DisplayProps> = (props) => {
  const { size, numberOfLines } = props
  const color = props.color ? colorHelper(props.color) : colorHelper("black")
  return (
    <Text
      {...props}
      fontFamily={fontFamily.display.regular}
      {...determineFontSizes(size)}
      color={color}
      numberOfLines={numberOfLines}
    />
  )
}

export const LogoText = styled.Text`
  font-family: "Apercu-Mono";
  font-size: 20;
  letter-spacing: 2;
  line-height: 24;
  color: white;
  text-align: center;
`
