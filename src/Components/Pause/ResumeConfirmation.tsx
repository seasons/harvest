import { Box, Container, Flex, Sans, Spacer } from "App/Components"
import { CheckCircled } from "Assets/svgs"
import React from "react"

import { useNavigation } from "@react-navigation/native"

import { Button } from "../Button"

export const ResumeConfirmation: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between" px={2}>
          <Box>
            <Spacer mb={100} />
            <CheckCircled />
            <Spacer mb={3} />
            <Sans size="3">Welcome back</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              Your membership has been reactivated and you’re ready to reserve your next order.
            </Sans>
          </Box>
          <Box>
            <Sans size="1" color="black50">
              Your credit card has been succesfully billed and your membership will automatically renew.
            </Sans>
            <Spacer mb={3} />
            <Button block onPress={() => navigation.goBack()}>
              Start reserving
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
