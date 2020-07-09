import { CustomPopUp } from "App/Components"
import React, { useMemo, useState } from "react"
import DateTimePicker from "@react-native-community/datetimepicker"

export interface DatePickerPopUpProps {
  onDateChange: (date: Date) => void
  onRequestClose: () => void
  visible: boolean
}

export const DatePickerPopUp: React.FC<DatePickerPopUpProps> = ({ onDateChange, onRequestClose, visible }) => {
  // Issues:
  //  1. A bug in `DateTimePicker`, where the picker will occassionally spin back to its original state upon
  //     re-rendering.
  //  2. Extracting state tracking from this component causes the state to reset across renders.
  //  3. Cannot send the current date in `onRequestClose` because `useMemo` prevents updates to props.
  // Solutions:
  //  1. `useMemo` to render only when `visible` changes.
  //  2. The `date` state hook is used only to ensure that the final picker state of one render is the initial
  //     picker state of the next render.
  //  3. Listeners are notified in real time with `onDateChange`.

  const [date, setDate] = useState(new Date())
  const minDate = new Date(1900, 0, 1)
  const maxDate = new Date()

  return useMemo(
    () => (
      <CustomPopUp buttonText="Done" onRequestClose={onRequestClose} title="Date of Birth" visible={visible}>
        <DateTimePicker
          maximumDate={maxDate}
          minimumDate={minDate}
          mode="date"
          onChange={(_, date) => {
            onDateChange(date)
            setDate(date)
          }}
          value={date}
        />
      </CustomPopUp>
    ),
    [visible]
  )
}
