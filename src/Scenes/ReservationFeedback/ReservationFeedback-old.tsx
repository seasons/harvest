import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Dimensions, FlatList, Text, TouchableWithoutFeedback } from "react-native"

import { Box, Button, Flex, Handle, Sans, Separator, Spacer } from "App/Components"
import { Schema } from "App/Navigation"
import { ImageRail } from "App/Scenes/Product/Components"
import { color } from "App/utils"
import { screenTrack, useTracking, Schema as TrackingSchema } from "App/utils/track"
import { ReservationFeedbackHeader } from "./Components"
import { Container } from "Components/Container"
import { UPDATE_RESERVATION_FEEDBACK } from "./Components/ReservationFeedbackPopUp"
import {
  ReservationFeedback_reservationFeedback_feedbacks,
  ReservationFeedback_reservationFeedback_feedbacks_questions,
} from "src/generated/ReservationFeedback"

export const ReservationFeedback: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()
  const [reservationFeedback, setReservationFeedback] = useState(route?.params?.reservationFeedback)
  const { feedbacks } = reservationFeedback

  const incompleteFeedbackIndex = reservationFeedback.feedbacks.findIndex((feedback) => !feedback.isCompleted)
  const [currFeedbackIndex, setCurrFeedbackIndex] = useState(
    incompleteFeedbackIndex === -1 ? feedbacks.length - 1 : incompleteFeedbackIndex
  )

  const incompleteFeedback = feedbacks[currFeedbackIndex]
  const incompleteQuestionIndex = incompleteFeedback.questions.findIndex((question) => question.responses.length === 0)
  const [currQuestionIndex, setCurrQuestionIndex] = useState(
    incompleteQuestionIndex === -1 ? incompleteFeedback.questions.length - 1 : incompleteQuestionIndex
  )

  const [flatListRef, setFlatListRef] = useState(null)
  const [updateReservationFeedback] = useMutation(UPDATE_RESERVATION_FEEDBACK)

  const changeToFeedbackIndex = (index) => {
    setCurrFeedbackIndex(index)
    setCurrQuestionIndex(0)
    flatListRef.scrollToIndex({ index: 0 })
  }

  const renderItem = (feedbackQuestion: ReservationFeedback_reservationFeedback_feedbacks_questions, index) => {
    const { id: feedbackQuestionID, question, options, responses } = feedbackQuestion
    const currFeedback: ReservationFeedback_reservationFeedback_feedbacks =
      reservationFeedback.feedbacks[currFeedbackIndex]
    const { questions: currQuestions } = currFeedback
    const onOptionPressed = async (option) => {
      tracking.trackEvent({
        actionName: TrackingSchema.ActionNames.ReservationFeedbackOptionButtonTapped,
        actionType: TrackingSchema.ActionTypes.Tap,
      })
      feedbackQuestion.responses = [option]
      const unansweredFeedbackQuestions = currQuestions.filter((question) => question.responses.length === 0)
      const feedbackIsCompleted =
        (unansweredFeedbackQuestions.length === 1 && unansweredFeedbackQuestions[0].id === feedbackQuestionID) ||
        unansweredFeedbackQuestions.length === 0
      const result = await updateReservationFeedback({
        variables: {
          id: reservationFeedback.id,
          input: {
            feedbacks: {
              update: {
                where: { id: currFeedback.id },
                data: {
                  isCompleted: feedbackIsCompleted,
                  questions: {
                    update: {
                      where: { id: feedbackQuestionID },
                      data: { responses: { set: option } },
                    },
                  },
                },
              },
            },
          },
        },
      })
      const updatedReservationFeedback = result?.data?.updateReservationFeedback
      if (updatedReservationFeedback) {
        setReservationFeedback(updatedReservationFeedback)
        const totalNumQuestions = currQuestions.length
        const nextQuestionIndex = currQuestionIndex + 1
        if (nextQuestionIndex < totalNumQuestions) {
          // Scroll to next question
          flatListRef.scrollToIndex({ index: nextQuestionIndex })
          setCurrQuestionIndex(nextQuestionIndex)
        } else {
          const nextProductIndex = currFeedbackIndex + 1
          const totalNumProducts = reservationFeedback.feedbacks.length
          if (nextProductIndex < totalNumProducts) {
            // Scroll to next product
            changeToFeedbackIndex(nextProductIndex)
          } else {
            navigation.navigate("Modal", {
              screen: Schema.PageNames.ReservationFeedbackConfirmationModal,
              params: { reservationFeedback },
            })
          }
        }
      }
    }
    return (
      <FlatList
        data={options}
        ListHeaderComponent={() => (
          <>
            <Text style={{ flexWrap: "wrap", width: contentWidth }}>
              <Sans size="5">{`${index + 1}. ${question}`}</Sans>
            </Text>
            <Spacer mb={3} />
          </>
        )}
        ItemSeparatorComponent={() => <Spacer mb={1} />}
        scrollEnabled={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button
            variant="tertiaryWhite"
            width={contentWidth}
            selected={responses.includes(item)}
            height={48}
            onPress={() => onOptionPressed(item)}
          >
            {item}
          </Button>
        )}
      />
    )
  }

  const handleSelectedProgressBar = (index) => {
    changeToFeedbackIndex(index)
  }

  const handleContinueLaterPressed = () => {
    tracking.trackEvent({
      actionName: TrackingSchema.ActionNames.ReservationFeedbackContinueLaterButtonTapped,
      actionType: TrackingSchema.ActionTypes.Tap,
    })
    navigation.goBack()
  }

  const onQuestionsFlatListScrollEnd = (event) => {
    const { contentOffset, layoutMeasurement: viewSize } = event.nativeEvent
    const questionIndexScrolledTo = Math.floor(contentOffset.x / viewSize.width)
    setCurrQuestionIndex(questionIndexScrolledTo)
  }

  const currFeedback: ReservationFeedback_reservationFeedback_feedbacks =
    reservationFeedback.feedbacks[currFeedbackIndex]
  const { variant: currVariant, questions: currQuestions } = currFeedback
  const { product: currProduct } = currVariant
  const { images, name: productName } = currProduct

  const { width: windowWidth } = Dimensions.get("window")
  const contentWidth = windowWidth - 32

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box px={2} style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Handle backgroundColor="black10" style={{ marginTop: 12, marginBottom: 16 }} />
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center">
            <ReservationFeedbackHeader
              currentItem={currFeedbackIndex + 1}
              headerText="Reviewing"
              reservationFeedback={reservationFeedback}
              onSelectedProgressBarIndex={handleSelectedProgressBar}
            />
            <ImageRail height={200} images={images} imageWidth={161} showPageDots={false} />
            <Spacer mb={1} />
            <Sans size="2">{productName}</Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={3} />
            <FlatList
              data={currQuestions}
              initialScrollIndex={currQuestionIndex}
              onScrollToIndexFailed={(info) => {
                // When the initialScrollIndex is at the end, the flat list may fail to scroll
                // to that index because the layout is not yet complete so we have to wait for
                // the layout to finish and then retry
                const wait = new Promise((resolve) => setTimeout(resolve, 500))
                wait.then(() => {
                  flatListRef.scrollToIndex({ index: info.index })
                })
              }}
              horizontal={true}
              pagingEnabled
              keyExtractor={(item) => item.question}
              ref={(ref) => setFlatListRef(ref)}
              renderItem={({ item, index }) => renderItem(item, index)}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onQuestionsFlatListScrollEnd}
            />
          </Flex>
        </Box>
        <Box>
          <TouchableWithoutFeedback onPress={handleContinueLaterPressed}>
            <Text style={{ textAlign: "center" }}>
              <Sans style={{ textDecorationLine: "underline" }} size="4" color={color("black100")}>
                Continue later
              </Sans>
            </Text>
          </TouchableWithoutFeedback>
          <Spacer mb={6} />
        </Box>
      </Box>
    </Container>
  )
})
