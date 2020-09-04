import { Box, Container, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import gql from "graphql-tag"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import Rate, { AndroidMarket } from "react-native-rate"

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
          id
          phoneNumber
          shippingAddress {
            id
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
                id
                name
                modelSize {
                  id
                  display
                }
                brand {
                  id
                  name
                }
                images {
                  id
                  url
                }
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
  const tracking = useTracking()
  const reservationID = props?.route?.params?.reservationID
  const { data, error } = useQuery(GET_CUSTOMER_RESERVATION_CONFIRMATION, {
    variables: {
      reservationID,
    },
  })
  if (error) {
    console.log("error reservationConfirmation:", error)
  }

  if (!data) {
    return <Loader />
  }

  const customer = data?.me?.customer
  const address = customer?.detail?.shippingAddress
  const reservation = customer?.reservations?.[0]
  const items = reservation?.products

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
        {!hideSeparator && <Separator color={color("black04")} />}
      </>
    )
  }

  const formatedAddress1 =
    !!address?.address1 && `${address?.address1}${address?.address2 ? " " + address?.address2 : ""},`
  const formatedAddress2 = !!address?.city && `${address?.city}, ${address?.state} ${address?.zipCode}`

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex flex={1} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckCircled />
          <Box my={4}>
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
                <>
                  {!!reservation.reservationNumber && (
                    <Sans size="2" color="black100" textAlign="right" ml="auto">
                      {reservation.reservationNumber}
                    </Sans>
                  )}
                </>
              }
            />
          </Box>
          <Box pt={1}>
            <SectionHeader
              title="Shipping"
              content={
                <>
                  {!!formatedAddress1 && (
                    <Sans size="2" color="black100" textAlign="right">
                      {formatedAddress1}
                    </Sans>
                  )}
                  {!!formatedAddress2 && (
                    <Sans size="2" color="black100" textAlign="right">
                      {formatedAddress2}
                    </Sans>
                  )}
                </>
              }
              bottomSpacing={3}
            />
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
            />
          </Box>
          <Box mb={5}>
            <SectionHeader title="Items" />
            <Box mt={1} mb={4}>
              {items?.map((item, i) => {
                return (
                  <Box key={item.id}>
                    <ReservationItem sectionHeight={206} index={i} bagItem={item} navigation={props.navigation} />
                    <Spacer mb={1} />
                    {i !== items.length - 1 && <Separator />}
                    <Spacer mb={1} />
                  </Box>
                )
              })}
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
          props.navigation.navigate("Bag", { reservationID: reservationID })
          const options = {
            AppleAppID: "1483089476",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: false,
          }
          Rate.rate(options, (success) => {
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
            }
          })
        }}
        block
      >
        Done
      </FixedButton>
    </Container>
  )
})
