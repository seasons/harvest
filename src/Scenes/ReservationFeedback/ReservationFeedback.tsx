import { Box, Flex, Handle, ProgressBar, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { ImageRail } from "App/Scenes/Product/Components"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { Dimensions, FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"

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
            images
            brand {
              id
              name
            }
            variants {
              size
              id
              reservable
            }
          }
        }
      }
    }
  }
`

export const ReservationFeedback: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ route, navigation }) => {
  const { reservationFeedback } = route.params
  const [images, setImages] = useState(reservationFeedback.feedbacks[0].variant.images)
  const [productName, setProductName] = useState(reservationFeedback.feedbacks[0].variant.name)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})
  const insets = useSafeArea()
  const { width: windowWidth } = Dimensions.get("window")
  const numFeedbacks = reservationFeedback.feedbacks.length
  const progressBarSpacerWidth = 5
  const progressBarWidth = ((windowWidth - 32) / numFeedbacks) - progressBarSpacerWidth * (numFeedbacks - 1)

  if (error) {
    console.error("error ReservationFeedback.tsx: ", error)
  }

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box px={2} >
        <Handle color="black15" style={{ marginTop: 12, marginBottom: 16 }} />
        <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" >
            <Sans size="1" color={color("black100")}>
              Reviewing
            </Sans>
            <Sans size="1" color={color("black50")}>
              Item 1 of 3
            </Sans>
          </Flex>
          <Spacer mb={1} />
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" >
            {reservationFeedback.feedbacks.map(feedback =>
              <ProgressBar width={progressBarWidth} percentCompleted={0.5} />
            )}
          </Flex>
          <Spacer mb={3} />
          <ImageRail
            height={200}
            images={images}
            imageWidth={161}
            showPageDots={false} />
          <Spacer mb={1} />
          <Sans size="0">{productName}</Sans>
        </Flex>
      </Box>
    </Container >
  )
})

// const ProgressBar = styled(Box)`
//   background: ${color("black15")};
//   height: 3px;
//   width: 111px;
//   border-radius: 100;
// `

// const ProgressBarInside = styled(Box)`
//   background: ${color("black100")};
//   height: 3px;
//   width: 30px;
//   border-radius: 100;
// `
