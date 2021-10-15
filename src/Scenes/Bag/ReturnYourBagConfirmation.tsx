import { Box, Container, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import React from "react"
import { ScrollView, Dimensions, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { gql, useQuery } from "@apollo/client"

import {
  ReturnYourBagConfirmationItem,
  ReturnYourBagConfirmationItemFragment_PhysicalProduct,
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

const windowWidth = Dimensions.get("window").width

const returnSteps = [
  "Pack up the items you’re returning into your bag — accessory boxes & hangers included!",
  "Swap the pre-paid return label in the front pocket of your bag — it should be behind your shipping label.",
  "Drop off at the nearest UPS pickup location.",
  "When UPS scans the return label, your app will update with the tracking details. After we receive and process your return, your bag will be reset and you can place a new reservation.",
]

export const ReturnYourBagConfirmation = screenTrack()((props) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content")
    }, [])
  )

  const tracking = useTracking()
  const { previousData, data = previousData } = useQuery(RETURNED_ITEMS)

  if (!data) {
    return <Loader />
  }

  const items = data?.me?.activeReservation.returnedProducts

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex style={{ flex: 1 }} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckCircled />
          <Box my={5}>
            <Sans size="7" color="black100">
              Let’s pack up your items
            </Sans>
            <Spacer mb={1} />
            <Sans size="4" color="black50" lineHeight={28}>
              Your order summary and return instructions are below. Contact us if you have any questions!
            </Sans>
          </Box>
          <Box mb={5}>
            <Sans size="4">Selected items</Sans>
            <Spacer mb={0.5} />
            <Separator />
            <Box mt={1}>
              {items?.map((item, i) => {
                return (
                  <Box key={item.id}>
                    <ReturnYourBagConfirmationItem physicalProduct={item} />
                    <Spacer mb={1} />
                  </Box>
                )
              })}
            </Box>
          </Box>

          <Box mb={3}>
            <Sans size="4" color="black100">
              How to return your bag
            </Sans>
            <Spacer mb={0.5} />
            <Separator />

            <Box my={3}>
              {returnSteps.map((step, index) => {
                return (
                  <Flex flexDirection="row" mb={3}>
                    <Box width={36}>
                      <Sans underline size="4">
                        0{index + 1}
                      </Sans>
                    </Box>
                    <Box width={windowWidth - 80}>
                      <Sans size="4" color="black50">
                        {step}
                      </Sans>
                    </Box>
                  </Flex>
                )
              })}
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
