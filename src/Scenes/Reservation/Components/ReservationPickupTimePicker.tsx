import { Box, Button, Spacer } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import styled from "styled-components/native"

export const ReservationPickupTimePicker = ({ timeWindows, onTimeWindowSelected }) => {
  const [selectedTime, setSelectedTime] = useState(0)
  const currentHour = new Date().getHours()

  return (
    <Box mt={3}>
      <SectionHeader title="Select pick-up window" />
      <Spacer mt={2} />
      <Root showsHorizontalScrollIndicator={false} horizontal>
        {timeWindows?.map((timeWindow, index) => {
          return (
            <Box key={index} mr={1}>
              <Button
                variant="secondaryWhite"
                onPress={() => {
                  setSelectedTime(index)
                  onTimeWindowSelected?.(timeWindow)
                }}
                selected={index === selectedTime}
                disabled={timeWindow.startTime < currentHour}
              >
                {timeWindow.display}
              </Button>
            </Box>
          )
        })}
      </Root>
    </Box>
  )
}

const Root = styled(ScrollView)`
  border-style: solid;
`
