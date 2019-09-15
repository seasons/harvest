import React from "react"
import styled from "styled-components/native"
import { themeProps } from "./Theme"
import { fontFamily } from "./Typography"
import { TextInput as RNTextInput } from "react-native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import { color, space } from "../helpers"

export interface TextInputProps {
  /** The theme of the input */
  variant?: TextInputVariant
  placeholder?: string
  secureTextEntry?: boolean
}

enum DisplayState {
  Active = "active",
  Inactive = "inactive",
}

export type TextInputVariant = "light" | "dark"
export const defaultVariant: TextInputVariant = "light"

export function getColorsForVariant(variant: TextInputVariant) {
  const {
    colors: { black, white, gray },
  } = themeProps

  switch (variant) {
    case "light":
      return {
        active: {
          backgroundColor: white,
          borderColor: black,
          color: black,
        },
        inactive: {
          backgroundColor: white,
          borderColor: gray,
          color: gray,
        },
      }
    case "dark":
      return {
        active: {
          backgroundColor: black,
          borderColor: white,
          color: white,
        },
        inactive: {
          backgroundColor: black,
          borderColor: gray,
          color: gray,
        },
      }
    default:
  }
}

export const TextInput: React.SFC<TextInputProps> = ({ variant = defaultVariant, placeholder, secureTextEntry }) => {
  const [value, onChangeText] = React.useState("")
  const [previous, setPrevious] = React.useState(DisplayState.Inactive)
  const [current, setCurrent] = React.useState(DisplayState.Inactive)
  const variantColors = getColorsForVariant(variant)

  const from = variantColors[previous]
  const to = variantColors[current]

  const handleOnChangeText = text => {
    if (text.length) {
      setCurrent(DisplayState.Active)
      setPrevious(DisplayState.Inactive)
    } else {
      setCurrent(DisplayState.Inactive)
      setPrevious(DisplayState.Active)
    }
    onChangeText(text)
  }

  return (
    <Spring native from={from} to={to}>
      {props => (
        <AnimatedTextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          style={{ ...props }}
          placeholderTextColor={color("gray")}
          onChangeText={text => handleOnChangeText(text)}
          value={value}
        />
      )}
    </Spring>
  )
}

const StyledTextInput = styled(RNTextInput)<TextInputProps>`
  border-width: 1;
  height: 56;
  border-radius: 8;
  font-size: 18;
  line-height: 20;
  padding-left: 15;
  padding-right: 15;
  font-family: ${fontFamily.sans.regular};
`

const AnimatedTextInput = animated(StyledTextInput)
