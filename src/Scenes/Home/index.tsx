import { Box } from "App/Components"
import { CategoriesRail } from "./Components/CategoriesRail"
import { Container } from "Components/Container"
import { FlatList } from "react-native"
import { CollectionsRail } from "./Components/CollectionsRail"
import { ProductsRail } from "./Components/ProductsRail"
import { BrandsRail } from "./Components/BrandsRail"
import { LogoText } from "Components/Typography"
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { color } from "App/Utils"
import { AllCaughtUp } from "./Components/AllCaughtUp"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import styled from "styled-components/native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import { Loader } from "App/Components/Loader"

const GET_HOMEPAGE = gql`
  query Homepage {
    categories(where: { visible: true }) {
      id
      slug
      name
      image
      children {
        slug
      }
    }
    homepage {
      sections {
        title
        type
        results {
          ... on Collection {
            id
            slug
            images
            title
            subTitle
          }
          ... on Product {
            id
            images
            brand {
              name
            }
            name
            color {
              name
            }
            retailPrice
          }
        }
      }
    }
  }
`

export const HomeComponent = (props: any) => {
  const [sections, setSections] = useState([])
  const [showLoader, toggleLoader] = useState(true)
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})
  const insets = useSafeArea()

  useEffect(() => {
    if (data && data.homepage) {
      const dataSections = data.homepage.sections
      if (data.categories && dataSections) {
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
    const { navigation } = props
    switch (item.type) {
      case "CollectionGroups":
        return <CollectionsRail navigation={navigation} items={item.results} />
      case "Categories":
        return <CategoriesRail navigation={navigation} categories={item.results} screenProps={props.screenProps} />
      case "Brands":
        return <BrandsRail title={item.title} navigation={navigation} items={item.results} />
      case "Products":
      case "HomepageProductRails":
        return <ProductsRail title={item.title} navigation={navigation} items={item.results} />
    }
  }

  return (
    <Container>
      <Animatable.View animation="fadeIn" duration={300}>
        <Box style={{ position: "relative", backgroundColor: "rgba(0,0,0,0)", paddingTop: insets.top }}>
          <WhiteBackground />
          <BlackBackground />
          <Box p={2} style={{ backgroundColor: color("white") }}>
            <LogoText>SEASONS</LogoText>
          </Box>
          <FlatList
            data={sections}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => {
              const styles =
                index === sections.length - 1
                  ? {
                      backgroundColor: color("white"),
                      paddingBottom: 30,
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                    }
                  : { backgroundColor: color("white") }
              return <Box style={styles}>{renderItem(item)}</Box>
            }}
            ListFooterComponent={() => <AllCaughtUp navigation={props.navigation} />}
          />
        </Box>
      </Animatable.View>
    </Container>
  )
}

const BlackBackground = styled(Box)`
  background-color: ${color("black")};
  height: 50%;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`

const WhiteBackground = styled(Box)`
  background-color: ${color("white")};
  height: 100px;
  top: -100px;
  z-index: -1;
  left: 0;
  right: 0;
  position: absolute;
`

const mapStateToProps = state => {
  const { bag } = state
  return { bag }
}

export const Home = connect(mapStateToProps)(HomeComponent)

// postgres://mtbiihcqbrfjiu:b96b56ff6e890953a3e2964edb921cac53320d78e31653abae9490dcfba66a0a@ec2-174-129-218-200.compute-1.amazonaws.com:5432/d3h716dmvtgnrr
