import { Flex, Container, Sans, Box, Spacer, Button } from "App/Components"
import React from "react"
import { GreenCheck } from "Assets/svgs"
import { Linking } from "react-native"
import { color } from "App/utils"
import { useNavigation } from "@react-navigation/native"

export const PauseConfirmation: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation()
  const dueDate = route?.params?.dueDate || "the end of your subscription term"

  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between" px={2}>
          <Box>
            <Spacer mb={100} />
            <GreenCheck backgroundColor={color("black100")} />
            <Spacer mb={3} />
            <Sans size="3">You’ve successfully paused your membership</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              {`If you have an active reservation, please remember to return your items before ${dueDate}.`}
            </Sans>
          </Box>
          <Box>
            <Sans size="1" color="black50">
              If we do not receive your items back on or before this date, your membership will automatically resume and
              you will be billed. If you have any questions, contact us below at membership@seasons.nyc
            </Sans>
            <Spacer mb={3} />
            <Button block onPress={() => navigation.goBack()}>
              Finish
            </Button>
            <Spacer mb={1} />
            <Button
              block
              variant="primaryWhite"
              onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)}
            >
              Contact us
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
