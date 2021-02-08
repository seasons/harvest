import { Box, Button, CloseButton, Container, Flex, Sans, SectionHeader, Spacer } from "App/Components"
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { screenTrack } from "App/utils/track"
import { Dimensions, Linking, ScrollView } from "react-native"
import { ListCheck } from "Assets/svgs/ListCheck"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { Schema } from "App/Navigation"
import * as Sentry from "@sentry/react-native"

const viewWidth = Dimensions.get("window").width

const PAUSE_MEMBERSHIP = gql`
  mutation PauseSubscription($subscriptionID: String!) {
    pauseSubscription(subscriptionID: $subscriptionID)
  }
`

export const PauseModal = screenTrack()(({ navigation }) => {
  const [withItemsMutating, setWithItemsMutating] = useState(false)
  const [withoutItemsMutating, setWithoutItemsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const billingDate = ""
  const pauseWithItemPrice = ""
  const dueDate = ""

  const checkLines = [
    "Extend or resume anytime",
    "Buy items anytime with a member discount",
    "Earn loyalty rewards over time",
  ]

  const [pauseSubscription] = useMutation(PAUSE_MEMBERSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      navigation.navigate("Modal", {
        screen: Schema.PageNames.PauseConfirmation,
        params: { dueDate },
      })
      setWithoutItemsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error pausing your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setWithoutItemsMutating(false)
    },
  })

  const onPauseWithItems = () => {
    return null
  }

  const onPauseWithoutItems = () => {
    return null
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Spacer mb={80} />
        <Box pb={1}>
          <Sans size="7" color="black100">
            {`Pause your membership for a month starting ${billingDate}`}
          </Sans>
        </Box>
        <Box mb={4}>
          <Sans size="4" color="black50">
            If you have any questions, contact us below at membership@seasons.nyc
          </Sans>
        </Box>
        <Spacer mb={4} />
        <Flex flexDirection="column">
          {checkLines.map((line) => {
            return (
              <Flex flexDirection="row" pb={1} px={1} alignItems="center" key={line} width="100%">
                <Box mx={1} mr={1.5}>
                  <ListCheck />
                </Box>
                <Sans color="black50" size="4" style={{ width: viewWidth - 75 }}>
                  {line}
                </Sans>
              </Flex>
            )
          })}
        </Flex>
        <Spacer mb={4} />
        <SectionHeader title="Keep your items at home" />
        <Spacer mb={1} />
        <Sans color="black50" size="4">
          {`Hold onto your items while your membership is paused for only ${pauseWithItemPrice} per month`}
        </Sans>
        <Spacer mb={2} />
        <Button block variant="primaryBlack" onPress={onPauseWithItems}>
          Pause with items
        </Button>
        <Spacer mb={4} />
        <SectionHeader title="Or return your current order" />
        <Spacer mb={1} />
        <Sans color="black50" size="4">
          Send back your items and skip next month's bill.
        </Sans>
        <Button block variant="primaryWhite" onPress={onPauseWithoutItems}>
          Pause without items
        </Button>
        <Spacer mb={4} />
        <Sans color="black50" size="2">
          {`If we do not receive your items back before ${billingDate}, your membership will automatically resume nad you will be billed. If you have any questions contact us below at membership@seasons.nyc`}
        </Sans>
        <Spacer mb={4} />
        <Button
          block
          variant="primaryWhite"
          onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)}
        >
          Contact us
        </Button>
        <Spacer mb={4} />
      </ScrollView>
    </Container>
  )
})
