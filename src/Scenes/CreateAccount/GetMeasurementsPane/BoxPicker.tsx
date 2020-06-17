import { CustomPopUp } from "App/Components/CustomPopUp"
import { Box, Flex, Sans } from "App/Components"
import { color } from "App/utils/color"
import { DownChevronIcon } from "Assets/icons/DownChevronIcon"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import { Picker } from "@react-native-community/picker"

export interface Item {
    label: string
    value: any
}

export interface BoxPickerProps {
    currentItem?: Item
    height?: number | string
    inputKey?: string
    onChange: (value: Item, inputKey?: string) => void
    title: string
    items: Item[]
    width?: number | string
}

export const BoxPicker: React.FC<BoxPickerProps> = ({
    currentItem,
    height = 48,
    inputKey,
    onChange,
    title,
    items,
    width,
}) => {
    const [showPopUp, setShowPopUp] = useState(false)
    const currentItemIndex = currentItem
        ? items.findIndex((item,) => item.value === currentItem.value) || 0
        : 0
    const [spinnerIndex, setSpinnerIndex] = useState(currentItemIndex)

    return (
        <Box>
            <TouchableOpacity onPress={() => setShowPopUp(true)}>
                <Box height={height} width={width} style={{ backgroundColor: color("black04"), flex: width ? 0 : 1, padding: 12, borderRadius: 4 }}>
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="center" style={{ flex: 1 }}>
                        <Sans size="2">
                            {currentItem?.label || "Select"}
                        </Sans>
                        <DownChevronIcon scale={1.5} color="gray" />
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
                <Picker
                    selectedValue={spinnerIndex}
                    onValueChange={(_, itemIndex) => setSpinnerIndex(itemIndex)}
                >
                    {items.map((item, index) => <Picker.Item key={item.value} label={item.label} value={index} />)}
                </Picker>
            </CustomPopUp>
        </Box>
    )
}