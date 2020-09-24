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

const HomePageProductFragment = gql`
  fragment HomePageProduct on Product {
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
    images(size: Thumb) {
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
`

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
            name
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
      name
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
      ...HomePageProduct
    }
    justAddedBottoms: products(
      first: 8
      category: "bottoms"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
    fitPicsCount: fitPicsConnection(where: { status: Published }) {
      aggregate {
        count
      }
    }
    fitPics(first: $firstFitPics, skip: $skipFitPics, orderBy: createdAt_DESC, where: { status: Published }) {
      id
      author
      location {
        id
        city
        state
      }
      image(size: Medium) {
        id
        url
      }
      createdAt
    }
  }
  ${HomePageProductFragment}
`

export const Home = screenTrack()(({ navigation, route }) => {
  const [showLoader, toggleLoader] = useState(true)
  const [showReservationFeedbackPopUp, setShowReservationFeedbackPopUp] = useState(true)
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_HOMEPAGE, {
    variables: { firstFitPics: 8, skipFitPics: 0 },
  })
  console.log("homepage data", data)
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
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      StatusBar.setBarStyle("dark-content")
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

  const isFetchingMoreFitPics = loading && fitPicsReceived < totalFitPics

  return !network?.isConnected && !data ? (
    NoInternetComponent
  ) : (
    <Container insetsTop={false} insetsBottom={false}>
      <StatusBar barStyle="light-content" />
      <HomeBlogContent items={data?.blogPosts} />
      <HomeBottomSheet
        data={data}
        isFetchingMoreFitPics={isFetchingMoreFitPics}
        fetchMoreFitPics={() => {
          if (!isFetchingMoreFitPics && fitPicsReceived > 0) {
            fetchMore({
              variables: { firstFitPics: 8, skipFitPics: fitPicsReceived },
              updateQuery: (prev: { fitPics: Homepage_fitPics[]; fitPicsCount: any }, { fetchMoreResult }) => {
                if (!prev) {
                  return []
                } else if (!fetchMoreResult) {
                  return prev
                } else {
                  return Object.assign({}, prev, {
                    fitPics: [...prev.fitPics, ...fetchMoreResult.fitPics],
                    fitPicsCount: fetchMoreResult.fitPicsCount,
                  })
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
