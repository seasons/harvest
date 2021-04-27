import { CustomPopUp } from "App/Components/CustomPopUp"
import { Box, Flex, Sans } from "App/Components"
import { color } from "App/utils/color"
import { DownChevronIcon } from "Assets/icons/DownChevronIcon"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import { Picker } from "@react-native-community/picker"
import Item from "./Item"

export interface BoxPickerProps {
  currentItem?: Item
  height?: number | string
  inputKey?: string
  onChange: (value: Item, inputKey?: string) => void
  title: string
  items: Item[]
  width?: number | string
  style?: "default" | "linePicker"
}

export const BoxPicker: React.FC<BoxPickerProps> = ({
  currentItem,
  height = 48,
  inputKey,
  onChange,
  title,
  items,
  width,
  style = "default",
}) => {
  const [showPopUp, setShowPopUp] = useState(false)
  const currentItemIndex = currentItem ? items.findIndex((item) => item.value === currentItem.value) || 0 : 0
  const [spinnerIndex, setSpinnerIndex] = useState(currentItemIndex)

  let boxStyle = { borderRadius: 4, flex: width ? 0 : 1, borderColor: color("black10") } as any
  if (style === "default") {
    boxStyle = { ...boxStyle, borderWidth: 1, padding: 12 }
  } else if (style === "linePicker") {
    boxStyle = { ...boxStyle, borderBottomWidth: 1 }
  }
  return (
    <Box>
      <TouchableOpacity onPress={() => setShowPopUp(true)} style={{ padding: 0 }}>
        <Box height={height} width={width} style={boxStyle}>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center" style={{ flex: 1 }}>
            <Sans size="4">{currentItem?.label || "Select"}</Sans>
            <DownChevronIcon scale={1.2} color="black10" />
          </Flex>
        </Box>
      </TouchableOpacity>

      <CustomPopUp
        buttonText="Done"
        onRequestClose={() => {
          setShowPopUp(false)
          onChange(items[spinnerIndex], inputKey)
        }}
        title={title}
        visible={showPopUp}
      >
        <Picker selectedValue={spinnerIndex} onValueChange={(_, itemIndex) => setSpinnerIndex(itemIndex)}>
          {items.map((item, index) => (
            <Picker.Item key={item.value} label={item.label} value={index} />
          ))}
        </Picker>
      </CustomPopUp>
    </Box>
  )
}
