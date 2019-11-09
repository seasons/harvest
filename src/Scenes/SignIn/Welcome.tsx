import React from "react"
import { Box, Spacer, Button, Container } from "App/Components"
import LottieView from "lottie-react-native"
import { Sans } from "Components/Typography"
import styled from "styled-components/native"
import { color } from "App/Utils"

export const Welcome = ({ navigation }) => {
  const handleJoinWaitlist = () => {}
  return (
    <Container>
      <Wrapper>
        <Box m={2} mt={4}>
          <Sans color="white" size="3">
            This is seasons.
          </Sans>
          <Sans size="3" color="gray">
            A member only rental subscription service for menswear and streetwear.
          </Sans>
          <Spacer mb={2} />
          <Button onPress={() => navigation.navigate("SignIn")} variant="primaryLight">
            Sign in
          </Button>
          <Spacer mb={2} />
          <Button onPress={handleJoinWaitlist} variant="secondaryLight">
            Join the waitlist
          </Button>
        </Box>
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${color("black")};
`
