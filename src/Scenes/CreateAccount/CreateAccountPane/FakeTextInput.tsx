import { Box } from "App/Components"
import { fontFamily } from "App/Components/Typography"
import { color } from "App/utils"
import React, { useState } from "react"
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import styled from "styled-components/native"

import {
    defaultVariant,
    DisplayState,
    getColorsForVariant,
    TextInputVariant
} from "App/Components/TextInput"

export interface FakeTextInputProps {
    currentValue: string
    inputKey?: string
    onPress?: (inputKey?: string) => void
    placeholder?: string
    style?: ViewStyle
    variant?: TextInputVariant
}

export const FakeTextInput: React.FC<FakeTextInputProps> = ({
    currentValue,
    inputKey,
    onPress,
    placeholder,
    style,
    variant = defaultVariant,
}) => {
    const [previous, setPrevious] = useState(DisplayState.Inactive)
    const [current, setCurrent] = useState(currentValue.length ? DisplayState.Active : DisplayState.Inactive)
    const [value, setValue] = useState(currentValue)
    const variantColors = getColorsForVariant(variant)

    const from = variantColors[previous]
    const to = variantColors[current]

    if (currentValue !== value) {
        setValue(currentValue)
        if (currentValue.length) {
            setCurrent(DisplayState.Active)
            setPrevious(DisplayState.Inactive)
        } else {
            setCurrent(DisplayState.Inactive)
            setPrevious(DisplayState.Active)
        }
    }

    const height = style && style.height ? style.height : 56
    const flex = style && style.flex

    const placeholderTextColor = () => variant === "light" ? color("black50") : color("black25")

    return (
        <TouchableWithoutFeedback onPress={() => onPress(inputKey)}>
            <Box style={{ height, flex }}>
                <Spring native from={from} to={to}>
                    {(props) => (
                        <AnimatedView style={{ ...style, ...props }}>
                            <Text
                                style={{
                                    ...style,
                                    color: currentValue.length ? color("black100") : placeholderTextColor(),
                                    fontFamily: fontFamily.sans.medium,
                                    fontSize: 18,
                                }}
                            >
                                {currentValue.length ? currentValue : placeholder}
                            </Text>
                        </AnimatedView>
                    )}
                </Spring>
            </Box>
        </TouchableWithoutFeedback>
    )
}

const StyledAnimatedView = styled(View) <FakeTextInputProps>`
    border-width: 1;
    height: 56;
    border-radius: 8;
    font-size: 18;
    line-height: 20;
    padding-left: 15;
    flex: 2;
    padding-right: 15;
    justify-content: center;
    align-items: flex-start
`

const AnimatedView = animated(StyledAnimatedView)