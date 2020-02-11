import { color } from "App/Utils"
import React from "react"
import { TextInput as RNTextInput, ViewStyle } from "react-native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import styled from "styled-components/native"

import { Box } from "./"
import { themeProps } from "./Theme"
import { fontFamily } from "./Typography"

export interface TextInputProps {
  /** The theme of the input */
  style?: ViewStyle
  variant?: TextInputVariant
  placeholder?: string
  secureTextEntry?: boolean
  autoCompleteType?: string
  textContentType?: string
  inputKey?: string
  multiline?: boolean
  reference?: any
  onChangeText?: (inputKey: string, text: string) => void
}

enum DisplayState {
  Active = "active",
  Inactive = "inactive",
}

export type TextInputVariant = "light" | "dark"
export const defaultVariant: TextInputVariant = "light"

export function getColorsForVariant(variant: TextInputVariant) {
  const {
    colors: { black100, white100, black50 },
  } = themeProps

  switch (variant) {
    case "light":
      return {
        active: {
          backgroundColor: white100,
          borderColor: black100,
          color: black100,
        },
        inactive: {
          backgroundColor: white100,
          borderColor: black50,
          color: black50,
        },
      }
    case "dark":
      return {
        active: {
          backgroundColor: black100,
          borderColor: white100,
          color: white100,
        },
        inactive: {
          backgroundColor: black100,
          borderColor: black50,
          color: white100,
        },
      }
    default:
  }
}

export const TextInput: React.FC<TextInputProps> = ({
  variant = defaultVariant,
  placeholder,
  secureTextEntry,
  onChangeText,
  style,
  inputKey,
  multiline,
  reference,
}) => {
  const [previous, setPrevious] = React.useState(DisplayState.Inactive)
  const [current, setCurrent] = React.useState(DisplayState.Inactive)
  const [value, setValue] = React.useState("")
  const variantColors = getColorsForVariant(variant)

  const from = variantColors[previous]
  const to = variantColors[current]

  const handleOnChangeText = text => {
    setValue(text)
    if (text.length) {
      setCurrent(DisplayState.Active)
      setPrevious(DisplayState.Inactive)
    } else {
      setCurrent(DisplayState.Inactive)
      setPrevious(DisplayState.Active)
    }
    if (onChangeText) {
      onChangeText(inputKey, text)
    }
  }

  const height = style && style.height ? style.height : 56

  return (
    <Box style={{ height: height }}>
      <Spring native from={from} to={to}>
        {props => (
          <AnimatedTextInput
            ref={reference}
            blurOnSubmit
            multiline={multiline || false}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            style={{ ...style, ...props }}
            autoCapitalize="none"
            placeholderTextColor={color("black50")}
            onChangeText={text => handleOnChangeText(text)}
            value={value}
          />
        )}
      </Spring>
    </Box>
  )
}

const StyledTextInput = styled(RNTextInput)<TextInputProps>`
  border-width: 1;
  height: 56;
  border-radius: 8;
  font-size: 18;
  line-height: 20;
  padding-left: 15;
  flex: 2;
  padding-right: 15;
  font-family: ${fontFamily.sans.medium};
`

const AnimatedTextInput = animated(StyledTextInput)
