import React from "react"
import { Sans } from "../../components/Typography"
import { Flex } from "../../components/Flex"

export class Profile extends React.Component {
  render() {
    return (
      <>
        <Flex>
          <Sans size="1" color="black">
            Kieran Gillen
          </Sans>
          <Sans size="2">Brooklyn, NY</Sans>
        </Flex>
      </>
    )
  }
}
