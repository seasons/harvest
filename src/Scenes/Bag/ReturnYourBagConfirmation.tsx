import { Box, Container, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import React from "react"
import { ScrollView } from "react-native"

import { gql, useQuery } from "@apollo/client"

import {
  ReturnYourBagConfirmationItem, ReturnYourBagConfirmationItemFragment_PhysicalProduct
} from "./Components/ReturnYourBagConfirmationItem"

export const RETURNED_ITEMS = gql`
  query ReturnedItems {
    me {
      id
      activeReservation {
        id
        shipped
        createdAt
        returnedProducts {
          ...ReturnYourBagConfirmationItem
        }
      }
    }
  }
  ${ReturnYourBagConfirmationItemFragment_PhysicalProduct}
`

export const ReturnYourBagConfirmation = screenTrack()((props) => {
  const tracking = useTracking()
  const { previousData, data = previousData, loading } = useQuery(RETURNED_ITEMS)

  if (loading) {
    return <Loader />
  }

  const items = data?.me?.activeReservation.returnedProducts
  console.log(items)

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex style={{ flex: 1 }} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckCircled />
          <Box my={4}>
            <Sans size="7" color="black100">
              Let’s pack up your items
            </Sans>
            <Spacer mb={2} />
            <Sans size="5" color="black50" lineHeight={28}>
              Your order summary and return instructions are below. Contact us if you have any questions!
            </Sans>
          </Box>
          <Spacer pb={4} />

          <Box mb={3}>
            <Sans size="5">Items</Sans>
            <Spacer mb={1} />
            <Separator />
            <Box mt={1}>
              {items?.map((item, i) => {
                return (
                  <Box key={item.id}>
                    <ReturnYourBagConfirmationItem physicalProduct={item} />
                    <Spacer mb={1} />
                    <Separator />
                    <Spacer mb={1} />
                  </Box>
                )
              })}
            </Box>
          </Box>

          <Box mb={3}>
            <Sans size="7" color="black100">
              How to return your bag
            </Sans>

            <Box my={4}>
              <Sans size="4">Step 1.</Sans>
              <Sans size="4" color="black50">
                Place the items your returning in the bag with the hangers included.
              </Sans>
              <Spacer mt={4} />

              <Sans size="4">Step 2.</Sans>
              <Sans size="4" color="black50">
                Insert the return shipping label into the front sleeve on the outside of the bag.
              </Sans>
              <Spacer mt={4} />

              <Sans size="4">Step 3.</Sans>
              <Sans size="4" color="black50">
                Drop off at your nearest UPS pick-up location.
              </Sans>
              <Spacer mt={6} />
              <Sans size="4" color="black50">
                Once we’ve receive and process your items, we’ll send you a confirmation and your bag will be reset for
                you to place your next order.
              </Sans>
              <Spacer mt={"80px"} />
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <FixedButton
        positionBottom={space(2)}
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ReservationConfirmationDoneButtonTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          props.navigation.navigate("Bag")
        }}
        block
      >
        Done
      </FixedButton>
    </Container>
  )
})
