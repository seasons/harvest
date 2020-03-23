import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { Box, Flex, ProgressBar, Sans, Spacer } from "App/Components"
import { color } from "App/utils"

export interface ReservationFeedbackHeaderProps {
  currentItem: number
  headerText: string
  progressBarCompletedPercentages: number[]
  totalNumItems: number
  onSelectedProgressBarIndex?: (number) => void
}

export const ReservationFeedbackHeader: React.FC<ReservationFeedbackHeaderProps> = ({
  currentItem,
  headerText,
  onSelectedProgressBarIndex,
  progressBarCompletedPercentages,
  totalNumItems,
}) => {
  const { width: windowWidth } = Dimensions.get("window")
  const progressBarSpacerWidth = 5
  const contentWidth = windowWidth - 32
  const progressBarWidth = (contentWidth / totalNumItems) - progressBarSpacerWidth * (totalNumItems - 1)
  return (
    <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" >
        <Sans size="1" color={color("black100")}>
          {headerText}
        </Sans>
        <Sans size="1" color={color("black50")}>
          Item {currentItem} of {totalNumItems}
        </Sans>
      </Flex>
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" >
        {progressBarCompletedPercentages.map((progressBarCompletedPercentage, index) =>
          <TouchableWithoutFeedback onPress={() => {
            if (onSelectedProgressBarIndex) { onSelectedProgressBarIndex(index) }
          }}>
            <Box>
              <Spacer mt={1} />
              <ProgressBar width={progressBarWidth} percentCompleted={progressBarCompletedPercentage} />
              <Spacer mb={3} />
            </Box>
          </TouchableWithoutFeedback>
        )}
      </Flex>
    </Flex>
  )
}