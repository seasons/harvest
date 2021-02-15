import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { Box, Flex, ProgressBar, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { useTracking, Schema } from "App/utils/track"
import { ReservationFeedback_reservationFeedback } from "src/generated/ReservationFeedback"

export interface ReservationFeedbackHeaderProps {
  currentItem: number
  headerText: string
  reservationFeedback: ReservationFeedback_reservationFeedback
  onSelectedProgressBarIndex?: (number) => void
}

export const ReservationFeedbackHeader: React.FC<ReservationFeedbackHeaderProps> = ({
  currentItem,
  headerText,
  onSelectedProgressBarIndex,
  reservationFeedback,
}) => {
  const tracking = useTracking()
  const { feedbacks } = reservationFeedback
  const progressBarCompletedPercentages = feedbacks.map((feedback) => {
    const { questions } = feedback
    const numResponses = questions.filter((question) => question.responses.length > 0).length
    const numQuestions = questions.length
    return numResponses / numQuestions
  })
  const totalNumItems = feedbacks.length
  const { width: windowWidth } = Dimensions.get("window")
  const progressBarSpacerWidth = 5
  const contentWidth = windowWidth - 32
  const progressBarWidth = contentWidth / totalNumItems - progressBarSpacerWidth * (totalNumItems - 1)
  return (
    <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center">
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        <Sans size="4" color={color("black100")}>
          {headerText}
        </Sans>
        <Sans size="4" color={color("black50")}>
          Item {currentItem} of {totalNumItems}
        </Sans>
      </Flex>
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        {progressBarCompletedPercentages.map((progressBarCompletedPercentage, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.ReservationFeedbackHeaderProgressBarTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              if (onSelectedProgressBarIndex) {
                onSelectedProgressBarIndex(index)
              }
            }}
          >
            <Box>
              <Spacer mt={1} />
              <ProgressBar width={progressBarWidth} percentCompleted={progressBarCompletedPercentage} />
              <Spacer mb={3} />
            </Box>
          </TouchableWithoutFeedback>
        ))}
      </Flex>
    </Flex>
  )
}
