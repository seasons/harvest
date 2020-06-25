import { color } from "App/utils"
import React, { useState, useEffect, MutableRefObject, useRef } from "react"
import { TextInput as RNTextInput, ViewStyle, KeyboardType } from "react-native"
import { animated, useSpring } from "react-spring"

import { Box, Spacer } from "./"
import { DisplayState, TextInputVariant, defaultVariant, getColorsForVariant } from "./BorderedTextInput"
import { fontFamily, Sans } from "./Typography"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

export { DisplayState, TextInputVariant, defaultVariant, getColorsForVariant }

/////////////////////////////////////////////////////////
// Note: Any styling changes here should also appear in
// App/Scenes/CreateAccount/FakeTextInput
/////////////////////////////////////////////////////////

export interface TextInputProps {
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
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
  secureTextEntry?: boolean
  style?: ViewStyle
  variant?: TextInputVariant
}

export const TextInput: React.FC<TextInputProps> = ({
  autoCapitalize = "none",
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
  variant = defaultVariant,
}) => {
  const [state, setState] = useState(currentValue ? DisplayState.Active : DisplayState.Inactive)
  const [value, setValue] = useState(currentValue)
  const textInputRef: MutableRefObject<RNTextInput> = useRef()
  useEffect(() => {
    if (currentValue !== undefined && currentValue !== value) {
      handleOnChangeText(currentValue)
    }
  })

  const variantColors = getColorsForVariant(variant)
  const animation = useSpring(state == DisplayState.Active ? variantColors.active : variantColors.inactive)

  const handleOnChangeText = (text) => {
    setValue(text)
    setState(text.length ? DisplayState.Active : DisplayState.Inactive)
    onChangeText?.(inputKey, text)
  }

  const height = style?.height || (headerText ? 65 : 40)
  const placeholderColor = variant === "light" ? color("black50") : color("black25")

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
      <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
        {headerText ? (
          <Sans size="1" color={placeholderColor}>
            {headerText}
          </Sans>
        ) : null}
        <Spacer height={10} />
        <RNTextInput
          autoCapitalize={autoCapitalize}
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
            fontSize: 18,
            ...style,
            textAlignVertical: "center",
          }}
          value={value}
        />
        <Spacer height={12} />
      </TouchableWithoutFeedback>
    </AnimatedBox>
  )
}

const AnimatedBox = animated(Box)
