import { Flex, Container, Sans, Box, Spacer, Button } from "App/Components"
import React from "react"
import { GreenCheck } from "Assets/svgs"
import { color } from "App/utils"
import { useNavigation } from "@react-navigation/native"

export const ExtendPauseConfirmation: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation()
  const dueDate = route?.params?.dueDate || "the end of your subscription term"

  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex px={2} style={{ flex: 1 }} flexDirection="column" justifyContent="space-between">
          <Box>
            <Spacer mb={100} />
            <GreenCheck backgroundColor={color("black100")} />
            <Spacer mb={3} />
            <Sans size="3">Your membership is paused for another month</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              {`It will automatically resume on ${dueDate}.`}
            </Sans>
          </Box>
          <Box>
            <Sans size="1" color="black50">
              If you change your mind, you can still resume your membership before this date.
            </Sans>
            <Spacer mb={2} />
            <Button block onPress={() => navigation.goBack()}>
              Finish
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
