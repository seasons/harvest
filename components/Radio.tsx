import debounce from "lodash/debounce"
import React from "react"
import styled from "styled-components/native"
import { Flex, FlexProps } from "./Flex"
import { color, space } from "../helpers"

import { BorderProps, borders, SizeProps, space as styledSpace, SpaceProps } from "styled-system"
import { Box } from "./Box"
import { Sans } from "."

/**
 * Spec: zpl.io/bAvnwlB
 */

export interface RadioProps extends FlexProps {
  /** Disable interactions */
  disabled?: boolean
  /** Select the button on render. If the Radio is inside a RadioGroup, use RadioGroup.defaultValue instead. */
  selected?: boolean
  /** Callback when selected */
  onSelect?: (selected: { selected: boolean; value: string }) => void
  /** Value of radio button */
  value?: string
  /** Name of the radio button */
  name?: string
  /** The label content, if not specified the children will be used  */
  label?: React.ReactNode
}

export interface RadioToggleProps extends RadioProps, BorderProps, SizeProps, SpaceProps {}

/**
 * A Radio button
 *
 * Spec: zpl.io/bAvnwlB
 */
export const Radio: React.SFC<RadioProps> = props => {
  const { children, disabled, name, onSelect: _onSelect, selected, value, label, ...others } = props

  // Ensures that only one call to `onSelect` occurs, regardless of whether the
  // user clicks the radio element or the label.
  const onSelect = _onSelect && debounce(_onSelect, 0)

  return (
    <Flex flexDirection="row" alignItems="center">
      <Container
        disabled={disabled}
        alignItems="center"
        selected={selected}
        onPress={() => !disabled && onSelect && onSelect({ selected: !selected, value })}
        {...others}
      >
        <RadioButton role="presentation" border={1} mr={1} selected={selected} disabled={disabled}>
          {selected && <InnerCircle />}
        </RadioButton>
      </Container>
      {!!label && (
        <Flex flexDirection="row" alignItems="center" ml={1}>
          <Sans size="2" color="black">
            {label}
          </Sans>
        </Flex>
      )}
    </Flex>
  )
}

/**
 * A radio button with a border
 */
export const BorderedRadio = styled(Box)<RadioProps>`
  padding: ${space(2)}px;
  border: 1px solid ${color("gray")};
  transition: background-color 0.14s ease-in-out;
  :not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  :not(:last-child) {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

interface ContainerProps extends FlexProps {
  disabled: boolean
  selected: boolean
}

const Container = styled(Flex)<ContainerProps>`
  align-items: flex-start;
`

const InnerCircle = styled(Box)`
  width: 14;
  height: 14;
  border-radius: 4;
  position: relative;
  left: 4;
  top: 4;
  background-color: ${color("blue")};
`

interface RadioFeedbackState {
  disabled?: boolean
  selected?: boolean
}

const radioBackgroundColor = ({ disabled, selected }: RadioFeedbackState) => {
  switch (true) {
    case disabled:
      return color("black")
    case selected:
      return color("black")
    default:
      return color("white")
  }
}

const radioBorderColor = ({ disabled, selected }: RadioFeedbackState) =>
  selected && !disabled ? color("gay") : color("black")

const RadioButton = styled(Box)<RadioToggleProps>`
  ${borders};
  ${styledSpace};
  background-color: ${radioBackgroundColor};
  border-color: ${color("gray")};
  border-width: 1;
  width: 24;
  height: 24;
  border-radius: 8;
  min-width: 24;
  min-height: 24;
`
