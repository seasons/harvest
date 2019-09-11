import React from "react"
import { Text } from "native-base"
import { Flex } from "../components/Flex"

export class Profile extends React.Component {
  render() {
    return (
      <>
        <Flex>
          <Text large>Kieran Gillen</Text>
          <Text lightGray>Brooklyn, NY</Text>
        </Flex>
      </>
    )
  }
}
