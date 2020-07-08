import { CustomPopUp } from "App/Components"
import React, { useState } from "react"
import { Picker } from "@react-native-community/picker"

export interface StatePickerPopupProps {
  initialState?: string
  onRequestClose: (state: string) => void
  visible: boolean
}

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

export const StatePickerPopUp: React.FC<StatePickerPopupProps> = ({ initialState, onRequestClose, visible }) => {
  const initialIndex = initialState ? Math.max(0, states.indexOf(initialState)) : 0
  const [spinnerIndex, setSpinnerIndex] = useState(initialIndex)

  return (
    <CustomPopUp
      buttonText="Done"
      onRequestClose={() => onRequestClose(states[spinnerIndex])}
      title="State"
      visible={visible}
    >
      <Picker selectedValue={spinnerIndex} onValueChange={(_, itemIndex) => setSpinnerIndex(itemIndex)}>
        {states.map((state, index) => (
          <Picker.Item key={state} label={state} value={index} />
        ))}
      </Picker>
    </CustomPopUp>
  )
}
