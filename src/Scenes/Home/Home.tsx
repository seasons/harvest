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
import { BrandsRail } from "./Components/BrandsRail"
import { HomeFooter } from "./Components/HomeFooter"
import { ProductsRail } from "./Components/ProductsRail"
import { ReviewPopUp } from "./Components/ReviewPopUp"

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

export const Home: React.FC<{
  navigation: any
}> = ({ navigation }) => {
  const [sections, setSections] = useState([])
  const [showLoader, toggleLoader] = useState(true)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})

  useEffect(() => {
    if (data?.homepage?.sections?.length) {
      const dataSections = data.homepage.sections.filter(section => section?.results?.length)
      setSections(dataSections)
    }
  }, [data])

  useEffect(() => {
    setTimeout(() => {
      toggleLoader(loading)
    }, 500)
  }, [loading])

  if (showLoader || !data) {
    return <Loader />
  }

  if (error) {
    console.error("error /home/index.tsx: ", error)
  }

  const renderItem = item => {
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
        <ReviewPopUp show={true} />
      </Animatable.View>
    </Container>
  )
}
