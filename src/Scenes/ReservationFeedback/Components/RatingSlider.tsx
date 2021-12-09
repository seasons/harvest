import React from "react"
import Slider from "@react-native-community/slider"
import { color } from "App/utils/color"
import { ReservationFeedbackViewState } from "../ReservationFeedbackModal"

const thumbImage = require(`../../../../assets/images/sliderThumb.png`)

interface Props {
  setViewState: (v: ReservationFeedbackViewState[]) => void
  viewState: ReservationFeedbackViewState[]
  currFeedbackIndex: number
}

export const RatingSlider: React.FC<Props> = ({ setViewState, viewState, currFeedbackIndex }) => {
  const sliderMoved = viewState[currFeedbackIndex].sliderMoved
  const value = viewState[currFeedbackIndex].ratingValue === null ? 0 : viewState[currFeedbackIndex].ratingValue
  return (
    <Slider
      style={{ width: "100%", height: 40 }}
      minimumValue={0}
      maximumValue={5}
      thumbImage={thumbImage}
      minimumTrackTintColor={color("black100")}
      step={0.5}
      value={value}
      maximumTrackTintColor={color("black10")}
      onValueChange={(v) => {
        const viewStateCopy = [...viewState]
        const currentStateCopy = { ...viewStateCopy[currFeedbackIndex] }
        currentStateCopy.ratingValue = v

        if (!sliderMoved) {
          currentStateCopy.sliderMoved = true
        }
        viewStateCopy[currFeedbackIndex] = currentStateCopy
        setViewState(viewStateCopy)
      }}
    />
  )
}
