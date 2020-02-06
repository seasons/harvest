import React, { Component, ReactNode } from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import styled from "styled-components/native"

import { TextCheckSVG } from "../../assets/svgs"
import { Box, BoxProps } from "./Box"
import { Flex } from "./Flex"
import { Spacer } from "./Spacer"
import { themeProps } from "./Theme"
import { Sans } from "./Typography"
import { Spinner } from "./Spinner"
import { DownChevronIcon } from "Assets/icons"
import { color } from "App/Utils"

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
  showCheckMark?: boolean
  height?: number
  width?: number
  borderRadius?: number
  loading?: boolean
  rotateChevron?: boolean
  showChevron?: boolean
}

export type ButtonVariant = "primaryBlack" | "primaryWhite" | "blur" | "secondaryBlack"
export type ButtonSize = "small" | "medium" | "large"

/** Default button size */
export const defaultSize: ButtonSize = "large"
export const defaultVariant: ButtonVariant = "primaryBlack"

/**
 * Returns various colors for each state given a button variant
 * @param variant
 */
export function getColorsForVariant(variant: ButtonVariant) {
  const {
    colors: { black100, white100, black50, black15, black85 },
  } = themeProps

  switch (variant) {
    case "primaryBlack":
      return {
        default: {
          backgroundColor: black100,
          borderColor: black100,
          color: white100,
        },
        pressed: {
          backgroundColor: black85,
          borderColor: black85,
          color: white100,
        },
        disabled: {
          backgroundColor: black15,
          borderColor: black15,
          color: black50,
        },
      }
    case "primaryWhite":
      return {
        default: {
          backgroundColor: white100,
          borderColor: black100,
          color: black100,
        },
        pressed: {
          backgroundColor: black50,
          borderColor: black100,
          color: black100,
        },
        disabled: {
          backgroundColor: black15,
          borderColor: black15,
          color: black50,
        },
      }
    case "blur":
      return {
        default: {
          backgroundColor: white100,
          borderColor: black100,
          color: black100,
        },
        pressed: {
          backgroundColor: black50,
          borderColor: black100,
          color: black100,
        },
        disabled: {
          backgroundColor: black15,
          borderColor: black15,
          color: black100,
        },
      }
    case "secondaryBlack":
      return {
        default: {
          backgroundColor: black100,
          borderColor: black50,
          color: white100,
        },
        pressed: {
          backgroundColor: black85,
          borderColor: black50,
          color: white100,
        },
        disabled: {
          backgroundColor: black100,
          borderColor: black85,
          color: white100,
        },
      }
    default:
      return {
        default: {
          backgroundColor: black100,
          borderColor: black100,
          color: white100,
        },
        pressed: {
          backgroundColor: black85,
          borderColor: black85,
          color: white100,
        },
        disabled: {
          backgroundColor: black15,
          borderColor: black15,
          color: black100,
        },
      }
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

  get spinnerColor() {
    // const { inline, variant } = this.props

    // if (inline) {
    //   return variant === "primaryWhite" ? "white100" : "black100"
    // }

    return "white100"
  }

  getSize(): { height: number | string; size: "0" | "1" | "2"; px: number } {
    switch (this.props.size) {
      case "small":
        return { height: 40, size: "0", px: 2 }
      case "medium":
        return { height: 48, size: "1", px: 30 }
      case "large":
        return { height: 55, size: "2", px: 5 }
    }
  }

  onPress = args => {
    if (this.props.disabled || this.props.loading) {
      return
    }
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
    const { borderRadius = 28, children, showCheckMark, disabled, loading, showChevron, rotateChevron, ...rest } = this.props
    let { px, size, height } = this.getSize()
    height = this.props.height ?? height
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
              <AnimatedContainer disabled={disabled} {...rest} style={{ ...props, borderRadius, height }} px={px}>
                {!loading && (
                  <>
                    <Sans color={to.color} size={size}>
                      {children}
                    </Sans>
                    {showChevron && (
                      <>
                        <Spacer mr={1} />
                        <DownChevronIcon color={color("black100")} rotate={rotateChevron} />
                      </>
                    )}
                    {showCheckMark && (
                      <Flex flexDirection="row" flexWrap="nowrap">
                        <Spacer mr={0.5} />
                        <TextCheckSVG color={to.color} />
                      </Flex>
                    )}
                  </>
                )}
                {loading && <Spinner size={this.props.size} color={this.spinnerColor as any} />}
              </AnimatedContainer>
            </Flex>
          </TouchableWithoutFeedback>
        )}
      </Spring>
    )
  }
}

const Container = styled(Box) <ButtonProps>`
  align-items: center;
  justify-content: center;
  position: relative;
  flex-wrap: nowrap;
  flex-direction: row;
  border-width: 1;
  border-radius: 28;
  width: ${p => {
    if (p.width) {
      return p.width
    } else {
      return p.size === "large" ? "100%" : "auto"
    }
  }};
  }
`

const AnimatedContainer = animated(Container)
