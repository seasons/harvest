import { ErrorScreen } from "App/Components/ErrorScreen"
import { Loader } from "App/Components/Loader"
import { Schema } from "App/Navigation"
import { NetworkContext } from "App/NetworkProvider"
import { userSessionToIdentifyPayload } from "App/utils/auth"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import React, { useContext, useEffect, useState } from "react"
import { StatusBar } from "react-native"
import SplashScreen from "react-native-splash-screen"
import { useNotificationBarContext } from "@seasons/eclipse"
import { useQuery } from "@apollo/client"
import analytics from "@segment/analytics-react-native"
import { HomeBlogContent, HomeBottomSheet } from "./Components"
import { Homepage_Query } from "App/Scenes/Home/queries/homeQueries"

export const Home = screenTrack()(({ navigation, route }) => {
  const [showLoader, toggleLoader] = useState(true)
  const [fitPicsFetchCount, setFitPicsFetchCount] = useState(8)
  const { loading, error, previousData, data = previousData, refetch, fetchMore } = useQuery(Homepage_Query, {
    variables: { firstFitPics: fitPicsFetchCount, skipFitPics: 0 },
  })
  const { showNotificationBar } = useNotificationBarContext()

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
    if (!!data) {
      // do the identify call
      const userId = data?.me?.customer?.user?.id
      if (!!userId) {
        analytics.identify(userId, userSessionToIdentifyPayload(data?.me?.customer))
      }
    }
  }, [data])

  const reservationFeedback = data?.reservationFeedback
  const shouldRequestFeedback = data?.me?.customer?.shouldRequestFeedback
  const feedbacks = data?.reservationFeedback?.feedbacks
  const incompleteFeedbackIndex = feedbacks?.findIndex((feedback) => !feedback.isCompleted)

  useEffect(() => {
    const goToReservationFeedbackScreen = () => {
      navigation.navigate("Modal", {
        screen: Schema.PageNames.ReservationFeedbackModal,
      })
    }
    if (reservationFeedback && shouldRequestFeedback) {
      let subtitle
      if (incompleteFeedbackIndex === 0) {
        subtitle = `Review ${feedbacks?.length} items`
      } else {
        subtitle = `Reviewing ${incompleteFeedbackIndex + 1} of ${feedbacks?.length} items`
      }
      showNotificationBar({
        title: "Share feedback on your last order",
        subtitle,
        onClickBanner: goToReservationFeedbackScreen,
      })
    }
  }, [shouldRequestFeedback, reservationFeedback, incompleteFeedbackIndex])

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

  const onSelectedReviewRating = () => {
    // setShowReservationFeedbackPopUp(false)
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
            }).then((fetchMoreResult) => {
              setFitPicsFetchCount(data?.fitPics?.length + fetchMoreResult?.data?.fitPics.length)
            })
          }
        }}
      />
    </Container>
  )
})
