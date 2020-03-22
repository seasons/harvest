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
import { Dimensions, FlatList, Text, TouchableWithoutFeedback } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { Schema } from "App/Navigation"
import { ReservationFeedback_reservationFeedback } from "src/generated/ReservationFeedback"

export const ReservationFeedback: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const reservationFeedback: ReservationFeedback_reservationFeedback = route.params.reservationFeedback
  const [images, setImages] = useState(reservationFeedback.feedbacks[0].variant.product.images)
  const [productName, setProductName] = useState(reservationFeedback.feedbacks[0].variant.product.name)
  const [flatListData, setFlatListData] = useState(reservationFeedback.feedbacks[0].questions)
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0)
  const [currProductIndex, setCurrProductIndex] = useState(0)
  const insets = useSafeArea()
  const { width: windowWidth } = Dimensions.get("window")
  const numFeedbacks = reservationFeedback.feedbacks.length
  const progressBarSpacerWidth = 5
  const contentWidth = windowWidth - 32
  const progressBarWidth = (contentWidth / numFeedbacks) - progressBarSpacerWidth * (numFeedbacks - 1)

  let flatListRef

  const renderItem = (feedbackQuestion, index) => {
    const { question, options } = feedbackQuestion
    const onOptionPressed = () => {
      const totalNumQuestions = reservationFeedback.feedbacks[currProductIndex].questions.length
      const nextQuestionIndex = currQuestionIndex + 1
      if (nextQuestionIndex < totalNumQuestions) { // Scroll to next question
        flatListRef.scrollToIndex({ index: nextQuestionIndex })
        setCurrQuestionIndex(nextQuestionIndex)
      } else {
        const nextProductIndex = currProductIndex + 1
        const totalNumProducts = reservationFeedback.feedbacks.length
        if (nextProductIndex < totalNumProducts) { // Scroll to next product
          const productFeedback = reservationFeedback.feedbacks[nextProductIndex]
          setImages(productFeedback.variant.product.images)
          setProductName(productFeedback.variant.product.name)
          setFlatListData(productFeedback.questions)
          setCurrQuestionIndex(0)
          flatListRef.scrollToIndex({ index: 0 })
          setCurrProductIndex(nextProductIndex)
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
            height={48}
            onPress={onOptionPressed}>
            {item}
          </Button>
        )}
      />
    )
  }

  const handleContinueLaterPressed = () => {
    navigation.pop()
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box px={2} style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Handle color="black15" style={{ marginTop: 12, marginBottom: 16 }} />
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" >
              <Sans size="1" color={color("black100")}>
                Reviewing
            </Sans>
              <Sans size="1" color={color("black50")}>
                Item 1 of 3
            </Sans>
            </Flex>
            <Spacer mb={1} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" >
              {reservationFeedback.feedbacks.map(feedback =>
                <ProgressBar width={progressBarWidth} percentCompleted={0.5} />
              )}
            </Flex>
            <Spacer mb={3} />
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
              data={flatListData}
              horizontal={true}
              pagingEnabled
              keyExtractor={item => item.question}
              ref={(ref) => flatListRef = ref}
              renderItem={({ item, index }) => renderItem(item, index)}
              showsHorizontalScrollIndicator={false}
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
