import { Box, Button, CloseButton, Container, Flex, Sans, SectionHeader, Spacer } from "App/Components"
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { screenTrack } from "App/utils/track"
import { Dimensions, Linking, ScrollView, Text } from "react-native"
import { ListCheck } from "Assets/svgs/ListCheck"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { Schema } from "App/Navigation"
import * as Sentry from "@sentry/react-native"
import { DateTime } from "luxon"

const viewWidth = Dimensions.get("window").width

enum PauseType {
  WithItems = "WithItems",
  WithoutItems = "WithoutItems",
}

const PAUSE_MEMBERSHIP = gql`
  mutation PauseSubscription($subscriptionID: String!, $pauseType: PauseType) {
    pauseSubscription(subscriptionID: $subscriptionID, pauseType: $pauseType)
  }
`

export const PauseModal = screenTrack()(({ navigation, route }) => {
  const customer = route?.params?.customer
  const [viewState, setViewState] = useState(null)
  const [withItemsMutating, setWithItemsMutating] = useState(false)
  const [withoutItemsMutating, setWithoutItemsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const nextBilling = customer?.membership?.subscription?.nextBillingAt
  const billingDate = nextBilling && DateTime.fromISO(nextBilling).toFormat("LLLL d")
  const pauseWithItemPrice = (customer?.membership?.plan?.pauseWithItemsPrice / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

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
      navigation.pop()
      navigation.navigate("Modal", {
        screen: Schema.PageNames.PauseConfirmation,
        params: {
          viewState,
          billingDate,
        },
      })
      setWithoutItemsMutating(false)
      setWithItemsMutating(false)
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
      setWithItemsMutating(false)
    },
  })

  const onPause = (pauseType: PauseType) => {
    pauseSubscription({
      variables: {
        subscriptionID: customer?.membership.subscriptionId,
        pauseType,
      },
    })
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Flex style={{ flex: 1 }} px={2}>
          <Spacer mb={100} />
          <Box pb={1}>
            <Sans size="7" color="black100">
              {`Pause your membership for a month starting `}
              <Text style={{ textDecorationLine: "underline" }}>{billingDate}</Text>
            </Sans>
          </Box>
          <Box mb={3}>
            <Sans size="4" color="black50">
              If you have any questions, contact us below at membership@seasons.nyc.
            </Sans>
          </Box>
          <Flex flexDirection="column">
            {checkLines.map((line) => {
              return (
                <Flex flexDirection="row" pb={1} alignItems="center" key={line} width="100%">
                  <Box mr={1.5}>
                    <ListCheck />
                  </Box>
                  <Sans color="black50" size="4" style={{ width: viewWidth - 75 }}>
                    {line}
                  </Sans>
                </Flex>
              )
            })}
          </Flex>
          <Spacer mb={3} />
          <SectionHeader title="Keep your items at home" />
          <Spacer mb={1} />
          <Sans color="black50" size="4">
            {`Hold onto your items while your membership is paused for only ${pauseWithItemPrice} per month`}
          </Sans>
          <Spacer mb={2} />
          <Button
            block
            variant="primaryBlack"
            onPress={() => {
              if (withItemsMutating || withoutItemsMutating) {
                return
              }
              setWithItemsMutating(true)
              setViewState(PauseType.WithItems)
              onPause(PauseType.WithItems)
            }}
          >
            Pause with items
          </Button>
          <Spacer mb={4} />
          <SectionHeader title="Or return your current order" />
          <Spacer mb={1} />
          <Sans color="black50" size="4">
            Send back your items and skip next month's bill.
          </Sans>
          <Spacer mb={2} />
          <Button
            block
            variant="primaryWhite"
            onPress={() => {
              if (withItemsMutating || withoutItemsMutating) {
                return
              }
              setWithoutItemsMutating(true)
              setViewState(PauseType.WithoutItems)
              onPause(PauseType.WithoutItems)
            }}
          >
            Pause without items
          </Button>
          <Spacer mb={4} />
          <Sans color="black50" size="2">
            {`If we do not receive your items back before ${billingDate}, your membership will automatically resume and you will be billed. If you have any questions contact us below at membership@seasons.nyc`}
          </Sans>
          <Spacer mb={2} />
          <Button
            block
            variant="primaryWhite"
            onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)}
          >
            Contact us
          </Button>
          <Spacer mb={60} />
        </Flex>
      </ScrollView>
    </Container>
  )
})
