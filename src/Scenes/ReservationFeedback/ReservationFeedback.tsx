import { Box, Flex, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/Utils"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"

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
}> = ({ navigation }) => {
  const [showLoader, toggleLoader] = useState(true)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})

  useEffect(() => {
    setTimeout(() => {
      toggleLoader(loading)
    }, 500)
  }, [loading])

  if (showLoader || !data) {
    return <Loader />
  }

  if (error) {
    console.error("error ReservationFeedback.tsx: ", error)
  }


  return (
    <Container insetsBottom={false}>
    </Container >
  )
}
