import { Box } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { NetworkContext } from "App/NetworkProvider"
import { screenTrack } from "App/utils/track"
import { ErrorScreen } from "App/Components/ErrorScreen"
import { Container } from "Components/Container"
import { ReservationFeedbackPopUp, ReservationFeedbackReminder } from "../ReservationFeedback/Components"
import gql from "graphql-tag"
import React, { useEffect, useState, useContext } from "react"
import { useQuery } from "react-apollo"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import SplashScreen from "react-native-splash-screen"
import styled from "styled-components/native"
import { Schema } from "App/Navigation"
import { HomeBlogContent, HomeBottomSheet } from "./Components"
import { BagItemFragment } from "../Bag/Components/BagItem"
import { RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { StatusBar } from "react-native"

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
            images {
              id
              url
            }
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
            images {
              id
              url
            }
            name
            retailPrice
          }
        }
      }
    }
    me {
      customer {
        id
        shouldRequestFeedback
      }
      savedItems {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
      }
    }
    blogPosts(collection: "5e72a4bad1075fcf7313bf38", count: 6) {
      id
      url
      name
      imageURL
    }
  }
  ${BagItemFragment}
`

export const Home = screenTrack()(({ navigation }) => {
  const [showLoader, toggleLoader] = useState(true)
  const [showReservationFeedbackPopUp, setShowReservationFeedbackPopUp] = useState(true)
  const { loading, error, data, refetch } = useQuery(GET_HOMEPAGE, {})
  const [showSplash, setShowSplash] = useState(true)
  const network = useContext(NetworkContext)
  const insets = useSafeArea()

  useEffect(() => {
    if (!loading && showSplash) {
      setShowSplash(false)
      setTimeout(() => {
        toggleLoader(loading)
        SplashScreen.hide()
      }, 100)
    }
  }, [loading])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("light-content")
      refetch()
    })
    return unsubscribe
  }, [navigation])

  const NoInternetComponent = (
    <ErrorScreen
      variant="No Internet"
      refreshAction={() => {
        refetch()
      }}
    />
  )

  if (error) {
    if (!network.isConnected) {
      return NoInternetComponent
    }
    console.error("error /home/index.tsx: ", error)
  }

  if (showLoader || !data) {
    return <Loader />
  }

  const reservationFeedback = data?.reservationFeedback
  const shouldRequestFeedback = data?.me?.customer?.shouldRequestFeedback

  const goToReservationFeedbackScreen = () => {
    navigation.navigate("Modal", {
      screen: Schema.PageNames.ReservationFeedbackModal,
      params: { reservationFeedback },
    })
  }

  const onSelectedReviewRating = () => {
    setShowReservationFeedbackPopUp(false)
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

  console.log("data", data)

  return !network?.isConnected && !data ? (
    NoInternetComponent
  ) : (
    <Container insetsTop={false} insetsBottom={false}>
      <StatusBar barStyle="light-content" />
      <HomeBlogContent items={data?.blogPosts} />
      <Animatable.View animation="fadeIn" duration={300}>
        {reservationFeedback &&
          shouldRequestFeedback &&
          (reservationFeedback.rating ? (
            <ReservationFeedbackReminderWrapper style={{ bottom: insets.bottom + 8 }}>
              <ReservationFeedbackReminder
                reservationFeedback={reservationFeedback}
                onPress={onPressReservationFeedbackReminder}
              />
            </ReservationFeedbackReminderWrapper>
          ) : (
            <ReservationFeedbackPopUp
              reservationFeedback={reservationFeedback}
              show={showReservationFeedbackPopUp}
              onSelectedRating={onSelectedReviewRating}
            />
          ))}
      </Animatable.View>
      <HomeBottomSheet data={data} />
    </Container>
  )
})

const ReservationFeedbackReminderWrapper = styled(Box)`
  position: absolute;
  left: 0;
  background: ${color("white100")};
  width: 100%;
  height: ${RESERVATION_FEEDBACK_REMINDER_HEIGHT};
`
