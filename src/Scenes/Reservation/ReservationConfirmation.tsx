import { Box, Container, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import React from "react"
import { ScrollView } from "react-native"
import Rate, { AndroidMarket } from "react-native-rate"
import { useQuery } from "@apollo/client"
import { ReservationConfirmationOptionsSection } from "./Components/ReservationConfirmationOptionsSection"
import { ReservationSectionHeader } from "./Components/ReservationSectionHeader"
import { ReservationLineItems } from "./ReservationLineItems"
import { BagItemFragment_BagItem, SmallBagItem } from "../Bag/Components/BagItem/SmallBagItem"

const GET_CUSTOMER_RESERVATION_CONFIRMATION = gql`
  query GetCustomerReservationConfirmation($reservationID: ID!) {
    me {
      id
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
          shippingMethod {
            id
            displayText
            code
          }
          pickupDate
          pickupWindow {
            display
          }
          lineItems(filterBy: NewItems) {
            id
            name
            price
            recordType
          }
          reservationPhysicalProducts {
            id
            bagItem {
              ...BagItemFragment_BagItem
            }
          }
        }
      }
    }
  }
  ${BagItemFragment_BagItem}
`

export const ReservationConfirmation = screenTrack()((props) => {
  const tracking = useTracking()
  const reservationID = props?.route?.params?.reservationID
  const { previousData, data = previousData, error } = useQuery(GET_CUSTOMER_RESERVATION_CONFIRMATION, {
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
  const bagItems = reservation?.reservationPhysicalProducts.map((rpp) => rpp.bagItem)

  const formatedAddress1 =
    !!address?.address1 && `${address?.address1}${address?.address2 ? " " + address?.address2 : ""},`
  const formatedAddress2 = !!address?.city && `${address?.city}, ${address?.state} ${address?.zipCode}`

  const shippingDisplayText = reservation?.shippingMethod?.displayText
  const timeWindowText = reservation?.pickupWindow?.display
  const pickupDateText = reservation?.pickupDate && DateTime.fromISO(reservation?.pickupDate).toFormat("cccc, MMMM dd")
  const lineItems = reservation?.lineItems

  const isPickup = reservation?.shippingMethod?.code === "Pickup"

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex style={{ flex: 1 }} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckCircled />
          <Box my={4}>
            <Sans size="7" color="black100">
              We've got your order!
            </Sans>
            <Sans size="4" color="black50">
              We've emailed you a confirmation and we'll notify you when its out for delivery.
            </Sans>
          </Box>
          <ReservationConfirmationOptionsSection reservationID={reservation.id} />
          <Spacer pb={4} />
          {lineItems?.length > 0 && (
            <>
              <ReservationLineItems lineItems={lineItems} />
              <Spacer mb={2} />
            </>
          )}
          <Box>
            <ReservationSectionHeader
              title="Order number"
              content={
                <>
                  {!!reservation?.reservationNumber && (
                    <Sans size="4" color="black100" textAlign="right" ml="auto">
                      {reservation?.reservationNumber}
                    </Sans>
                  )}
                </>
              }
            />
          </Box>
          <Box pt={1}>
            <ReservationSectionHeader
              title="Shipping"
              content={
                <>
                  {!!formatedAddress1 && (
                    <Sans size="4" color="black100" textAlign="right">
                      {formatedAddress1}
                    </Sans>
                  )}
                  {!!formatedAddress2 && (
                    <Sans size="4" color="black100" textAlign="right">
                      {formatedAddress2}
                    </Sans>
                  )}
                </>
              }
              bottomSpacing={2}
            />
          </Box>
          <Box pt={1}>
            <ReservationSectionHeader
              title={isPickup ? "In-Office Pickup" : "Delivery"}
              content={
                <>
                  {!!shippingDisplayText && !isPickup && (
                    <Sans size="4" color="black100" ml="auto" textAlign="right">
                      {shippingDisplayText}
                    </Sans>
                  )}
                  {!!pickupDateText && (
                    <Sans size="4" color="black100" ml="auto" mt={1} textAlign="right">
                      {pickupDateText}
                    </Sans>
                  )}
                  {!!timeWindowText && (
                    <Sans size="4" color="black100" textAlign="right">
                      {timeWindowText}
                    </Sans>
                  )}
                </>
              }
              bottomSpacing={5}
              hideSeparator
            />
          </Box>

          <Box mb={5}>
            <ReservationSectionHeader title="Items" />
            <Box mt={1} mb={4}>
              {bagItems?.map((bagItem, index) => {
                return (
                  <Box key={index}>
                    <SmallBagItem bagItem={bagItem} />
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
