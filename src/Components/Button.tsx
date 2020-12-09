import { color } from "App/utils/color"
import React, { Component, ComponentType, ReactNode } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import styled from "styled-components/native"

import { TextCheckSVG } from "../../assets/svgs"
import { Box, BoxProps } from "./Box"
import { Flex } from "./Flex"
import { Spacer } from "./Spacer"
import { Spinner } from "./Spinner"
import { themeProps } from "./Theme"
import { Sans } from "./Typography"

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
  selected?: boolean
  showCheckMark?: boolean
  height?: number
  width?: number | string
  borderRadius?: number
  loading?: boolean
  Icon?: ComponentType
  block?: boolean
}

export type ButtonVariant =
  | "primaryBlack"
  | "secondaryWhite"
  | "primaryWhite"
  | "secondaryBlack"
  | "tertiaryBlack"
  | "tertiaryWhite"
  | "primaryGray"
export type ButtonSize = "small" | "large"

/** Default button size */
export const defaultSize: ButtonSize = "large"
export const defaultVariant: ButtonVariant = "primaryBlack"

/**
 * Returns various colors for each state given a button variant
 * @param variant
 */
export function getColorsForVariant(variant: ButtonVariant) {
  const {
    colors: { black100, white100, black50, black10, black85, black04 },
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
          backgroundColor: black50,
          borderColor: black50,
          color: white100,
        },
        disabled: {
          backgroundColor: black10,
          borderColor: black10,
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
          backgroundColor: black10,
          borderColor: black10,
          color: black50,
        },
      }
    case "secondaryWhite":
      return {
        default: {
          backgroundColor: white100,
          borderColor: black10,
          color: black100,
        },
        pressed: {
          backgroundColor: black50,
          borderColor: black10,
          color: black100,
        },
        disabled: {
          backgroundColor: white100,
          borderColor: black10,
          color: black50,
        },
      }
    case "tertiaryWhite":
      return {
        default: {
          backgroundColor: white100,
          borderColor: black10,
          color: black100,
        },
        pressed: {
          backgroundColor: black100,
          borderColor: black100,
          color: white100,
        },
        disabled: {
          backgroundColor: black10,
          borderColor: black10,
          color: black50,
        },
      }
    case "primaryGray":
      return {
        default: {
          backgroundColor: black04,
          borderColor: black04,
          color: black100,
        },
        pressed: {
          backgroundColor: black10,
          borderColor: black10,
          color: black100,
        },
        disabled: {
          backgroundColor: black10,
          borderColor: black10,
          color: black100,
        },
      }
    case "secondaryBlack":
      return {
        default: {
          backgroundColor: black100,
          borderColor: black85,
          color: white100,
        },
        pressed: {
          backgroundColor: black85,
          borderColor: black50,
          color: white100,
        },
        disabled: {
          backgroundColor: black85,
          borderColor: black85,
          color: white100,
        },
      }
    case "tertiaryBlack":
      return {
        default: {
          backgroundColor: black85,
          borderColor: black85,
          color: white100,
        },
        pressed: {
          backgroundColor: black100,
          borderColor: black100,
          color: white100,
        },
        disabled: {
          backgroundColor: black10,
          borderColor: black10,
          color: black50,
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
          backgroundColor: black10,
          borderColor: black10,
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selected } = nextProps
    if (selected === undefined) {
      return prevState
    }
    const { current: currentState, previous: previousState } = prevState
    const previous = selected ? currentState : previousState
    const current = selected ? DisplayState.Pressed : DisplayState.Default
    return { previous, current }
  }

  constructor(props: ButtonProps) {
    super(props)
    const { selected = false } = props
    this.state = {
      previous: DisplayState.Default,
      current: selected ? DisplayState.Pressed : DisplayState.Default,
    }
  }

  get spinnerColor() {
    return this.props.variant === "primaryWhite" || this.props.variant === "secondaryWhite" ? "black100" : "white100"
  }

  getSize(): { height: number | string; size: "0" | "1" | "2"; px: number } {
    switch (this.props.size) {
      case "small":
        return { height: 36, size: "1", px: 21 }
      default:
        return { height: 48, size: "1", px: 30 }
    }
  }

  onPress = (args) => {
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
    const {
      borderRadius = 28,
      backgroundColor,
      children,
      showCheckMark,
      disabled,
      loading,
      Icon,
      selected = false,
      ...rest
    } = this.props
    const { px, size, height } = this.getSize()
    const buttonHeight = this.props.height ?? height
    const variantColors = getColorsForVariant(this.props.variant)
    const { current, previous } = this.state
    const from = disabled ? variantColors[DisplayState.Disabled] : variantColors[previous]
    const to = disabled ? variantColors[DisplayState.Disabled] : variantColors[current]
    const overridenBg = backgroundColor ? { backgroundColor, borderColor: backgroundColor } : {}
    return (
      <Spring native from={from} to={to}>
        {(props) => (
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
              <AnimatedContainer
                disabled={disabled}
                {...rest}
                style={{ ...props, ...overridenBg, borderRadius, height: buttonHeight }}
                px={px}
              >
                <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" style={{ position: "relative" }}>
                  {!!Icon && (
                    <Flex
                      flexDirection="row"
                      flexWrap="nowrap"
                      alignItems="center"
                      style={{ opacity: disabled ? 0.5 : 1 }}
                    >
                      <Icon />
                      <Spacer mr={1} />
                    </Flex>
                  )}
                  <Sans color={to.color} size={size}>
                    {children}
                  </Sans>
                  {showCheckMark && (
                    <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
                      <Spacer mr={0.5} />
                      <TextCheckSVG color={to.color} />
                    </Flex>
                  )}
                  {loading && (
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      height="100%"
                      style={{
                        position: "absolute",
                      }}
                    >
                      <Spinner size={this.props.size} color={this.spinnerColor as any} />
                    </Flex>
                  )}
                </Flex>
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
  flex-wrap: nowrap;
  flex-direction: row;
  border-width: 1;
  border-radius: 28;
  width: ${(p) => {
    if (p.width) {
      return p.width
    } else {
      return p.block ? "100%" : "auto"
    }
  }};
`

const AnimatedContainer = animated(Container)
