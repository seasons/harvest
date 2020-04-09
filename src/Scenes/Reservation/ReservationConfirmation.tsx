import { Box, Container, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { GreenCheck } from "Assets/svgs"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { ReservationItem } from "./Components/ReservationItem"

const GET_CUSTOMER_RESERVATION_CONFIRMATION = gql`
  query GetCustomerReservationConfirmation($reservationID: ID!) {
    me {
      user {
        id
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

export const ReservationConfirmation = screenTrack()((props) => {
  const reservationID = get(props, "route.params.reservationID", "ck2tvabt6172l07017jcsr2a1")
  const tracking = useTracking()
  const { data, error } = useQuery(GET_CUSTOMER_RESERVATION_CONFIRMATION, {
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

  const SectionHeader = ({ title, content = null, bottomSpacing = 1, hideSeparator = false }) => {
    return (
      <>
        <Flex flexDirection="row" flex={1} width="100%">
          <Sans size="2" color="black100">
            {title}
          </Sans>
          {content && <Box ml="auto">{content}</Box>}
        </Flex>
        <Spacer mb={bottomSpacing} />
        {!hideSeparator && <Separator color={color("seperatorGrey")} />}
      </>
    )
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Content>
        <Flex flex={1} p={2}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Spacer mb={52} />
            <GreenCheck />
            <Box mt={4} mb={4}>
              <Sans size="3" color="black100">
                We've got your order!
              </Sans>
              <Sans size="1" color="black50">
                We've emailed you a confirmation and we'll notify you when its out for delivery.
              </Sans>
            </Box>
            <Box>
              <SectionHeader
                title="Order number"
                content={
                  <Sans size="2" color="black100" textAlign="right" ml="auto">
                    {reservation.reservationNumber}
                  </Sans>
                }
              ></SectionHeader>
            </Box>
            <Box pt={1}>
              <SectionHeader
                title="Shipping"
                content={
                  <>
                    <Sans size="2" color="black100" textAlign="right">
                      {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                    </Sans>
                    <Sans size="2" color="black100" textAlign="right">
                      {`${address.city}, ${address.state} ${address.zipCode}`}
                    </Sans>
                  </>
                }
                bottomSpacing={3}
              ></SectionHeader>
            </Box>
            <Box pt={1}>
              <SectionHeader
                title="Delivery"
                content={
                  <Sans size="2" color="black100" ml="auto" textAlign="right">
                    {`UPS Ground\n2 day shipping`}
                  </Sans>
                }
                hideSeparator
                bottomSpacing={4}
              ></SectionHeader>
            </Box>
            <Box mb={5}>
              <SectionHeader title="Items" />
              <Box mt={1} mb="80">
                {items.map((item, i) => {
                  return (
                    <Box key={item.id}>
                      <ReservationItem sectionHeight={206} index={i} bagItem={item} navigation={props.navigation} />
                      <Spacer mb={2} />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </ScrollView>
        </Flex>
      </Content>
      <FixedButton
        positionBottom={space(2)}
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
