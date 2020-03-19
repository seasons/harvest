import {
  Box, CloseButton, Container, FixedButton, Flex, Sans, Separator, Spacer
} from "App/Components"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import styled from "styled-components/native"

import { BagItem } from "../Bag/Components/BagItem"

const GET_CUSTOMER_RESERVATION_CONFIRMATION = gql`
  query GetCustomerReservationConfirmation($reservationID: ID!) {
    me {
      user {
        firstName
        lastName
        email
      }
      customer {
        id
        detail {
          phoneNumber
          shippingAddress {
            slug
            name
            address1
            address2
            city
            state
            zipCode
          }
        }
        reservations(where: { id: $reservationID }) {
          id
          reservationNumber
          products {
            id
            productVariant {
              id
              product {
                name
                id
                modelSize {
                  display
                }
                brand {
                  id
                  name
                }
                images
                variants {
                  id
                  size
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ReservationConfirmation = screenTrack()(props => {
  const reservationID = get(props, "route.params.reservationID", "ck2tvabt6172l07017jcsr2a1")
  const tracking = useTracking()
  const { data } = useQuery(GET_CUSTOMER_RESERVATION_CONFIRMATION, {
    variables: {
      reservationID,
    },
  })

  const customer = get(data, "me.customer")
  const address = get(customer, "detail.shippingAddress", {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const reservation = get(data, "me.customer.reservations[0]", { reservationNumber: "", products: [] })

  const items = reservation?.products ?? []

  const SectionHeader = ({ title }) => {
    return (
      <>
        <Flex flexDirection="row" flex={1} width="100%">
          <Sans size="2" color="black">
            {title}
          </Sans>
        </Flex>
        <Spacer mb={1} />
        <Separator color="#e5e5e5" />
      </>
    )
  }

  const content = (
    <>
      <Flex flex={1} p={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Box>
            <Flex flexDirection="row" flex={1} width="100%">
              <Sans size="2" color="black">
                Order number
              </Sans>
              <Sans size="2" color="black" ml="auto">
                {reservation.reservationNumber}
              </Sans>
            </Flex>
            <Spacer mb={1} />
            <Separator color="#e5e5e5" />
          </Box>
          <Box>
            <Flex flexDirection="row" flex={1} width="100%">
              <Box py={1}>
                <Sans size="2" color="black">
                  Shipping
                </Sans>
              </Box>
              <Box ml="auto" py={1}>
                <Sans size="2" color="gray" mt={1} textAlign="right">
                  {`${address.address1} ${address.address2}`}
                </Sans>
                <Sans size="2" color="gray" textAlign="right">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            </Flex>
            <Spacer mb={1} />
            <Separator color="#e5e5e5" />
          </Box>
          <Box>
            <Flex flexDirection="row" flex={1} width="100%" py={1}>
              <Sans size="2" color="black">
                Delivery
              </Sans>
              <Sans size="2" color="black" ml="auto">
                {`UPS Ground - 2 day shipping`}
              </Sans>
            </Flex>
            <Spacer mb={1} />
          </Box>
          <Box mt={4} mb={5}>
            <SectionHeader title="Items" />
            <Box mt={2} mb="80">
              {items.map((item, i) => {
                return (
                  <Box key={item.id}>
                    <BagItem hideButtons removeItemFromBag={() => null} sectionHeight={200} index={i} bagItem={item} />
                    <Spacer mb={2} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
    </>
  )

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="black100">
      <CloseButton navigation={props.navigation} />
      <Box style={{ marginTop: 60 }} m={2}>
        <Sans size="3" color="white">
          We've got your order!
        </Sans>
        <Sans size="1" color="gray">
          We've emailed you a confirmation and we'll notify you when its out for delivery.
        </Sans>
      </Box>
      <Content>{content}</Content>
      <FixedButton
        positionBottom={space(4)}
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ReservationConfirmationDoneButtonTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          props.navigation.navigate("Bag", { reservationID: reservationID })
        }}
        block
      >
        Done
      </FixedButton>
    </Container>
  )
})

const Content = styled(Box)`
  background: white;
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  overflow: hidden;
  flex: 1;
`
