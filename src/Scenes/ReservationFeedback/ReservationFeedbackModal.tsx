import { useMutation, useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Dimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import { RatingSlider } from "./Components/RatingSlider"
import { Box, Button, Flex, Sans, Spacer, TextInput } from "App/Components"
import debounce from "lodash/debounce"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ImageRail } from "App/Scenes/Product/Components"
import { color } from "App/utils"
import styled from "styled-components/native"
import gql from "graphql-tag"
import { screenTrack, useTracking, Schema as TrackingSchema } from "App/utils/track"
import { Container } from "Components/Container"
import { ReservationFeedback_reservationFeedback_feedbacks } from "src/generated/ReservationFeedback"
import { MultiSelectionTable } from "App/Components/MultiSelectionTable"
import { space } from "@seasons/eclipse"
import { ReservationFeedbackHeader } from "./Components/ReservationFeedbackHeader"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { UPDATE_PRODUCT_RESERVATION_FEEDBACK } from "./mutations"
import { Loader } from "App/Components/Loader"

const windowWidth = Dimensions.get("window").width

export const ReservationFeedback_Query = gql`
  query ReservationFeedback_Query {
    reservationFeedback {
      id
      feedbacks {
        id
        isCompleted
        review
        rating
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

export interface ReservationFeedbackViewState {
  sliderMoved: boolean
  responses: any
  ratingValue: number | null
  comment: string
}

export const ReservationFeedbackModal: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const emptyViewState = {
    sliderMoved: false,
    responses: {},
    ratingValue: null,
    comment: "",
  }
  const insets = useSafeAreaInsets()
  const tracking = useTracking()
  const [viewState, setViewState] = useState<ReservationFeedbackViewState[]>([emptyViewState])
  const [updateProductReservationFeedback] = useMutation(UPDATE_PRODUCT_RESERVATION_FEEDBACK)
  const { previousData, data = previousData } = useQuery(ReservationFeedback_Query)

  const feedbacks = data?.reservationFeedback?.feedbacks
  const [currFeedbackIndex, setCurrFeedbackIndex] = useState(-1)

  useEffect(() => {
    if (currFeedbackIndex === -1 && feedbacks?.length) {
      const incompleteFeedbackIndex = feedbacks?.findIndex((feedback) => !feedback.isCompleted)
      setViewState(feedbacks.map((f) => emptyViewState))
      setCurrFeedbackIndex(incompleteFeedbackIndex === -1 ? feedbacks.length - 1 : incompleteFeedbackIndex)
    }
  }, [feedbacks, setCurrFeedbackIndex, setViewState])

  const currFeedback: ReservationFeedback_reservationFeedback_feedbacks = feedbacks?.[currFeedbackIndex]
  const currViewState = viewState[currFeedbackIndex]

  if (!currFeedback || currFeedbackIndex === -1 || !currViewState) {
    return <Loader />
  }

  const { variant: currVariant, questions: currQuestions } = currFeedback
  const { product: currProduct } = currVariant
  const {
    images,
    name: productName,
    brand: { name: brandName },
  } = currProduct
  const onLastItem = currFeedbackIndex + 1 === feedbacks?.length

  const handleOnSubmit = () => {
    updateProductReservationFeedback({
      variables: {
        productReservationID: currFeedback.id,
        responses: currViewState.responses,
        input: {
          isCompleted: true,
          rating: currViewState.ratingValue,
          review: currViewState.comment,
        },
      },
    })
    if (onLastItem) {
      navigation.goBack()
    } else {
      setViewState([...viewState, emptyViewState])
      setCurrFeedbackIndex(currFeedbackIndex + 1)
    }
  }

  const handleLeftButton = () => {
    if (currFeedbackIndex === 0) {
      navigation.goBack()
    } else if (currFeedbackIndex > 0) {
      setCurrFeedbackIndex(currFeedbackIndex - 1)
    }
  }

  const buttonEnabled =
    Object.keys(currViewState.responses).length === currQuestions.length && currViewState.sliderMoved

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <ScrollView>
        <Box px={2} width={windowWidth}>
          <ReservationFeedbackHeader />
          <Spacer mb={3} />
          <Sans size="3">{`${currFeedbackIndex + 1} of ${feedbacks.length} items`}</Sans>
          <Spacer mb={0.5} />
          <ImageRail height={200} images={images} imageWidth={161} showPageDots={false} />
          <Spacer mb={0.5} />
          <Sans size="3">{brandName}</Sans>
          <Sans size="3" color="black50">
            {productName}
          </Sans>
          <Spacer mb={4} />
          {currQuestions?.map((question) => {
            console.log("question", question)
            const optionsCount = question.options.length
            const itemWidth =
              optionsCount > 3
                ? (windowWidth - space(4) - space(1) * 2) / 2
                : (windowWidth - space(4) - space(1) * optionsCount) / optionsCount

            return (
              <Box key={question.id}>
                <Sans size="4">{question.question}</Sans>
                <Spacer mb={1} />
                <MultiSelectionTable
                  itemWidth={itemWidth}
                  variant="grayBackground"
                  size="3"
                  padding="4px"
                  items={question.options.map((q) => ({ label: q, value: q }))}
                  onTap={(item) => {
                    tracking.trackEvent({
                      actionName: TrackingSchema.ActionNames.ReservationFeedbackOptionButtonTapped,
                      actionType: TrackingSchema.ActionTypes.Tap,
                      question: question.id,
                      value: item.value,
                    })
                    const viewStateCopy = [...viewState]
                    const currentStateCopy = { ...viewStateCopy[currFeedbackIndex] }
                    currentStateCopy.responses = {
                      ...currViewState.responses,
                      [question.id]: currentStateCopy.responses[question.id] === item.value ? null : item.value,
                    }
                    viewStateCopy[currFeedbackIndex] = currentStateCopy
                    setViewState(viewStateCopy)
                  }}
                  selectedItems={[currViewState.responses[question.id]]}
                />

                <Spacer mb={5} />
              </Box>
            )
          })}
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="4">How would you rate it?</Sans>
            {currViewState.sliderMoved && <Sans size="4">{currViewState.ratingValue} ⭐️</Sans>}
          </Flex>
          <Spacer mb={1} />
          <RatingSlider viewState={viewState} setViewState={setViewState} currFeedbackIndex={currFeedbackIndex} />
          <Spacer mb={5} />
          <Sans size="4">Add a review?</Sans>
          <Spacer mb={1} />
          <CommentWrapper p={2}>
            <TextInput
              autoCapitalize="sentences"
              autoFocus
              hideBottomBar
              blurOnSubmit={false}
              currentValue={currViewState.comment}
              style={{ height: 139, paddingLeft: 0, paddingTop: 0, borderWidth: 0 }}
              placeholder="Example: there was a missing button..."
              multiline={true}
              onChangeText={(_, val) => {
                const viewStateCopy = [...viewState]
                const currentStateCopy = { ...viewStateCopy[currFeedbackIndex] }
                currentStateCopy.comment = val
                viewStateCopy[currFeedbackIndex] = currentStateCopy
                setViewState(viewStateCopy)
              }}
            />
          </CommentWrapper>
          <Spacer pb={160} />
        </Box>
      </ScrollView>

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={insets.bottom - 16}>
        <Box width="100%" style={{ position: "relative" }}>
          <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
            <Flex p={2} flexDirection="row">
              <Box style={{ flex: 1 }}>
                <Button block onPress={debounce(handleLeftButton, 250)} size="large" variant="primaryWhite">
                  {currFeedbackIndex === 0 ? "Finish later" : "Previous"}
                </Button>
              </Box>
              <Spacer mr={1} />
              <Box style={{ flex: 1 }}>
                <Button
                  block
                  disabled={!buttonEnabled}
                  onPress={debounce(handleOnSubmit, 250)}
                  size="large"
                  variant="primaryBlack"
                >
                  {onLastItem ? "Submit" : "Next"}
                </Button>
              </Box>
            </Flex>
            <Spacer height={insets.bottom + 8} />
          </FadeBottom2>
        </Box>
      </KeyboardAvoidingView>
    </Container>
  )
})

const CommentWrapper = styled(Box)`
  border-width: 1px;
  border-radius: 4px;
  border-color: ${color("black04")};
  position: relative;
`
