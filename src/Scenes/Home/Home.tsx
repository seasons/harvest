import { Box, Flex, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import { ReservationFeedbackPopUp, ReservationFeedbackReminder } from "../ReservationFeedback/Components"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { useFocusEffect } from "@react-navigation/native"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import SplashScreen from "react-native-splash-screen"
import styled from "styled-components/native"
import { BrandsRail } from "./Components/BrandsRail"
import { HomeFooter } from "./Components/HomeFooter"
import { ProductsRail } from "./Components/ProductsRail"
import { Schema } from "App/Navigation"

const RESERVATION_FEEDBACK_REMINDER_HEIGHT = 84

export const GET_HOMEPAGE = gql`
  query Homepage {
    homepage {
      sections {
        title
        type
        results {
          ... on Brand {
            id
            name
            since
          }
          ... on Product {
            id
            slug
            images
            brand {
              id
              name
            }
            variants {
              id
              internalSize {
                display
              }
              reservable
            }
          }
        }
      }
    }
  }
`

export const GET_RESERVATION_FEEDBACK = gql`
  query ReservationFeedback {
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
            images
            name
            retailPrice
          }
        }
      }
    }
  }
`

export const Home = screenTrack()(({ navigation }) => {
  const [sections, setSections] = useState([])
  const [showLoader, toggleLoader] = useState(true)
  const [showReviewPopUp, setShowReviewPopUp] = useState(true)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})
  const {
    loading: _feedbackLoading,
    error: _feedbackError,
    data: feedbackData,
    refetch: refetchReservationFeedback,
  } = useQuery(GET_RESERVATION_FEEDBACK)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (data?.homepage?.sections?.length) {
      const dataSections = data.homepage.sections.filter((section) => section?.results?.length)
      setSections(dataSections)
    }
  }, [data])

  useEffect(() => {
    if (!loading && showSplash) {
      setShowSplash(false)
      setTimeout(() => {
        toggleLoader(loading)
        SplashScreen.hide()
      }, 100)
    }
  }, [loading])

  useFocusEffect(() => {
    refetchReservationFeedback()
  })

  const reservationFeedback = feedbackData?.reservationFeedback

  const goToReservationFeedbackScreen = () => {
    navigation.navigate("Modal", {
      screen: Schema.PageNames.ReservationFeedbackModal,
      params: { reservationFeedback },
    })
  }

  const onSelectedReviewRating = () => {
    setShowReviewPopUp(false)
    goToReservationFeedbackScreen()
  }

  const onPressReservationFeedbackReminder = () => {
    goToReservationFeedbackScreen()
  }

  if (error) {
    console.error("error /home/index.tsx: ", error)
  }

  if (showLoader || !data) {
    return <Loader />
  }

  const renderItem = (item) => {
    switch (item.type) {
      case "Brands":
        return <BrandsRail title={item.title} navigation={navigation} items={item.results} />
      case "Products":
      case "HomepageProductRails":
        return <ProductsRail title={item.title} navigation={navigation} items={item.results} />
    }
  }

  return (
    <Container insetsBottom={true}>
      <Animatable.View animation="fadeIn" duration={300}>
        <Box pb={2} px={2} pt={1} style={{ backgroundColor: color("white100") }}>
          <Flex flexDirection="row" justifyContent="center" flexWrap="nowrap" alignContent="center">
            <LogoText>SEASONS</LogoText>
          </Flex>
        </Box>
        <Separator />
        <FlatList
          data={sections}
          keyExtractor={(item, index) => {
            return item.type + index
          }}
          ListHeaderComponent={() => <Spacer mb={2} />}
          renderItem={({ item }) => <Box>{renderItem(item)}</Box>}
          ListFooterComponent={() => (
            <HomeFooter
              navigation={navigation}
              bottom={reservationFeedback && reservationFeedback.rating ? RESERVATION_FEEDBACK_REMINDER_HEIGHT : 0}
            />
          )}
        />
        {reservationFeedback ? (
          reservationFeedback.rating ? (
            <ReservationFeedbackReminderWrapper>
              <ReservationFeedbackReminder
                reservationFeedback={reservationFeedback}
                onPress={onPressReservationFeedbackReminder}
              />
            </ReservationFeedbackReminderWrapper>
          ) : (
            <ReservationFeedbackPopUp
              reservationFeedback={reservationFeedback}
              show={showReviewPopUp}
              onSelectedRating={onSelectedReviewRating}
            />
          )
        ) : null}
      </Animatable.View>
    </Container>
  )
})

const ReservationFeedbackReminderWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  background: ${color("white100")};
  width: 100%;
  height: ${RESERVATION_FEEDBACK_REMINDER_HEIGHT};
`
