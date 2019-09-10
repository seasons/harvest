import React, { Component } from "react"
import { Container, Header, Content, List, ListItem, Text } from "native-base"
import { Navigation } from "react-native-navigation"

export const Palette = () => {
  return (
    <Container>
      <Header></Header>
      <Content>
        <List>
          <ListItem>
            <Text>CTAs</Text>
          </ListItem>
          <ListItem>
            <Text>Typography</Text>
          </ListItem>
          <ListItem>
            <Text>Type Fields</Text>
          </ListItem>
          <ListItem>
            <Text>Tables</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}

Navigation.registerComponent("Palette", () => Palette)
