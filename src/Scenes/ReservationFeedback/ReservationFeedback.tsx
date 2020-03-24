import { Box, Button, Flex, Handle, ProgressBar, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ImageRail } from "App/Scenes/Product/Components"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { Dimensions, FlatList, Text, TouchableWithoutFeedback, findNodeHandle } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { Schema } from "App/Navigation"
import { ReservationFeedback_reservationFeedback, ReservationFeedback_reservationFeedback_feedbacks } from "src/generated/ReservationFeedback"
import { UPDATE_RESERVATION_FEEDBACK } from "../Home/Components/ReviewPopUp"
import { GET_RESERVATION_FEEDBACK } from "../Home/Home"
import { useMutation } from "@apollo/react-hooks"
import { ReservationFeedbackHeader } from "./Components"

export const ReservationFeedback: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const [reservationFeedback, setReservationFeedback] = useState(route.params.reservationFeedback)
  const { feedbacks } = reservationFeedback

  const incompleteFeedbackIndex = reservationFeedback.feedbacks
    .findIndex(feedback => !feedback.isCompleted)
  const [currProductIndex, setCurrProductIndex] = useState(
    incompleteFeedbackIndex === -1
      ? feedbacks.length - 1
      : incompleteFeedbackIndex
  )

  const incompleteFeedback = feedbacks[currProductIndex]
  const incompleteQuestionIndex = incompleteFeedback.questions.findIndex(question => question.responses.length === 0)
  const [currQuestionIndex, setCurrQuestionIndex] = useState(
    incompleteQuestionIndex === -1
      ? incompleteFeedback.questions.length - 1
      : incompleteQuestionIndex
  )
  const [flatListRef, setFlatListRef] = useState(null)
  const [updateReservationFeedback] = useMutation(UPDATE_RESERVATION_FEEDBACK)
  const { width: windowWidth } = Dimensions.get("window")
  const contentWidth = windowWidth - 32

  const changeToFeedbackIndex = (index) => {
    setCurrProductIndex(index)
    setCurrQuestionIndex(0)
    flatListRef.scrollToIndex({ index: 0 })
  }

  const renderItem = (feedbackQuestion, index) => {
    const { id: feedbackQuestionID, question, options, responses } = feedbackQuestion
    const currVariantFeedback: ReservationFeedback_reservationFeedback_feedbacks = reservationFeedback.feedbacks[currProductIndex]
    const onOptionPressed = async (option) => {
      feedbackQuestion.responses = [option]
      const unansweredFeedbackQuestions = currVariantFeedback.questions.filter((question) => question.responses.length === 0)
      const feedbackIsCompleted =
        (unansweredFeedbackQuestions.length === 1 && unansweredFeedbackQuestions[0].id === feedbackQuestionID) ||
        unansweredFeedbackQuestions.length === 0
      const result = await updateReservationFeedback({
        variables: {
          id: reservationFeedback.id,
          input: {
            feedbacks: {
              update: {
                where: { id: currVariantFeedback.id },
                data: {
                  isCompleted: feedbackIsCompleted,
                  questions: {
                    update: {
                      where: { id: feedbackQuestionID },
                      data: {
                        responses: { set: option }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        refetchQueries: [{
          query: GET_RESERVATION_FEEDBACK
        }]
      })
      setReservationFeedback(result?.data?.updateReservationFeedback)
      const totalNumQuestions = reservationFeedback.feedbacks[currProductIndex].questions.length
      const nextQuestionIndex = currQuestionIndex + 1
      if (nextQuestionIndex < totalNumQuestions) { // Scroll to next question
        flatListRef.scrollToIndex({ index: nextQuestionIndex })
        setCurrQuestionIndex(nextQuestionIndex)
      } else {
        const nextProductIndex = currProductIndex + 1
        const totalNumProducts = reservationFeedback.feedbacks.length
        if (nextProductIndex < totalNumProducts) { // Scroll to next product
          changeToFeedbackIndex(nextProductIndex)
        } else {
          navigation.navigate("Modal", {
            screen: Schema.PageNames.ReservationFeedbackConfirmation,
            params: { reservationFeedback }
          })
        }
      }
    }
    return (
      <FlatList
        data={options}
        ListHeaderComponent={() => (
          <>
            <Text style={{ flexWrap: "wrap", width: contentWidth }}>
              <Sans size="2">{`${index + 1}. ${question}`}</Sans>
            </Text>
            <Spacer mb={3} />
          </>
        )}
        ItemSeparatorComponent={() => <Spacer mb={1} />}
        scrollEnabled={false}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Button
            variant="secondaryWhite"
            width={contentWidth}
            selected={responses.includes(item)}
            height={48}
            onPress={() => onOptionPressed(item)}>
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
    navigation.pop()
  }

  const onQuestionsFlatListScrollEnd = (event) => {
    const { contentOffset, layoutMeasurement: viewSize } = event.nativeEvent
    const questionIndexScrolledTo = Math.floor(contentOffset.x / viewSize.width)
    setCurrQuestionIndex(questionIndexScrolledTo)
  }

  const currVariantFeedback: ReservationFeedback_reservationFeedback_feedbacks = reservationFeedback.feedbacks[currProductIndex]
  const { variant: currVariant, questions: currQuestions } = currVariantFeedback
  const { product: currProduct } = currVariant
  const { images, name: productName } = currProduct

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box px={2} style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Handle color="black15" style={{ marginTop: 12, marginBottom: 16 }} />
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
            <ReservationFeedbackHeader
              currentItem={currProductIndex + 1}
              headerText="Reviewing"
              reservationFeedback={reservationFeedback}
              onSelectedProgressBarIndex={handleSelectedProgressBar}
            />
            <ImageRail
              height={200}
              images={images}
              imageWidth={161}
              showPageDots={false} />
            <Spacer mb={1} />
            <Sans size="0">{productName}</Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={3} />
            <FlatList
              data={currQuestions}
              initialScrollIndex={currQuestionIndex}
              onScrollToIndexFailed={info => {
                // When the initialScrollIndex is at the end, the flat list may fail to scroll
                // to that index because the layout is not yet complete so we have to wait for 
                // the layout to finish and then retry
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => { flatListRef.scrollToIndex({ index: info.index }) })
              }}
              horizontal={true}
              pagingEnabled
              keyExtractor={item => item.question}
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
              <Sans style={{ textDecorationLine: "underline" }} size="1" color={color("black100")}>
                Continue later
              </Sans>
            </Text>
          </TouchableWithoutFeedback>
          <Spacer mb={6} />
        </Box>
      </Box>
    </Container >
  )
})
