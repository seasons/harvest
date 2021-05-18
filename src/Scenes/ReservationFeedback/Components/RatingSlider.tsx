import { Sans, Flex, Box, SansSize } from "App/Components"
import React from "react"
import Slider from "@react-native-community/slider"
import { color } from "App/utils/color"

interface Props {}

export const RatingSlider: React.FC<Props> = ({}) => {
  return (
    <Slider
      style={{ width: "100%", height: 40 }}
      minimumValue={0}
      maximumValue={5}
      step={0.5}
      thumbTintColor={color("black100")}
      minimumTrackTintColor={color("black04")}
      maximumTrackTintColor={color("black04")}
      value={0}
    />
  )
}
