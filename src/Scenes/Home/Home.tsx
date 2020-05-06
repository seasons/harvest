import { Box, Flex, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { NetworkContext } from "App/NetworkProvider"
import { screenTrack } from "App/utils/track"
import { ErrorScreen } from "App/Components/ErrorScreen"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import { ReservationFeedbackPopUp, ReservationFeedbackReminder } from "../ReservationFeedback/Components"
import gql from "graphql-tag"
import React, { useEffect, useState, useContext } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import SplashScreen from "react-native-splash-screen"
import styled from "styled-components/native"
import { Schema } from "App/Navigation"
import { BrandsRail } from "./Components/BrandsRail"
import { HomeFooter } from "./Components/HomeFooter"
import { ProductsRail } from "./Components/ProductsRail"
import { BagItemFragment } from "../Bag/Components/BagItem"
import { BagView } from "../Bag/Bag"

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
            images
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
  }
  ${BagItemFragment}
`

export const Home = screenTrack()(({ navigation }) => {
  const [sections, setSections] = useState([])
  const [showLoader, toggleLoader] = useState(true)
  const [showReservationFeedbackPopUp, setShowReservationFeedbackPopUp] = useState(true)
  const { loading, error, data, refetch } = useQuery(GET_HOMEPAGE, {})
  const [showSplash, setShowSplash] = useState(true)
  const network = useContext(NetworkContext)
  const insets = useSafeArea()

  useEffect(() => {
    if (data?.homepage?.sections?.length) {
      const dataSections = data.homepage.sections.filter((section) => section?.results?.length)
      if (data?.me?.savedItems?.length) {
        const results = data?.me?.savedItems?.map((item) => item?.productVariant?.product)
        dataSections.splice(4, 0, { type: "SavedProducts", title: "Saved for later", results })
      }
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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

  const renderItem = (item) => {
    switch (item.type) {
      case "Brands":
        return <BrandsRail title={item.title} items={item.results} />
      case "Products":
      case "HomepageProductRails":
        return <ProductsRail title={item.title} items={item.results} />
      case "SavedProducts":
        return (
          <ProductsRail
            large
            title={item.title}
            items={item.results}
            onViewAll={() => {
              navigation.navigate(Schema.StackNames.BagStack, {
                screen: Schema.PageNames.Bag,
                params: { tab: BagView.Saved },
              })
            }}
          />
        )
    }
  }

  return !network?.isConnected && !data ? (
    NoInternetComponent
  ) : (
    <Container insetsTop={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <Box pb={2} px={2} pt={insets.top + 8} style={{ backgroundColor: color("white100") }}>
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
