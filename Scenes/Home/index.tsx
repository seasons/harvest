import React from "react"
import { FlatList } from "react-native"
import { Container } from "../../components/Container"
import { Box } from "../../components"
import { Theme } from "../../components/Theme"
import styled from "styled-components/native"
import { CategoriesRail } from "./Components/CategoriesRail"
import { JustAddedRail } from "./Components/JustAddedRail"
import { HeroRail } from "./Components/HeroRail"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

export const Home = () => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "header":
        return <HeroRail items={item.data} />

      case "categories":
        return <CategoriesRail categories={item.data} />

      case "just-added":
        return <JustAddedRail items={item.data} />
    }
  }

  const sections = [
    {
      type: "header",
      data: [
        { id: 1, url: "https://i.pinimg.com/564x/ef/84/64/ef84647415e51db15a87993393aa8fe2.jpg" },
        { id: 2, url: "https://i.pinimg.com/564x/f5/ba/30/f5ba30d71615c639199887f5e7cb2608.jpg" },
        { id: 3, url: "https://i.pinimg.com/564x/9e/de/54/9ede54d2e658c7b73c49f0c7051f0f3f.jpg" },
        { id: 4, url: "https://i.pinimg.com/564x/d8/ad/60/d8ad6000717d71e36fb828bfc1a64432.jpg" },
        { id: 5, url: "https://i.pinimg.com/564x/1e/ac/c1/1eacc1e8b6d30435c88cf0ef5a58a7de.jpg" },
      ],
    },
    {
      type: "categories",
      data: ["Coats", "Jackets", "Sweatshirts", "Tees"],
    },
    {
      type: "just-added",
      data: [
        {
          imageUrl:
            "https://media.endclothing.com/media/catalog/product/2/0/20-07-2019_helmutlang_printsidetee_white_red_j06dm505_ja_m1.jpg",
          colorway: "White & Red",
          productName: "Print Side Tee",
          brandName: "Helmut Lang",
          price: "$189",
        },
        {
          imageUrl:
            "https://media.endclothing.com/media/catalog/product/1/1/11-09-2019_aimeleondore_distressedpopoverhoody_royaltypurple_ald-ch004-pr_th_m1.jpg",
          productName: "Distressed Popover Hoodie",
          brandName: "Aimé Leon",
          colorway: "Royalty Purple",
          price: "$255",
        },
      ],
    },
  ]

  const GET_PRODUCTS = gql`
    query products {
      edges {
        node {
          id
          title
        }
      }
    }
  `

  const { loading, data } = useQuery(GET_PRODUCTS)

  return (
    <Theme>
      <Container>
        <Box ml={2}>
          <Box my={2}>
            <LogoText>SEASONS</LogoText>
          </Box>
          <Theme>
            <FlatList
              data={sections}
              contentContainerStyle={{ paddingBottom: 150 }}
              keyExtractor={item => item.type}
              renderItem={item => renderItem(item)}
            />
          </Theme>
        </Box>
      </Container>
    </Theme>
  )
}

const LogoText = styled.Text`
  font-family: "Apercu-Mono";
  font-size: 20;
  letter-spacing: 2;
  line-height: 24;
  color: #101010;
`
