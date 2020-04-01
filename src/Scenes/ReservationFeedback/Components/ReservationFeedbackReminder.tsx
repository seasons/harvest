import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Box, Separator } from "App/Components"
import { useTracking, Schema } from "App/utils/track"
import { ReservationFeedbackHeader } from "./ReservationFeedbackHeader"
import { ReservationFeedback_reservationFeedback } from "src/generated/ReservationFeedback"

export interface ReservationFeedbackHeaderProps {
  reservationFeedback: ReservationFeedback_reservationFeedback
  onPress: () => void
}

export const ReservationFeedbackReminder: React.FC<ReservationFeedbackHeaderProps> = ({
  onPress,
  reservationFeedback,
}) => {
  const tracking = useTracking()
  const { feedbacks } = reservationFeedback
  const incompleteFeedbackIndex = feedbacks.findIndex(feedback => !feedback.isCompleted)
  const currentItem = incompleteFeedbackIndex === -1 ? feedbacks.length : incompleteFeedbackIndex + 1
  return (
    <>
      <Separator color="black" />
      <TouchableWithoutFeedback onPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ReservationFeedbackHeaderTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        onPress()
      }}>
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