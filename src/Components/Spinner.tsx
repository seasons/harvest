// @ts-ignore
import React from "react"
import { Animated, Easing, View } from "react-native"
import styled from "styled-components/native"
import { color } from "../Utils"
import { Color } from "../Components/Theme"

export interface SpinnerProps {
  /** Width of the spinner */
  width?: number
  /** Height of the spinner */
  height?: number
  /** Size of the spinner */
  size?: "small" | "medium" | "large"
  /** Color of the spinner */
  color?: Color
}

/**
 * Spinner component for React Native
 */
export class Spinner extends React.Component<SpinnerProps> {
  rotation: Animated.Value

  static defaultProps: SpinnerProps = {
    size: "medium",
    color: "black100",
  }

  constructor(props) {
    super(props)
    this.rotation = new Animated.Value(0)
  }

  componentDidMount() {
    this.startRotation()
  }

  startRotation() {
    this.rotation.setValue(0)
    Animated.timing(this.rotation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.startRotation())
  }

  render() {
    const RotateData = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })

    return (
      <Bar
        as={Animated.View}
        {...this.props}
        style={{
          transform: [{ rotate: RotateData }],
        }}
      />
    )
  }
}

/** Generic Spinner component */
const Bar = styled(View)<SpinnerProps>`
  background: black;
  position: absolute;

  ${props => {
    const { width, height } = getSize(props)

    return `
      background: ${color(props.color)};
      width: ${width}px;
      height: ${height}px;
    `
  }};
`

Bar.defaultProps = {
  width: 25,
  height: 6,
}

/**
 * Returns width and height of spinner based on size
 * @param props
 */
export const getSize = (props: SpinnerProps) => {
  const base = { width: 25, height: 6 }

  switch (props.size) {
    case "small":
      return {
        width: base.width * 0.5,
        height: base.height * 0.5,
      }
    case "medium":
      return {
        width: base.width * 0.8,
        height: base.height * 0.8,
      }
    case "large":
      return {
        width: base.width,
        height: base.height,
      }
    default:
      return {
        width: props.width,
        height: props.height,
      }
  }
}
