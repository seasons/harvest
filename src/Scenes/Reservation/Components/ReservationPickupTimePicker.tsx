import { Box, Button, Spacer } from "App/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import DatePicker from "react-native-date-picker"
import styled from "styled-components/native"

export const ReservationPickupTimePicker = ({ timeWindows, onTimeWindowSelected }) => {
  const [selectedTime, setSelectedTime] = useState(null)
  const [date, setDate] = useState(new Date())
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const currentHour = new Date().getHours()

  const luxonDate = DateTime.fromJSDate(date)
  const isToday = luxonDate.hasSame(DateTime.local(), "day")

  return (
    <Box mt={3}>
      <Box px={2}>
        <SectionHeader
          title="Select pick-up window"
          rightText={isToday ? "Today" : luxonDate.toFormat("EEE MMM, d")}
          onPressRightText={() => {
            setOpenDatePicker(true)
          }}
        />
      </Box>
      <Spacer mt={2} />
      <Box pl={2}>
        <Root showsHorizontalScrollIndicator={false} horizontal>
          {timeWindows?.map((timeWindow, index) => {
            return (
              <Box key={index} mr={1}>
                <Button
                  variant="tertiaryWhite"
                  onPress={() => {
                    setSelectedTime(index)
                    onTimeWindowSelected?.({
                      date,
                      timeWindow,
                    })
                  }}
                  selected={index === selectedTime}
                  disabled={isToday ? timeWindow.startTime < currentHour : false}
                >
                  {timeWindow.display}
                </Button>
              </Box>
            )
          })}
        </Root>
      </Box>
      <DatePicker
        modal
        mode="date"
        minimumDate={DateTime.local().toJSDate()}
        maximumDate={DateTime.local().plus({ days: 7 }).toJSDate()}
        open={openDatePicker}
        date={date}
        onDateChange={() => null}
        onConfirm={(newDate) => {
          const weekDay = DateTime.fromJSDate(newDate).weekday
          setOpenDatePicker(false)

          if (weekDay === 6 || weekDay === 7) {
            showPopUp({
              title: "Sorry",
              note: "We're not open on weekends",
              buttonText: "OK",
              onClose: () => {
                hidePopUp()
                setOpenDatePicker(true)
              },
            })
          } else {
            setDate(newDate)
          }
        }}
        onCancel={() => {
          setOpenDatePicker(false)
        }}
      />
    </Box>
  )
}

const Root = styled(ScrollView)`
  border-style: solid;
`
