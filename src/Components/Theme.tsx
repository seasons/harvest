import React from "react"
import { ThemeProvider } from "styled-components/native"
import { fontFamily } from "./Typography"

/**
 * A list of breakpoints accessible by key/value.
 */
export const breakpoints = {
  /** Above 1192 */
  xl: 1192,
  /** Between 1024 and  1191 */
  lg: 1024,
  /** Between 900 and 1023 */
  md: 900,
  /** Between 768 and  899 */
  sm: 768,
  /** Below 767 */
  xs: 767,
}

/**
 */
export const themeProps = {
  /** Border variations */
  borders: ["1px solid", "2px solid"],

  colors: {
    black100: "#000",
    black85: "#252525",
    // black65: "#5A5A5A",
    black50: "#7F7F7F",
    black15: "#D9D9D9",
    black04: "#F6F6F6",
    white100: "#fff",
    green: "#44524A",
    lightGreen: "#989F9B",
    blue: "#2B50DF",
  },

  fontFamily,

  space: {
    /** Equivalent to 4px  */
    0.5: 4,
    /** Equivalent to 8px  */
    1: 8,
    /** Equivalent to 16px  */
    2: 16,
    /** Equivalent to 24px  */
    3: 24,
    /** Equivalent to 32px  */
    4: 32,
    /** Equivalent to 40px  */
    5: 40,
    /** Equivalent to 48px  */
    6: 48,
  },

  typeSizes: {
    /** Equivalent to 14px size / 20px line-height  */
    "0": {
      fontSize: 12,
      lineHeight: 16,
    },
    /** Equivalent to 16px size / 24px line-height  */
    "1": {
      fontSize: 16,
      lineHeight: 24,
    },
    /** Equivalent to 18px size / 26px line-height  */
    "2": {
      fontSize: 18,
      lineHeight: 26,
    },
    /** Equivalent to 24px size / 32px line-height  */
    "3": {
      fontSize: 24,
      lineHeight: 32,
    },
    /** Equivalent to 40px size / 40px line-height  */
    "4": {
      fontSize: 40,
      lineHeight: 40,
    },
  },
}

export const Theme = (props) => {
  return <ThemeProvider theme={themeProps}>{props.children}</ThemeProvider>
}

/** All available px spacing maps */
export type SpacingUnit = keyof typeof themeProps["space"]
/** All available color keys */
export type Color = keyof typeof themeProps["colors"]
/** All available width breakpoint */
// export type Breakpoint = keyof typeof breakpoints

/** All available type sizes */
export type TypeSizes = typeof themeProps.typeSizes
/** All available sizes for our sans font */
export type SansSize = keyof TypeSizes | Array<keyof TypeSizes>
