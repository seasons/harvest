import { Box } from "App/Components"
import { CategoriesRail } from "./Components/CategoriesRail"
import { Container } from "Components/Container"
import { FlatList, AppState } from "react-native"
import { HeroRail } from "./Components/HeroRail"
import { ProductsRail } from "./Components/ProductsRail"
import { BrandsRail } from "./Components/BrandsRail"
import { LogoText } from "Components/Typography"
import React, { useEffect } from "react"
import { persistCache } from "App/helpers/asyncStorage"
import { connect } from "react-redux"
import { color } from "App/Utils"
import { AllCaughtUp } from "./Components/AllCaughtUp"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import styled from "styled-components/native"

const GET_HOMEPAGE = gql`
  query Homepage {
    homepage {
      sections {
        title
        type
        results {
          ... on Brand {
            id
            logo
            brandCode
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
          ... on Hero {
            id
            heroImageURL
          }
        }
      }
    }
  }
`

export const HomeComponent = (props: any) => {
  const { loading, error, data } = useQuery(GET_HOMEPAGE, {})
  console.log("data", data)

  if (loading || !data) {
    return null
  }

  if (error) {
    console.error("error /home/index.tsx: ", error)
  }

  const renderItem = item => {
    const { navigation } = props
    switch (item.type) {
      case "Hero":
        return <HeroRail navigation={navigation} items={item.results} />
      case "Categories":
        return <CategoriesRail navigation={navigation} categories={item.results} />
      case "Brands":
        return <BrandsRail title={item.title} navigation={navigation} items={item.results} />
      case "Products":
        return <ProductsRail title={item.title} navigation={navigation} items={item.results} />
    }
  }

  const { sections } = data.homepage

  return (
    <Container>
      <Box style={{ position: "relative", backgroundColor: "rgba(0,0,0,0)" }}>
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
