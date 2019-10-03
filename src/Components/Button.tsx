import React, { Component, ReactNode } from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { themeProps } from "./Theme"
import { Box, BoxProps } from "./Box"
import { Flex } from "./Flex"
import { Sans } from "./Typography"
import { animated, Spring } from "react-spring/renderprops-native.cjs"

enum DisplayState {
  Default = "default",
  Pressed = "pressed",
  Disabled = "disabled",
}

interface ButtonState {
  previous: DisplayState
  current: DisplayState
}

export interface ButtonProps extends BoxProps {
  children: ReactNode
  /** The size of the button */
  size?: ButtonSize
  /** The theme of the button */
  variant?: ButtonVariant
  /** React Native only, Callback on press, use instead of onClick */
  onPress?: (e) => void
  disabled?: boolean
}

export type ButtonVariant = "primaryLight" | "secondaryLight" | "primaryDark" | "secondaryOutline" | "secondaryDark"
export type ButtonSize = "small" | "medium" | "large"

/** Default button size */
export const defaultSize: ButtonSize = "large"
export const defaultVariant: ButtonVariant = "primaryDark"

/**
 * Returns various colors for each state given a button variant
 * @param variant
 */
export function getColorsForVariant(variant: ButtonVariant) {
  const {
    colors: { black, white, gray, darkGray, lightGray },
  } = themeProps

  switch (variant) {
    case "primaryLight":
      return {
        default: {
          backgroundColor: white,
          borderColor: white,
          color: black,
        },
        pressed: {
          backgroundColor: white,
          borderColor: white,
          color: black,
        },
        disabled: {
          backgroundColor: darkGray,
          borderColor: darkGray,
          color: gray,
        },
      }
    case "secondaryLight":
      return {
        default: {
          backgroundColor: black,
          borderColor: gray,
          color: white,
        },
        pressed: {
          backgroundColor: black,
          borderColor: gray,
          color: white,
        },
        disabled: {
          backgroundColor: black,
          borderColor: gray,
          color: white,
        },
      }
    case "primaryDark":
      return {
        default: {
          backgroundColor: black,
          borderColor: black,
          color: white,
        },
        pressed: {
          backgroundColor: black,
          borderColor: black,
          color: white,
        },
        disabled: {
          backgroundColor: lightGray,
          borderColor: lightGray,
          color: darkGray,
        },
      }
    case "secondaryDark":
      return {
        default: {
          backgroundColor: white,
          borderColor: black,
          color: black,
        },
        pressed: {
          backgroundColor: white,
          borderColor: black,
          color: black,
        },
        disabled: {
          backgroundColor: white,
          borderColor: black,
          color: black,
        },
      }
    default:
  }
}

/** A button with various size and color settings */
export class Button extends Component<ButtonProps, ButtonState> {
  static defaultProps = {
    size: defaultSize,
    variant: defaultVariant,
    theme: themeProps,
  }

  state = {
    previous: DisplayState.Default,
    current: DisplayState.Default,
  }

  getSize(): { height: number | string; size: "0" | "1" | "2"; px: number } {
    switch (this.props.size) {
      case "small":
        return { height: 40, size: "0", px: 2 }
      case "medium":
        return { height: 55, size: "2", px: 5 }
      case "large":
        return { height: 55, size: "1", px: 5 }
    }
  }

  onPress = args => {
    if (this.props.onPress) {
      // Did someone tap really fast? Flick the highlighted state
      const { current } = this.state

      if (this.state.current === DisplayState.Default) {
        this.setState({
          previous: current,
          current: DisplayState.Pressed,
        })
        setTimeout(
          () =>
            this.setState({
              previous: current,
              current: DisplayState.Default,
            }),
          0.3
        )
      } else {
        // Was already selected
        this.setState({ current: DisplayState.Default })
      }

      this.props.onPress(args)
    }
  }

  render() {
    const { children, disabled, ...rest } = this.props
    const { px, size, height } = this.getSize()
    const variantColors = getColorsForVariant(this.props.variant)
    const { current, previous } = this.state
    const from = disabled ? variantColors[DisplayState.Disabled] : variantColors[previous]
    const to = disabled ? variantColors[DisplayState.Disabled] : variantColors[current]

    return (
      <Spring native from={from} to={to}>
        {props => (
          <TouchableWithoutFeedback
            onPress={this.onPress}
            onPressIn={() => {
              this.setState({
                previous: DisplayState.Default,
                current: DisplayState.Pressed,
              })
            }}
            onPressOut={() => {
              this.setState({
                previous: DisplayState.Pressed,
                current: DisplayState.Default,
              })
            }}
            disabled={disabled}
          >
            <Flex flexDirection="row">
              <AnimatedContainer disabled={disabled} {...rest} style={{ ...props, height }} px={px}>
                <Sans color={to.color} size={size}>
                  {children}
                </Sans>
              </AnimatedContainer>
            </Flex>
          </TouchableWithoutFeedback>
        )}
      </Spring>
    )
  }
}

const Container = styled(Box)<ButtonProps>`
  align-items: center;
  justify-content: center;
  position: relative;
  border-width: 1;
  border-radius: 28;
  width: ${p => (p.size === "large" ? "100%" : "auto")};
`

const AnimatedContainer = animated(Container)
