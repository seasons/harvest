import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { color, space } from "App/utils"
import { useComponentSize } from "App/utils/hooks/useComponentSize"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Dimensions } from "react-native"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { ReservationFeedback_reservationFeedback } from "src/generated/ReservationFeedback"
import gql from "graphql-tag"
import { GET_RESERVATION_FEEDBACK } from "../Home"

export interface PopUpProps {
  show: boolean
  reservationFeedback: ReservationFeedback_reservationFeedback
  onSelectedRating: () => void
}

export const UPDATE_RESERVATION_FEEDBACK = gql`
  mutation UpdateReservationFeedback($id: ID!, $input: ReservationFeedbackUpdateInput!) {
    updateReservationFeedback(feedbackID: $id, input: $input) {
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
            images
            name
            retailPrice
          }
        }
      }
    }
  }
`

export const ReviewPopUp: React.FC<PopUpProps> = ({ onSelectedRating, reservationFeedback, show }) => {
  const [mounted, setMounted] = useState(false)
  const [size, onLayout] = useComponentSize()
  const height = size ? size.height + 100 : 240
  const [updateReservationFeedback] = useMutation(UPDATE_RESERVATION_FEEDBACK)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    })
  }, [])

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
  const animation = useSpring({
    translateY: show && mounted ? windowHeight - height : windowHeight,
    backgroundColor: show && mounted ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  })

  const images = reservationFeedback.feedbacks.map(feedback => feedback.variant.product.images[0].url)
  const options = ["Loved it", "It was ok", "Didn't like it"]
  const contentWidth = windowWidth - 32
  const imageHorizontalPadding = 4
  const numFeedbacks = reservationFeedback.feedbacks.length
  const imageWidth = Math.max((contentWidth - imageHorizontalPadding * (numFeedbacks - 1)) / numFeedbacks, 112)

  const onRatingButtonPressed = async (ratingIndex) => {
    let rating
    switch (ratingIndex) {
      case 0:
        rating = "Loved"
        break
      case 1:
        rating = "Ok"
        break
      default:
        rating = "Disliked"
    }
    const result = await updateReservationFeedback({
      variables: {
        id: reservationFeedback.id,
        input: { rating }
      },
      refetchQueries: [{
        query: GET_RESERVATION_FEEDBACK
      }]
    })
    if (result?.data) {
      onSelectedRating()
    }
  }

  return (
    <>
      <AnimatedPopUp style={{ transform: [{ translateY: animation.translateY }] }} color={color("white100")}>
        <Box p={2} onLayout={onLayout}>
          <Spacer mt={4} />
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
            <Sans size="2" color={color("black100")}>
              What'd you think?
            </Sans>
            <Spacer mb={1} />
            <Sans size="1" color={color("black50")}>
              Help us improve your experience by sharing what you thought of your last order
              </Sans>
            <Spacer mb={3} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center" alignItems="center">
              {images.map(image => (
                <>
                  <FadeInImage source={{ uri: image }} style={{ width: imageWidth, height: 140 }} />
                  <Spacer ml={0.5} />
                </>
              ))}
            </Flex>
            <Spacer mb={3} />
            <Separator />
            <Spacer mb={3} />
            {options.map((option, index) => (
              <>
                <Button variant="secondaryWhite" width={contentWidth} height={48} onPress={() => onRatingButtonPressed(index)}>
                  {option}
                </Button>
                <Spacer mt={1} />
              </>
            ))}
            <Spacer mb={6} />
          </Flex>
        </Box>
      </AnimatedPopUp>
      {show && <AnimatedOuterWrapper style={{ backgroundColor: animation.backgroundColor }} />}
    </>
  )
}

const OuterWrapper = styled(Box)`
  position: absolute;
  flex: 1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
`

const Container = styled(Box)`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${p => p.color};
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 100;
`

const AnimatedPopUp = animated(Container)
const AnimatedOuterWrapper = animated(OuterWrapper)
