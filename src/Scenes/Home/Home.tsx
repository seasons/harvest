import { Box } from "App/Components"
import { ErrorScreen } from "App/Components/ErrorScreen"
import { Loader } from "App/Components/Loader"
import { RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { NetworkContext } from "App/NetworkProvider"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { StatusBar } from "react-native"
import SplashScreen from "react-native-splash-screen"
import styled from "styled-components/native"
import { ReservationFeedbackPopUp, ReservationFeedbackReminder } from "../ReservationFeedback/Components"
import { HomeBlogContent, HomeBottomSheet } from "./Components"
import { Homepage_fitPics } from "App/generated/Homepage"
import { GET_HOMEPAGE } from "./queries/homeQueries"
import analytics from "@segment/analytics-react-native"
import { userSessionToIdentifyPayload } from "App/utils/auth"

export const Home = screenTrack()(({ navigation, route }) => {
  const [showLoader, toggleLoader] = useState(true)
  const [navigatedToAccount, setNavigatedToAccount] = useState(false)
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
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      StatusBar.setBarStyle("dark-content")
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const status = data?.me?.customer?.status
    // Check if user status is authorized and navigate to account pane
    if (!!status && status === "Authorized" && !navigatedToAccount) {
      setNavigatedToAccount(true)
      navigation?.navigate("AccountStack", { screen: "Account" })
    }
  }, [data, navigation])

  useEffect(() => {
    if (!!data) {
      // do the identify call
      const userId = data?.me?.customer?.user?.id
      analytics.identify(userId, userSessionToIdentifyPayload(data?.me?.customer))
    }
  }, [data])

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
