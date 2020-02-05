import debounce from "lodash/debounce"
import React from "react"
import styled from "styled-components/native"
import { Flex, FlexProps } from "./Flex"
import { color, space } from "App/Utils"

import { BorderProps, borders, SizeProps, space as styledSpace, SpaceProps } from "styled-system"
import { Box, Sans } from "App/Components"
import { TouchableWithoutFeedback } from "react-native"

/**
 * Spec: zpl.io/bAvnwlB
 */

export interface RadioProps extends FlexProps {
  /** The border radius of the radio button */
  borderRadius?: number
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

export interface RadioToggleProps extends RadioProps, BorderProps, SizeProps, SpaceProps { }

/**
 * A Radio button
 *
 * Spec: zpl.io/bAvnwlB
 */
export const Radio: React.SFC<RadioProps> = props => {
  let {
    borderRadius,
    children,
    disabled,
    name,
    onSelect: _onSelect,
    selected,
    value,
    label,
    ...others
  } = props
  borderRadius = borderRadius ?? 100

  // Ensures that only one call to `onSelect` occurs, regardless of whether the
  // user clicks the radio element or the label.
  const onSelect = _onSelect && debounce(_onSelect, 0)

  const innerComponent = children || <InnerCircle />

  return (
    <Flex flexDirection="row" alignItems="center">
      <TouchableWithoutFeedback onPress={() => !disabled && onSelect && onSelect({ selected: !selected, value })}>
        <Container disabled={disabled} alignItems="center" selected={selected} {...others}>
          <RadioButton role="presentation" border={1} borderRadius={borderRadius} mr={1} selected={selected} disabled={disabled}>
            {selected && innerComponent}
          </RadioButton>
        </Container>
      </TouchableWithoutFeedback>
      {!!label && (
        <Flex flexDirection="row" alignItems="center" ml={1}>
          <Sans size="2" color={color("black100")}>
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
export const BorderedRadio = styled(Box) <RadioProps>`
  padding: ${space(2)}px;
  border: 1px solid ${color("black85")};
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

const Container = styled(Flex) <ContainerProps>`
  align-items: flex-start;
`

const InnerCircle = styled(Box)`
  width: 14;
  height: 14;
  border-radius: 100;
  background-color: ${color("blue")};
`

const RadioButton = styled(Box) <RadioToggleProps>`
  ${borders};
  ${styledSpace};
  border-color: ${color("black85")};
  border-width: 1;
  width: 24;
  height: 24;
  min-width: 24;
  min-height: 24;
  justify-content: center;
  align-items: center;
`
