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
import SplashScreen from "react-native-splash-screen"
import styled from "styled-components/native"
import { Schema } from "App/Navigation"
import { HomeBlogContent, HomeBottomSheet } from "./Components"
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
            images(size: Thumb) {
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
                id
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
            images(size: Thumb) {
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
          product {
            id
            name
            modelSize {
              id
              display
            }
            brand {
              id
              name
            }
            images(size: Medium) {
              id
              url
            }
            variants {
              id
              reservable
              internalSize {
                id
                display
              }
            }
          }
        }
      }
    }
    blogPosts(collection: "5e72a4bad1075fcf7313bf38", count: 6) {
      id
      url
      name
      category
      imageURL
    }
    archivalProducts: products(
      where: { AND: [{ tags_some: { name: "Vintage" } }, { status: Available }] }
      first: 12
      orderBy: createdAt_DESC
    ) {
      id
      slug
      images(size: Thumb) {
        id
        url
      }
    }
    justAddedTops: products(
      first: 8
      category: "tops"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      slug
      images(size: Thumb) {
        id
        url
      }
      brand {
        id
        name
      }
      variants {
        id
        total
        reservable
        nonReservable
        reserved
        internalSize {
          id
          display
        }
      }
    }
    justAddedBottoms: products(
      first: 8
      category: "bottoms"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      slug
      images(size: Thumb) {
        url
        id
      }
      brand {
        id
        name
      }
      variants {
        id
        total
        reservable
        nonReservable
        reserved
        internalSize {
          id
          display
        }
      }
    }
  }
`

export const Home = screenTrack()(({ navigation }) => {
  const [showLoader, toggleLoader] = useState(true)
  const [showReservationFeedbackPopUp, setShowReservationFeedbackPopUp] = useState(true)
  const { loading, error, data, refetch } = useQuery(GET_HOMEPAGE, {})
  const [showSplash, setShowSplash] = useState(true)
  const network = useContext(NetworkContext)

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

  console.log("data", data?.blogPosts)

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

  return !network?.isConnected && !data ? (
    NoInternetComponent
  ) : (
    <Container insetsTop={false} insetsBottom={false}>
      <StatusBar barStyle="light-content" />
      <HomeBlogContent items={data?.blogPosts} />
      <HomeBottomSheet data={data} />
      {reservationFeedback &&
        shouldRequestFeedback &&
        (reservationFeedback.rating ? (
          <ReservationFeedbackReminderWrapper>
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
    </Container>
  )
})

const ReservationFeedbackReminderWrapper = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  background: ${color("white100")};
  width: 100%;
  height: ${RESERVATION_FEEDBACK_REMINDER_HEIGHT};
  z-index: 100;
`
