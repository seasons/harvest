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
  setSelected: (selected: boolean) => void
  selected: boolean
}

/**
 * A Toggle button
 */
export const Toggle: React.SFC<ToggleProps> = props => {
  const { children, disabled, onChange, selected, setSelected } = props
  const toggleSwitch = newValue => {
    setSelected(newValue)
    onChange(newValue)
  }

  return <Switch onValueChange={debounce(toggleSwitch, 100)} value={selected} />
}
