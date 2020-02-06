import { Box, Flex, Spacer, Separator } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/Utils"
import { Container } from "Components/Container"
import { LogoText } from "Components/Typography"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { AllCaughtUp } from "./Components/AllCaughtUp"
import { ProductsRail } from "./Components/ProductsRail"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"

const GET_HOMEPAGE = gql`
  query Homepage {
    homepage {
      sections {
        title
        type
        results {
          ... on Product {
            id
            images
            brand {
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
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}> = ({ navigation }) => {
  const [sections, setSections] = useState([])
  const [showLoader, toggleLoader] = useState(true)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})
  const insets = useSafeArea()
  let categoriesAdded = false

  useEffect(() => {
    if (data && data.homepage) {
      const dataSections = data.homepage.sections.slice()
      if (data.categories && dataSections && !categoriesAdded) {
        categoriesAdded = true
        dataSections.splice(1, 0, { type: "Categories", results: data.categories })
      }
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
      case "Products":
      case "HomepageProductRails":
        return <ProductsRail title={item.title} navigation={navigation} items={item.results} />
    }
  }

  return (
    <Container>
      <Animatable.View animation="fadeIn" duration={300}>
        <Box style={{ position: "relative", backgroundColor: color("white100"), paddingTop: insets.top }}>
          <WhiteBackground />
          <BlackBackground />
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
            renderItem={({ item, index }) => {
              const styles =
                index === sections.length - 1
                  ? {
                      backgroundColor: color("white100"),
                      paddingBottom: 30,
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                    }
                  : { backgroundColor: color("white100") }
              return <Box style={styles}>{renderItem(item)}</Box>
            }}
            ListFooterComponent={() => <AllCaughtUp navigation={navigation} />}
          />
        </Box>
      </Animatable.View>
    </Container>
  )
}

const BlackBackground = styled(Box)`
  background-color: ${color("black100")};
  height: 80%;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`

const WhiteBackground = styled(Box)`
  background-color: ${color("white100")};
  height: 100px;
  top: -100px;
  z-index: -1;
  left: 0;
  right: 0;
  position: absolute;
`
