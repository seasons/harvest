import React from "react"
import { Container } from "Components/Container"
import { Sans } from "Components/Typography"
import { EmptyState } from "./Components.tsx"
import { Theme, Spacer, Flex, Box } from "App/Components"

export class Bag extends React.Component {
  render() {
    const bagIsEmpty = true
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
}
