import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { Box, Flex, ProgressBar, Sans, Spacer, Separator } from "App/Components"
import { color } from "App/utils"
import { ReservationFeedback_reservationFeedback, ReservationFeedback_reservationFeedback_feedbacks } from "src/generated/ReservationFeedback"
import { ReservationFeedbackHeader } from "./ReservationFeedbackHeader"

export interface ReservationFeedbackHeaderProps {
  reservationFeedback: ReservationFeedback_reservationFeedback
  onPress: () => void
}

export const ReservationFeedbackReminder: React.FC<ReservationFeedbackHeaderProps> = ({
  onPress,
  reservationFeedback,
}) => {
  const { feedbacks } = reservationFeedback
  const incompleteFeedbackIndex = feedbacks.findIndex(feedback => !feedback.isCompleted)
  const currentItem = incompleteFeedbackIndex === -1 ? feedbacks.length : incompleteFeedbackIndex + 1
  console.log("HEREEEE")
  return (
    <>
      <Separator color="black" />
      <TouchableWithoutFeedback onPress={onPress}>
        <Box px={2} style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <ReservationFeedbackHeader
            currentItem={currentItem}
            headerText="Continue reviewing"
            reservationFeedback={reservationFeedback}
          />
        </Box>
      </TouchableWithoutFeedback>
    </>
  )
}