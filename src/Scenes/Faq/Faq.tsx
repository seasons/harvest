import React from "react"
import { Container, Spacer, FixedBackArrow, FixedButton, Flex } from "App/Components"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import { Loader } from "App/Components/Loader"
import { FlatList, Linking } from "react-native"
import { FaqSection } from "./Components/FaqSection"

export const GET_FAQ = gql`
  query Faq {
    faq {
      sections {
        title
        subsections {
          title
          text
        }
      }
    }
  }
`

export const Faq = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_FAQ, {})

  if (loading) {
    return <Loader />
  }

  const renderItem = item => {
    return <FaqSection section={item} />
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Flex style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={() => <Spacer mb={80} />}
          data={data?.faq?.sections}
          keyExtractor={item => item.title}
          renderItem={({ item }) => renderItem(item)}
        />
      </Flex>
      <FixedButton
        block
        variant="primaryWhite"
        onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject=Feedback`)}
      >
        Contact us
      </FixedButton>
    </Container>
  )
}
