import { CustomPopUp } from "App/Components"
import React, { useState } from "react"
import DateTimePicker from "@react-native-community/datetimepicker"

export interface DatePickerPopUpProps {
    onRequestClose: (DatePickerData) => void
    visible: boolean
}

export const DatePickerPopUp: React.FC<DatePickerPopUpProps> = ({
    onRequestClose,
    visible,
}) => {
    const [date, setDate] = useState(new Date())
    const minDate = new Date(1900, 0, 1)
    const maxDate = new Date()

    return (<CustomPopUp
        buttonText="Done"
        onRequestClose={() => onRequestClose(date)}
        title="Date of Birth"
        visible={visible}
    >
        <DateTimePicker
            mode="date"
            value={date}
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={(_, date) => setDate(date)}
        />
    </CustomPopUp>)
}