import React from "react"
import { fontFamily } from "./platform/fonts"
import { ThemeProvider } from "./platform/primitives"

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
    white: "#fff",
    black: "#000",
    lightGray: "#DFDFDF",
    darkGray: "#303030",
  },

  fontFamily,

  space: {
    // unit: px value
    /** Equivalent to 3px  */
    0.3: 3,
    /** Equivalent to 5px  */
    0.5: 5,
    /** Equivalent to 10px  */
    1: 10,
    /** Equivalent to 20px  */
    2: 20,
    /** Equivalent to 30px  */
    3: 30,
    /** Equivalent to 40px  */
    4: 40,
    /** Equivalent to 60px  */
    6: 60,
    /** Equivalent to 90px  */
    9: 90,
    /** Equivalent to 120px  */
    12: 120,
    /** Equivalent to 180px  */
    18: 180,
  },

  typeSizes: {
    /** Unica  */
    sans: {
      /** Equivalent to 14px size / 20px line-height  */
      "0": {
        fontSize: 14,
        lineHeight: 20,
      },
      /** Equivalent to 16px size / 24px line-height  */
      "1": {
        fontSize: 16,
        lineHeight: 24,
      },
      /** Equivalent to 18px size / 20px line-height  */
      "2": {
        fontSize: 18,
        lineHeight: 20,
      },
      /** Equivalent to 24px size / 32px line-height  */
      "3": {
        fontSize: 24,
        lineHeight: 32,
      },
    },
  },
}

export const Theme = props => {
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
export type SansSize = keyof TypeSizes["sans"] | Array<keyof TypeSizes["sans"]>
