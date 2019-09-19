import React from "react"
import { Text, FlatList, View } from "react-native"
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
            data={[{ url: "" }, {}, {}, {}, {}]}
            renderItem={() => {
              return <ImageContainer></ImageContainer>
            }}
            contentContainerStyle={{ padding: 20 }}
            horizontal
          />
        )
    }
  }

  const sections = [
    {
      type: "header",
      data: {},
    },
  ]

  return (
    <Container>
      <Text>SEASONS</Text>
      <Theme>
        <FlatList data={sections} keyExtractor={item => item.type} renderItem={item => renderItem(item)} />
      </Theme>
    </Container>
  )
}

const ImageContainer = styled.View`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
