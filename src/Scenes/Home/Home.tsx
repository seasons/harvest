import { Box, Flex, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { useMutation } from "@apollo/react-hooks"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import SplashScreen from "react-native-splash-screen"
import { BrandsRail } from "./Components/BrandsRail"
import { HomeFooter } from "./Components/HomeFooter"
import { ProductsRail } from "./Components/ProductsRail"
import { ReviewPopUp } from "./Components/ReviewPopUp"
import { Schema } from "App/Navigation"

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

export const RESERVATION_FEEDBACK = {
  id: 123,
  comment: "Sample comment",
  feedbacks: [
    {
      isCompleted: false,
      questions: [
        {
          question: "How many times did you wear this Engineered Garments Hoodie?",
          options: ["More than 6 times", "3-5 times", "1-2 times", "0 times"],
          type: "MultipleChoice",
        },
        {
          question: "Would you buy it at retail for $495?",
          options: ["Would buy at a discount", "Buy below retail", "Buy at retail", "Would only rent"],
          type: "MultipleChoice",
        }
      ],
      variant: {
        name: "Engineered Garments Hoodie",
        retailPrice: 495,
        images: [
          { id: 1, url: "https://dl.airtable.com/.attachments/fe38470dce974a874d39c4737c610129/cf9627dc/JudyTurner_.Front-final.png" },
          { id: 2, url: "https://dl.airtable.com/.attachments/fe38470dce974a874d39c4737c610129/cf9627dc/JudyTurner_.Front-final.png" },
          { id: 3, url: "https://dl.airtable.com/.attachments/fe38470dce974a874d39c4737c610129/cf9627dc/JudyTurner_.Front-final.png" },
        ]
      }
    },
    {
      isCompleted: false,
      questions: [
        {
          question: "How many times did you wear this Sherpa Jacket?",
          options: ["More than 6 times", "3-5 times", "1-2 times", "0 times"],
          type: "MultipleChoice",
        },
        {
          question: "Would you buy it at retail for $495?",
          options: ["Would buy at a discount", "Buy below retail", "Buy at retail", "Would only rent"],
          type: "MultipleChoice",
        }
      ],
      variant: {
        name: "Sherpa Jacket",
        retailPrice: 495,
        images: [
          { id: 1, url: "https://dl.airtable.com/.attachments/d066ca7e3b22be0fbaf751eb5dcfa088/393b7ccc/Levis-BlackDenim-Jacket-Front.png" },
          { id: 2, url: "https://dl.airtable.com/.attachments/d066ca7e3b22be0fbaf751eb5dcfa088/393b7ccc/Levis-BlackDenim-Jacket-Front.png" },
          { id: 3, url: "https://dl.airtable.com/.attachments/d066ca7e3b22be0fbaf751eb5dcfa088/393b7ccc/Levis-BlackDenim-Jacket-Front.png" },
        ]
      }
    },
  ],
  rating: "Loved it",
}

export const Home = screenTrack()(({ navigation }) => {
  const [sections, setSections] = useState([])
  const [showLoader, toggleLoader] = useState(true)
  const [showReviewPopUp, setShowReviewPopUp] = useState(true)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})
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

  const reservationFeedback = feedbackData?.reservationFeedback

  const onSelectedReviewRating = () => {
    setShowReviewPopUp(false)
    navigation.navigate("Modal", {
      screen: Schema.PageNames.ReservationFeedback,
      params: { reservationFeedback }
    })
  }

  if (feedbackData) {
    console.log("FEEDBACK DATA:", feedbackData)
  }

  return (
    <Container insetsBottom={false}>
      {reservationFeedback
        ? <ReviewPopUp
          reservationFeedback={reservationFeedback}
          show={showReviewPopUp}
          onSelectedRating={onSelectedReviewRating}
        />
        : <Loader />
      }
    </Container>
  )

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
    <Container insetsBottom={false}>
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
          ListFooterComponent={() => <HomeFooter navigation={navigation} />}
        />
      </Animatable.View>
    </Container>
  )
})
