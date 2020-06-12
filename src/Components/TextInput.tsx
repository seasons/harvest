import { color } from "App/utils"
import React, { useEffect } from "react"
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
  currentValue?: string
  autoCapitalize?: string
  autoFocus?: boolean
  blurOnSubmit?: boolean
  onChangeText?: (inputKey: string, text: string) => void
  keyboardType?: string
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
  multiline = false,
  currentValue,
  autoCapitalize = "none",
  autoFocus,
  blurOnSubmit = true,
  keyboardType,
}) => {
  const [previous, setPrevious] = React.useState(DisplayState.Inactive)
  const [current, setCurrent] = React.useState(currentValue ? DisplayState.Active : DisplayState.Inactive)
  const [value, setValue] = React.useState(currentValue)
  const variantColors = getColorsForVariant(variant)

  const from = variantColors[previous]
  const to = variantColors[current]

  useEffect(() => {
    if (currentValue !== undefined && currentValue !== value) {
      handleOnChangeText(currentValue)
    }
  })

  const handleOnChangeText = (text) => {
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
  const flex = style && style.flex

  return (
    <Box style={{ height, flex }}>
      <Spring native from={from} to={to}>
        {(props) => (
          <AnimatedTextInput
            autoFocus={autoFocus}
            blurOnSubmit={blurOnSubmit}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            style={{ ...style, ...props }}
            autoCapitalize={autoCapitalize}
            placeholderTextColor={variant === "light" ? color("black50") : color("black25")}
            onChangeText={(text) => handleOnChangeText(text)}
            value={value}
            keyboardType={keyboardType}
          />
        )}
      </Spring>
    </Box>
  )
}

const StyledTextInput = styled(RNTextInput) <TextInputProps>`
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
