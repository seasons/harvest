import React, { Component, ReactNode } from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled, { css } from "styled-components/native"
import { themeProps } from "./Theme"
import { Box, BoxProps } from "./Box"
import { Flex } from "./Flex"
import { Sans } from "./Typography"
import { animated, Spring } from "react-spring/renderprops-native.cjs"

enum DisplayState {
  Active = "active",
  Inactive = "inactive",
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
        active: {
          backgroundColor: white,
          borderColor: white,
          color: black,
        },
        inactive: {
          backgroundColor: darkGray,
          borderColor: darkGray,
          color: gray,
        },
      }
    case "secondaryLight":
      return {
        active: {
          backgroundColor: black,
          borderColor: gray,
          color: white,
        },
        inactive: {
          backgroundColor: black,
          borderColor: gray,
          color: white,
        },
      }
    case "primaryDark":
      return {
        active: {
          backgroundColor: black,
          borderColor: black,
          color: white,
        },
        inactive: {
          backgroundColor: lightGray,
          borderColor: lightGray,
          color: darkGray,
        },
      }
    case "secondaryDark":
      return {
        active: {
          backgroundColor: white,
          borderColor: black,
          color: black,
        },
        inactive: {
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
    previous: DisplayState.Active,
    current: DisplayState.Active,
  }

  getSize(): { height: number | string; size: "1" | "2"; px: number } {
    switch (this.props.size) {
      case "small":
        return { height: 40, size: "2", px: 3 }
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

      if (this.state.current === DisplayState.Active) {
        this.setState({
          previous: current,
          current: DisplayState.Inactive,
        })
        setTimeout(
          () =>
            this.setState({
              previous: current,
              current: DisplayState.Active,
            }),
          0.3
        )
      } else {
        // Was already selected
        this.setState({ current: DisplayState.Active })
      }

      this.props.onPress(args)
    }
  }

  render() {
    const { children, ...rest } = this.props
    const { px, size, height } = this.getSize()
    const variantColors = getColorsForVariant(this.props.variant)

    const { current, previous } = this.state

    const from = variantColors[previous]
    const to = variantColors[current]

    console.log("this.props.variant", this.props.variant)
    console.log("getColorsForVariant(this.props.variant)", getColorsForVariant(this.props.variant))
    console.log("previous", previous)
    console.log("current", current)
    console.log("from", from)
    console.log("to", to)

    return (
      <Spring native from={from} to={to}>
        {props => (
          <TouchableWithoutFeedback
            onPress={this.onPress}
            onPressIn={() => {
              this.setState({
                previous: DisplayState.Active,
                current: DisplayState.Inactive,
              })
            }}
            onPressOut={() => {
              this.setState({
                previous: DisplayState.Inactive,
                current: DisplayState.Active,
              })
            }}
          >
            <Flex flexDirection="row">
              <AnimatedContainer {...rest} style={{ ...props, height }} px={px}>
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
