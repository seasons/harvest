import React from "react"
import { Flex } from "../components/Flex"
import { Sans } from "../components/Sans"
import { Container } from "../components/Container"

export class Profile extends React.Component {
  render() {
    return (
      <Container>
        <Flex>
          <Sans>Kieran Gillen</Sans>
          <Sans>Brooklyn, NY</Sans>
        </Flex>
      </Container>
    )
  }
}
