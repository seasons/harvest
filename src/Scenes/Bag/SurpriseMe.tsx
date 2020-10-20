import { gql } from "apollo-boost"
import { CloseButton, Container } from "App/Components"
import { Box } from "App/Components/Box"
import React from "react"
import { useQuery } from "react-apollo"

export const GET_SURPRISE_PRODUCTS = gql`
  query GetSurpriseProducts {
    surpriseProducts {
      id
      name
    }
  }
`

export const SurpriseMe = () => {
  const { data } = useQuery(GET_SURPRISE_PRODUCTS)

  console.log("data", data)

  return (
    <>
      <CloseButton variant="light" />
      <Container insetsBottom={false} insetsTop={false}>
        <Box style={{ flex: 1 }}></Box>
      </Container>
    </>
  )
}
