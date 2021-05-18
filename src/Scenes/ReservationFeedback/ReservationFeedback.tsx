import { useMutation, useQuery } from "@apollo/client"
import React, { useRef, useState } from "react"
import { Dimensions, FlatList, Text, TouchableWithoutFeedback } from "react-native"

import { Box, Button, Flex, Handle, Sans, Separator, Spacer } from "App/Components"

export const ReservationFeedback: React.FC<{
  changeToFeedbackIndex: (index: number) => void
  feedback: any
}> = ({ changeToFeedbackIndex, feedback }) => {
  console.log("feedback", feedback)
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={() => <></>}
      horizontal
      scrollEnabled={false}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <></>}
    />
  )
}
