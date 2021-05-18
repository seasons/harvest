import { useMutation, useQuery } from "@apollo/client"
import React, { useRef, useState } from "react"
import { Dimensions, KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback } from "react-native"
import { RatingSlider } from "./Components/RatingSlider"
import { Box, Button, Flex, Sans, Separator, Spacer, TextInput } from "App/Components"
import { Schema } from "App/Navigation"
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
  const insets = useSafeAreaInsets()
  const [isMutating, setIsMutating] = useState(false)
  const { loading, error, previousData, data = previousData, refetch, fetchMore } = useQuery(ReservationFeedback_Query)
  const horizontalFlatListRef = useRef(null)
  const [comment, setComment] = useState("")
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
  const onLastItem = currFeedbackIndex + 1 === feedbacks?.length

  const handleOnSubmit = () => {
    if (onLastItem) {
    } else {
      setCurrFeedbackIndex(currFeedbackIndex + 1)
    }
  }

  const handleLeftButton = () => {
    if (currFeedbackIndex === 0) {
    } else if (currFeedbackIndex > 0) {
      setCurrFeedbackIndex(currFeedbackIndex - 1)
    }
  }

  const buttonDisabled = false

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
                    // tracking.trackEvent({
                    //   actionName: Schema.ActionNames.FilterTapped,
                    //   actionType: Schema.ActionTypes.Tap,
                    //   filterValue: item.value,
                    // })
                    // Recreate a new array reference so that the component reloads
                    // setFilters({
                    //   ...filters,
                    //   topSizeFilters: [
                    //     ...(filters.topSizeFilters.includes(item.value)
                    //       ? filters.topSizeFilters.filter((i) => i !== item.value)
                    //       : filters.topSizeFilters.concat([item.value])),
                    //   ],
                    // })
                  }}
                  selectedItems={[]}
                />

                <Spacer mb={5} />
              </Box>
            )
          })}
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="4">How would you rate it?</Sans>
          </Flex>
          <Spacer mb={1} />
          <RatingSlider />
          <Spacer mb={5} />
          <Sans size="4">Add a review?</Sans>
          <Spacer mb={1} />
          <CommentWrapper p={2}>
            <TextInput
              autoCapitalize="sentences"
              autoFocus
              hideBottomBar
              blurOnSubmit={false}
              currentValue={comment}
              style={{ height: 139, paddingLeft: 0, paddingTop: 0, borderWidth: 0 }}
              placeholder="Example: there was a missing button..."
              multiline={true}
              onChangeText={(_, val) => setComment(val)}
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
                  disabled={buttonDisabled}
                  loading={isMutating}
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
