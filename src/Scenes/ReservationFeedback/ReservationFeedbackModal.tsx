import { useMutation, useQuery } from "@apollo/client"
import React, { useRef, useState } from "react"
import { Dimensions, ScrollView, Text, TouchableWithoutFeedback } from "react-native"

import { Box, Button, Flex, Handle, Sans, Separator, Spacer } from "App/Components"
import { Schema } from "App/Navigation"
import { ImageRail } from "App/Scenes/Product/Components"
import { color } from "App/utils"
import gql from "graphql-tag"
import { screenTrack, useTracking, Schema as TrackingSchema } from "App/utils/track"
import { ReservationFeedbackHeader } from "./Components"
import { Container } from "Components/Container"
import { UPDATE_RESERVATION_FEEDBACK } from "./Components/ReservationFeedbackPopUp"
import {
  ReservationFeedback_reservationFeedback_feedbacks,
  ReservationFeedback_reservationFeedback_feedbacks_questions,
} from "src/generated/ReservationFeedback"
import { ReservationFeedback } from "./ReservationFeedback"

const windowWidth = Dimensions.get("window").width

export const ReservationFeedback_Query = gql`
  query ReservationFeedback_Query {
    reservationFeedback {
      id
      comment
      rating
      feedbacks {
        id
        isCompleted
        questions {
          id
          options
          question
          responses
          type
        }
        variant {
          id
          product {
            id
            name
            retailPrice
            brand {
              id
              name
            }
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
    }
  }
`

export const ReservationFeedbackModal: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const { loading, error, previousData, data = previousData, refetch, fetchMore } = useQuery(ReservationFeedback_Query)
  const horizontalFlatListRef = useRef(null)
  const feedbacks = data?.reservationFeedback?.feedbacks
  const incompleteFeedbackIndex = feedbacks?.findIndex((feedback) => !feedback.isCompleted)

  const [currFeedbackIndex, setCurrFeedbackIndex] = useState(
    incompleteFeedbackIndex === -1 ? feedbacks.length - 1 : incompleteFeedbackIndex
  )

  const incompleteFeedback = feedbacks[currFeedbackIndex]
  const currFeedback: ReservationFeedback_reservationFeedback_feedbacks = feedbacks?.[currFeedbackIndex]
  const { variant: currVariant, questions: currQuestions } = currFeedback
  const { product: currProduct } = currVariant
  const {
    images,
    name: productName,
    brand: { name: brandName },
  } = currProduct

  const changeToFeedbackIndex = (index: number) => {
    setCurrFeedbackIndex(index)
    horizontalFlatListRef?.current?.scrollToIndex({ index })
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <ScrollView>
        <Box px={2} width={windowWidth}>
          <Spacer mb={2} />
          <Handle backgroundColor="black10" />
          <Spacer mb={5} />
          <Sans size="5">Rate & review your return</Sans>
          <Spacer mb={1} />
          <Sans size="4" color="black50">
            Earn rewards & help us improve your experience by sharing feedback on your last order.
          </Sans>
          <Spacer mb={3} />
          <Sans size="4" color="black50">
            {`${currFeedbackIndex + 1} of ${feedbacks.length} items`}
          </Sans>
          <Spacer mb={0.5} />
          <ImageRail height={200} images={images} imageWidth={161} showPageDots={false} />
          <Sans size="2" color="black50">
            {brandName}
          </Sans>
          <Sans size="2" color="black50">
            {productName}
          </Sans>
        </Box>
      </ScrollView>
    </Container>
  )
})
