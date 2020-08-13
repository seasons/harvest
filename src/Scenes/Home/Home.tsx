import { Box } from "App/Components"
import { ErrorScreen } from "App/Components/ErrorScreen"
import { Loader } from "App/Components/Loader"
import { RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { NetworkContext } from "App/NetworkProvider"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { StatusBar } from "react-native"
import SplashScreen from "react-native-splash-screen"
import styled from "styled-components/native"

import { ReservationFeedbackPopUp, ReservationFeedbackReminder } from "../ReservationFeedback/Components"
import { HomeBlogContent, HomeBottomSheet } from "./Components"
import { Homepage_fitPics } from "App/generated/Homepage"

export const GET_HOMEPAGE = gql`
  query Homepage($firstFitPics: Int!, $skipFitPics: Int) {
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
            images(size: Thumb) {
              id
              url
            }
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
    blogPosts(count: 5) {
      id
      url
      name
      category
      imageURL
    }
    archivalProducts: products(
      where: { AND: [{ tags_some: { name: "Vintage" } }, { status: Available }] }
      first: 12
      orderBy: publishedAt_DESC
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
      orderBy: publishedAt_DESC
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
      orderBy: publishedAt_DESC
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
    fitPicsCount: fitPicsConnection {
      aggregate {
        count
      }
    }
    fitPics(first: $firstFitPics, skip: $skipFitPics, orderBy: createdAt_DESC) {
      id
      author
      location {
        id
        city
        state
      }
      image {
        id
        url
      }
      createdAt
    }
  }
`

export const Home = screenTrack()(({ navigation, route }) => {
  const [showLoader, toggleLoader] = useState(true)
  const [showReservationFeedbackPopUp, setShowReservationFeedbackPopUp] = useState(true)
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_HOMEPAGE, {
    variables: { firstFitPics: 8, skipFitPics: 0 },
  })
  const [showSplash, setShowSplash] = useState(true)
  const network = useContext(NetworkContext)

  const totalFitPics = data?.fitPicsCount?.aggregate?.count ?? 0
  const fitPicsReceived = data?.fitPics?.length ?? 0

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
      refetch({ firstFitPics: Math.max(8, fitPicsReceived), skipFitPics: 0 })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      StatusBar.setBarStyle("dark-content")
      refetch({ firstFitPics: Math.max(8, fitPicsReceived), skipFitPics: 0 })
    })
    return unsubscribe
  }, [navigation])

  const NoInternetComponent = (
    <ErrorScreen
      variant="No Internet"
      refreshAction={() => {
        refetch({ firstFitPics: Math.max(8, fitPicsReceived), skipFitPics: 0 })
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

  return !network?.isConnected && !data ? (
    NoInternetComponent
  ) : (
    <Container insetsTop={false} insetsBottom={false}>
      <StatusBar barStyle="light-content" />
      <HomeBlogContent items={data?.blogPosts} />
      <HomeBottomSheet
        data={data}
        isFetchingMoreFitPics={loading && fitPicsReceived < totalFitPics}
        fetchMoreFitPics={() => {
          // Potential bad UX: isFetchingMoreFitPics is true and the spinner shows, but more fit pics aren't
          // fetched because refetch already made loading true.
          if (totalFitPics > fitPicsReceived && !loading && fitPicsReceived > 0) {
            fetchMore({
              variables: { firstFitPics: 8, skipFitPics: fitPicsReceived },
              updateQuery: (prev: { fitPics: Homepage_fitPics[] }, { fetchMoreResult }) => {
                if (!prev) {
                  return []
                } else if (!fetchMoreResult) {
                  return prev
                } else {
                  return Object.assign({}, prev, { fitPics: [...prev.fitPics, ...fetchMoreResult.fitPics] })
                }
              },
            })
          }
        }}
      />
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
