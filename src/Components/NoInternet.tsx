import { Box, Button, Sans } from "App/Components"
import React from "react"
import styled from "styled-components/native"
import { Spacer } from "./Spacer"

export const NoInternet = ({ refreshAction = () => {} }) => {
  return (
    <Container>
      <Sans size="3">No Internet Connection</Sans>
      <Spacer mb={2} />
      <Sans size="2" px={5} textAlign="center" color="black50">
        Check your internet connection and try tapping refresh below
      </Sans>
      <Spacer mb={4} />
      <Button size="large" variant="primaryWhite" onPress={refreshAction}>
        <Sans size="1">Refresh</Sans>
      </Button>
    </Container>
  )
}

const Container = styled(Box)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
