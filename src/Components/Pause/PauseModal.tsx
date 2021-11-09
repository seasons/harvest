import {
  Box, Button, CloseButton, Container, Flex, Sans, SectionHeader, Spacer
} from "App/Components"
import { PauseModal_Query as PauseModal_Query_Type } from "App/generated/PauseModal_Query"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Schema } from "App/Navigation/schema"
import { GET_MEMBERSHIP_INFO } from "App/Scenes/Account/MembershipInfo/MembershipInfo"
import { screenTrack } from "App/utils/track"
import { ListCheck } from "Assets/svgs/ListCheck"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { Dimensions, ScrollView, Text } from "react-native"

import { useMutation, useQuery } from "@apollo/client"
import * as Sentry from "@sentry/react-native"

import { PauseReasonPupUp, PauseReasonPupUpFragment_Query } from "./PauseReasonPopUp"

const viewWidth = Dimensions.get("window").width

enum PauseType {
  WithItems = "WithItems",
  WithoutItems = "WithoutItems",
}

const PAUSE_MEMBERSHIP = gql`
  mutation PauseSubscription($subscriptionID: String!, $pauseType: PauseType, $reasonID: ID) {
    pauseSubscription(subscriptionID: $subscriptionID, pauseType: $pauseType, reasonID: $reasonID)
  }
`

const PauseModal_Query = gql`
  query PauseModal_Query {
    ...PauseReasonPupUpFragment_Query
  }
  ${PauseReasonPupUpFragment_Query}
`

export const PauseModal = screenTrack()(({ navigation, route }) => {
  const customer = route?.params?.customer
  const [showReasonPopUp, setShowReasonPopUp] = useState(false)
  const [reasonID, setReasonID] = useState(null)
  const [pauseType, setPauseType] = useState(null)
  const [withItemsMutating, setWithItemsMutating] = useState(false)
  const [withoutItemsMutating, setWithoutItemsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const { previousData, data = previousData } = useQuery<PauseModal_Query_Type>(PauseModal_Query)

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
          viewState: pauseType,
          billingDate,
        },
      })
      setWithoutItemsMutating(false)
      setWithItemsMutating(false)
    },
    onError: (err) => {
      let popUpData
      if (err.message.includes("You must have reserved items to pause with items")) {
        popUpData = {
          title: "You must have reserved items",
          note: "You must have reserved items to pause with items.",
          buttonText: "Close",
          onClose: () => hidePopUp(),
        }
      } else {
        popUpData = {
          title: "Oops!",
          note: "There was an error pausing your membership, please contact us.",
          buttonText: "Close",
          onClose: () => hidePopUp(),
        }
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setWithoutItemsMutating(false)
      setWithItemsMutating(false)
    },
  })

  const onPause = () => {
    setShowReasonPopUp(false)
    pauseSubscription({
      variables: {
        subscriptionID: customer?.membership.subscriptionId,
        pauseType,
        reasonID,
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
              setShowReasonPopUp(true)
              setPauseType(PauseType.WithItems)
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
              setShowReasonPopUp(true)
              setPauseType(PauseType.WithoutItems)
            }}
          >
            Pause without items
          </Button>
          <Spacer mb={3} />
          <Sans color="black50" size="2">
            {`If we do not receive your items back before ${billingDate}, your membership will automatically resume and you will be billed. If you have any questions contact at membership@seasons.nyc`}
          </Sans>
          <Spacer mb={60} />
        </Flex>
      </ScrollView>
      <PauseReasonPupUp
        onSubmit={onPause}
        reasonID={reasonID}
        show={showReasonPopUp}
        pauseReasons={data?.pauseReasons}
        setReasonID={setReasonID}
        setShowReasonPopUp={setShowReasonPopUp}
      />
    </Container>
  )
})
