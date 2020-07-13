import { color } from "App/utils"
import React, { useState, useEffect, MutableRefObject, useRef, useImperativeHandle } from "react"
import { KeyboardType, TextInput as RNTextInput, TouchableWithoutFeedback, ViewStyle } from "react-native"
import { animated, useSpring } from "react-spring"

import { Box, Spacer } from "./"
import { themeProps } from "./Theme"
import { fontFamily, Sans } from "./Typography"

export enum DisplayState {
  Active = "active",
  Inactive = "inactive",
}

export type TextInputVariant = "light" | "dark"
export const defaultVariant: TextInputVariant = "light"

export function getColorsForVariant(variant: TextInputVariant) {
  const {
    colors: { black100, white100, black50, black10 },
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
          borderColor: black10,
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
          borderColor: black10,
          color: white100,
        },
      }
    default:
      return getColorsForVariant("light")
  }
}

/////////////////////////////////////////////////////////
// Note: Any styling changes here should also appear in
// App/Scenes/CreateAccount/FakeTextInput
/////////////////////////////////////////////////////////

export interface TextInputProps {
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  autoCompleteType?:
    | "username"
    | "password"
    | "email"
    | "name"
    | "tel"
    | "street-address"
    | "postal-code"
    | "cc-number"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "off"
  autoFocus?: boolean
  blurOnSubmit?: boolean
  currentValue?: string
  headerText?: string
  inputKey?: string
  keyboardType?: KeyboardType
  multiline?: boolean
  onChangeText?: (inputKey: string, text: string) => void
  onFocus?: () => void
  placeholder?: string
  ref?: MutableRefObject<typeof TextInput>
  secureTextEntry?: boolean
  style?: ViewStyle
  textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
  variant?: TextInputVariant
}

interface TextInputRefAttributes {
  blur: () => void
  focus: () => void
}

export const TextInput = React.forwardRef<TextInputRefAttributes, TextInputProps>(
  (
    {
      autoCapitalize = "none",
      autoCompleteType,
      autoFocus,
      blurOnSubmit = true,
      currentValue,
      headerText,
      inputKey,
      keyboardType,
      multiline = false,
      onChangeText,
      onFocus,
      placeholder,
      secureTextEntry,
      style,
      textContentType,
      variant = defaultVariant,
    },
    ref
  ) => {
    const [state, setState] = useState(currentValue ? DisplayState.Active : DisplayState.Inactive)
    const [value, setValue] = useState(currentValue)
    const textInputRef: MutableRefObject<RNTextInput> = useRef(null)
    useEffect(() => {
      if (currentValue !== undefined && currentValue !== value) {
        handleOnChangeText(currentValue)
      }
    })
    useImperativeHandle(ref, () => ({
      blur: () => {
        textInputRef?.current?.blur()
      },
      focus: () => {
        textInputRef?.current?.focus()
      },
    }))

    const variantColors = getColorsForVariant(variant)
    const animation = useSpring(state == DisplayState.Active ? variantColors.active : variantColors.inactive)

    const handleOnChangeText = (text) => {
      setValue(text)
      setState(text.length ? DisplayState.Active : DisplayState.Inactive)
      onChangeText?.(inputKey, text)
    }

    const height = style?.height || (headerText ? 56 : 40)
    const placeholderColor = variant === "light" ? color("black50") : color("black10")

    return (
      <AnimatedBox
        style={{
          flex: style?.flex,
          height,
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: animation.borderColor,
          backgroundColor: animation.backgroundColor,
        }}
      >
        <TouchableWithoutFeedback onPress={() => textInputRef?.current?.focus?.()}>
          <Box>
            {!!headerText && (
              <Sans size="0.5" color={placeholderColor}>
                {headerText}
              </Sans>
            )}
            <Spacer mb={1} />
          </Box>
        </TouchableWithoutFeedback>
        <RNTextInput
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          autoFocus={autoFocus}
          blurOnSubmit={blurOnSubmit}
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={handleOnChangeText}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          ref={textInputRef}
          secureTextEntry={secureTextEntry}
          style={{
            color: variantColors.active.color,
            fontFamily: fontFamily.sans.medium.toString(),
            fontSize: themeProps.typeSizes[1].fontSize,
            ...style,
            textAlignVertical: "center",
          }}
          textContentType={textContentType}
          value={value}
        />
        <TouchableWithoutFeedback onPress={() => textInputRef?.current?.focus?.()}>
          <Spacer mb={1} />
        </TouchableWithoutFeedback>
      </AnimatedBox>
    )
  }
)

const AnimatedBox = animated(Box)
