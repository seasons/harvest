import { CustomPopUp } from "App/Components/CustomPopUp"
import { Box, Flex, Sans } from "App/Components"
import { color } from "App/utils/color"
import { DownChevronIcon } from "Assets/icons/DownChevronIcon"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"

interface Value {
    display: string
    value: any
}

interface BoxPickerProps {
    currentValue?: Value
    height?: number | string
    inputKey?: string
    onChange: (value: Value, inputKey?: string) => void
    title: string
    values: Value[]
    width?: number | string
}

export const BoxPicker: React.FC<BoxPickerProps> = ({
    currentValue,
    height = 48,
    inputKey,
    onChange,
    title,
    values,
    width,
}) => {
    const [showPopUp, setShowPopUp] = useState(false)
    const [spinnerValue, setSpinnerValue] = useState(null)

    return (
        <Box>
            <TouchableOpacity onPress={() => setShowPopUp(true)}>
                <Box height={height} width={width} style={{ backgroundColor: color("black04"), flex: width ? 0 : 1, padding: 12, borderRadius: 4 }}>
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="center" style={{ flex: 1 }}>
                        <Sans size="2">
                            {currentValue?.display || "Select"}
                        </Sans>
                        <DownChevronIcon scale={1.5} color="gray" />
                    </Flex>
                </Box>
            </TouchableOpacity>

            <CustomPopUp
                buttonText="Done"
                onRequestClose={() => {
                    setShowPopUp(false)
                    onChange(spinnerValue, inputKey)
                }}
                title={title}
                visible={showPopUp}
            >

            </CustomPopUp>
        </Box>
    )
}