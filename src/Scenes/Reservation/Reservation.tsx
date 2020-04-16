import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { BagItemFragment } from "../Bag/Components/BagItem"
import { ReservationItem } from "./Components/ReservationItem"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions) {
    reserveItems(items: $items, options: $options) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer {
    me {
      user {
        id
        firstName
        lastName
        email
      }
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
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
        billingInfo {
          last_digits
        }
      }
    }
  }
  ${BagItemFragment}
`

const SectionHeader = ({ title }) => {
  return (
    <>
      <Flex flexDirection="row" flex={1} width="100%">
        <Sans size="2" color="black">
          {title}
        </Sans>
      </Flex>
      <Spacer mb={1} />
      <Separator color={color("black04")} />
    </>
  )
}

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const { data, loading } = useQuery(GET_CUSTOMER)
  const [reserveItems] = useMutation(RESERVE_ITEMS, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      setIsMutating(false)
      console.warn("Error reservation.tsx: ", err)
    },
  })
  const { showPopUp, hidePopUp } = usePopUpContext()

  if (loading) {
    return <Loader />
  }

  const customer = data?.me?.customer
  const address = data?.me?.customer?.detail?.shippingAddress || {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  }

  const phoneNumber = customer?.detail?.phoneNumber
  const items = data?.me?.bag ?? []

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <FixedBackArrow navigation={props.navigation} variant="whiteBackground" />
      <Flex flex={1} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={80} />
          <Box pb={1}>
            <Sans size="3" color="black100">
              Review your order
            </Sans>
          </Box>
          <Box mb={4}>
            <Sans size="2" color="black50">
              As a reminder, orders placed{" "}
              <Sans size="2" color="black100" style={{ textDecorationLine: "underline" }}>
                after 5:00pm
              </Sans>{" "}
              will be processed the following business day.
            </Sans>
          </Box>
          <Box mb={4}>
            <SectionHeader title="Delivery Time" />
            <Sans size="2" color="black50" mt={1}>
              2-day Shipping
            </Sans>
          </Box>
          {address && (
            <Box mb={4}>
              <SectionHeader title="Shipping address" />
              <Sans size="2" color="black50" mt={1}>
                {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
              </Sans>
              <Sans size="2" color="black50">
                {`${address.city}, ${address.state} ${address.zipCode}`}
              </Sans>
            </Box>
          )}
          {!!phoneNumber && (
            <Box mb={4}>
              <SectionHeader title="Phone number" />
              <Sans size="2" color="black50" mt={1}>
                {phoneNumber}
              </Sans>
            </Box>
          )}
          <Box mb={5}>
            <SectionHeader title="Items" />
            <Box mt={1} mb={4}>
              {!!items &&
                items.map((item, i) => {
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
      <FixedButton
        positionBottom={space(2)}
        onPress={async () => {
          if (isMutating) {
            return
          }
          tracking.trackEvent({
            actionName: Schema.ActionNames.PlaceOrderTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          setIsMutating(true)
          const itemIDs = items?.map((item) => item?.productVariant?.id)
          try {
            const { data } = await reserveItems({
              variables: {
                items: itemIDs,
              },
            })
            if (data.reserveItems) {
              props.navigation.navigate("BagStack", {
                screen: "ReservationConfirmation",
                params: { reservationID: data.reserveItems.id },
              })
            }
          } catch (e) {
            showPopUp({
              title: "Sorry!",
              note: "We couldn't process your order because of an unexpected error, please try again later",
              buttonText: "Close",
              onClose: () => hidePopUp(),
            })
            setIsMutating(false)
          }
        }}
        block
      >
        Place order
      </FixedButton>
      {isMutating && <Loader variant="blackOpaque85"></Loader>}
    </Container>
  )
})
