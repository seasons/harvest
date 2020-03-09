import debounce from "lodash/debounce"
import React, { useState } from "react"
import { FlexProps } from "./Flex"
import { Switch } from "react-native"
import { BorderProps, SizeProps, SpaceProps } from "styled-system"

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
  const toggleSwitch = newValue => {
    onChange(newValue)
  }

  return <Switch disabled={disabled} onValueChange={debounce(toggleSwitch, 250)} value={selected} />
}
