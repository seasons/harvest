import React from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { EmptyState } from "./Components.tsx"
import { Theme, Spacer, Flex, Box } from "App/Components"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const GET_BAG = gql`
  {
    bag @client {
      items {
        id
      }
    }
  }
`

export const Bag = () => {
  const { data } = useQuery(GET_BAG)
  console.log("data?????", data)
  const bagIsEmpty = !data || !data.products || data.products.length === 0
  const remainingPieces = 3
  return (
    <Theme>
      <Container>
        <Box p={2} style={{ flex: 1 }}>
          <Spacer mb={3} />
          <Sans size="3" color="black">
            My bag
          </Sans>
          <Sans size="2" color="gray">
            You have {remainingPieces} pieces remaining
          </Sans>
          {bagIsEmpty && (
            <Flex flex={1} flexDirection="column" justifyContent="center" alignContent="center">
              <EmptyState />
            </Flex>
          )}
        </Box>
      </Container>
    </Theme>
  )
}
