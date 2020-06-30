import { Box, Spacer } from "App/Components"
import { fontFamily, Sans } from "App/Components/Typography"
import { color } from "App/utils"
import React from "react"
import { Text, TouchableWithoutFeedback, ViewStyle } from "react-native"
import { animated, useSpring } from "react-spring"

import { defaultVariant, DisplayState, getColorsForVariant, TextInputVariant } from "App/Components/TextInput"

export interface FakeTextInputProps {
  currentValue: string
  headerText?: string
  inputKey?: string
  onPress?: (inputKey?: string) => void
  placeholder?: string
  style?: ViewStyle
  variant?: TextInputVariant
}

export const FakeTextInput: React.FC<FakeTextInputProps> = ({
  currentValue,
  headerText,
  inputKey,
  onPress,
  placeholder,
  style,
  variant = defaultVariant,
}) => {
  const state = currentValue ? DisplayState.Active : DisplayState.Inactive

  const variantColors = getColorsForVariant(variant)
  const animation = useSpring(state == DisplayState.Active ? variantColors.active : variantColors.inactive)

  const height = style?.height || (headerText ? 65 : 40)
  const placeholderColor = variant === "light" ? color("black50") : color("black25")

  return (
    <TouchableWithoutFeedback onPress={() => onPress(inputKey)}>
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
        {headerText ? (
          <Sans size="1" color={placeholderColor}>
            {headerText}
          </Sans>
        ) : null}
        <Spacer height={10} />
        <Text
          style={{
            color: currentValue.length ? variantColors.active.color : placeholderColor,
            fontFamily: fontFamily.sans.medium.toString(),
            fontSize: 18,
            ...style,
            textAlignVertical: "center",
          }}
        >
          {currentValue.length ? currentValue : placeholder}
        </Text>
        <Spacer height={12} />
      </AnimatedBox>
    </TouchableWithoutFeedback>
  )
}

const AnimatedBox = animated(Box)
