import React from "react"
import { Image, FlatList, ScrollView } from "react-native"
import { Container } from "../../components/Container"
import { Box } from "../../components"
import { Sans } from "../../components/Sans"
import { Theme } from "../../components/Theme"
import styled from "styled-components/native"

export const Home = () => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "header":
        return (
          <FlatList
            data={item.data}
            renderItem={({ item }) => {
              return (
                <Box mr={2}>
                  <ImageContainer source={{ uri: item.url }}></ImageContainer>
                </Box>
              )
            }}
            keyExtractor={({ id }) => id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )

      case "categories":
        return (
          <Box my={2}>
            <Sans>Categories</Sans>
            <Box mt={2}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, width: "100%", height: 130 }}
              >
                {item.data.map(category => {
                  return (
                    <Box mr={1}>
                      <CategoryContainer />
                      <Sans size="small" style={{ textAlign: "center" }}>
                        {category}
                      </Sans>
                    </Box>
                  )
                })}
              </ScrollView>
            </Box>
          </Box>
        )
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
  ]

  return (
    <Theme>
      <Container>
        <Box ml={2}>
          <Box my={2}>
            <LogoText>SEASONS</LogoText>
          </Box>
          <Theme>
            <FlatList data={sections} keyExtractor={item => item.type} renderItem={item => renderItem(item)} />
          </Theme>
        </Box>
      </Container>
    </Theme>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`

const LogoText = styled.Text`
  font-family: "Apercu-Mono";
  font-size: 20;
  letter-spacing: 2;
  line-height: 24;
  color: #101010;
`

const CategoryContainer = styled.View`
  height: 92;
  width: 92;
  border-radius: 46;
  background: rgba(0, 0, 0, 0.1);
  /* background-color: red; */
`
