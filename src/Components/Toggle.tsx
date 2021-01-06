import debounce from "lodash/debounce"
import React from "react"
import { FlexProps } from "./Flex"
import { Switch } from "react-native"
import { BorderProps, SizeProps, SpaceProps } from "styled-system"
import { color } from "App/utils/color"

export interface ToggleProps extends FlexProps, BorderProps, SizeProps, SpaceProps {
  /** Disable interactions */
  disabled?: boolean
  /** Callback when selected */
  onChange: (selected: boolean) => void
  selected: boolean
}

/**
 * A Toggle button
 */
export const Toggle: React.SFC<ToggleProps> = ({ disabled, onChange, selected }) => {
  const toggleSwitch = (newValue) => {
    onChange(newValue)
  }

  return (
    <Switch
      trackColor={{ true: color("black100"), false: color("black25") }}
      disabled={disabled}
      onValueChange={debounce(toggleSwitch, 250)}
      value={selected}
    />
  )
}
