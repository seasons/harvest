import debounce from "lodash/debounce"
import React, { useState } from "react"
import { FlexProps } from "./Flex"
import { Switch } from "react-native"
import { BorderProps, SizeProps, SpaceProps } from "styled-system"

export interface ToggleProps extends FlexProps, BorderProps, SizeProps, SpaceProps {
  /** Disable interactions */
  disabled?: boolean
  /** Select the button on render. If the Toggle is inside a ToggleGroup, use ToggleGroup.defaultValue instead. */
  selected?: boolean
  /** Callback when selected */
  onSelect?: (selected: { selected: boolean; value: string }) => void
}

/**
 * A Toggle button
 */
export const Toggle: React.SFC<ToggleProps> = props => {
  const { children, disabled, onSelect: _onSelect, selected, ...others } = props
  const [value, setValue] = useState(false)
  const toggleSwitch = newValue => {
    setValue(newValue)
  }

  // Ensures that only one call to `onSelect` occurs, regardless of whether the
  // user clicks the Toggle element or the label.
  const onSelect = _onSelect && debounce(_onSelect, 0)

  return <Switch onValueChange={toggleSwitch} value={value} />
}
