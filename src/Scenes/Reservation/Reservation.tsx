import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import * as Sentry from "@sentry/react-native"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import { BagItemFragment } from "../Bag/Components/BagItem"
import { ReservationItem } from "./Components/ReservationItem"
import { useNavigation } from "@react-navigation/native"
import styled from "styled-components"
import { SmallCheckCircled } from "Assets/svgs"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(items: $items, options: $options, shippingCode: $shippingCode) {
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
          id
          phoneNumber
          shippingAddress {
            id
            address1
            address2
            city
            state
            zipCode
            shippingOptions {
              id
              externalCost
              averageDuration
              shippingMethod {
                id
                code
                displayText
              }
            }
          }
        }
        billingInfo {
          id
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
      <Flex flexDirection="row" style={{ flex: 1 }} width="100%">
        <Sans size="1" color="black">
          {title}
        </Sans>
      </Flex>
      <Spacer mb={1} />
      <Separator />
    </>
  )
}

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const navigation = useNavigation()
  const { data } = useQuery(GET_CUSTOMER)
  const [shippingOptionIndex, setShippingOptionIndex] = useState(0)
  const { showPopUp, hidePopUp } = usePopUpContext()
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
      if (err.graphQLErrors?.[0]?.message.includes("Address Validation Error")) {
        showPopUp({
          title: "Sorry!",
          note:
            "UPS could not validate your shipping address, please double check your shipping address is valid in your account details.",
          buttonText: "Close",
          onClose: () => hidePopUp(),
        })
      } else {
        Sentry.captureException(err)
        showPopUp({
          title: "Sorry!",
          note: "We couldn't process your order because of an unexpected error, please try again later",
          buttonText: "Close",
          onClose: () => hidePopUp(),
        })
      }
      console.log("Error reservation.tsx: ", err)
      setIsMutating(false)
    },
  })

  const customer = data?.me?.customer
  const address = data?.me?.customer?.detail?.shippingAddress

  const phoneNumber = customer?.detail?.phoneNumber
  const items = data?.me?.bag

  if (!customer || !items || !address) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const shippingOptions = customer?.detail?.shippingAddress?.shippingOptions

  const ShippingOption = ({ option, index }) => {
    const method = option?.shippingMethod
    let price
    if (option?.externalCost === 0) {
      price = "Free"
    } else {
      price = "$" + option?.externalCost / 100
    }
    const selected = index === shippingOptionIndex

    return (
      <TouchableWithoutFeedback onPress={() => setShippingOptionIndex(index)}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" py={2}>
          <Sans size="1" color="black100">
            {method?.displayText}
          </Sans>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Sans size="1" color="black100">
              {price}
            </Sans>
            <Spacer mr={1} />
            {selected ? <SmallCheckCircled /> : <EmptyCircle />}
          </Flex>
        </Flex>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <>
      <Container insetsTop insetsBottom={false} backgroundColor="white100">
        <FixedBackArrow navigation={props.navigation} variant="whiteBackground" />
        <Flex style={{ flex: 1 }} px={2}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Spacer mb={80} />
            <Box pb={1}>
              <Sans size="3" color="black100">
                Review your order
              </Sans>
            </Box>
            <Box mb={4}>
              <Sans size="1" color="black50">
                As a reminder, orders placed{" "}
                <Sans size="1" color="black100" style={{ textDecorationLine: "underline" }}>
                  after 4:00pm
                </Sans>{" "}
                will be processed the following business day.
              </Sans>
            </Box>
            {!!shippingOptions && (
              <Box mb={4}>
                <SectionHeader title="Select shipping" />
                {shippingOptions.map((option, index) => {
                  return (
                    <Box key={option?.id || index}>
                      <ShippingOption option={option} index={index} />
                      <Separator />
                    </Box>
                  )
                })}
              </Box>
            )}
            {address && (
              <Box mb={4}>
                <SectionHeader title="Shipping address" />
                <Sans size="1" color="black50" mt={1}>
                  {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                </Sans>
                <Sans size="1" color="black50">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            )}
            {!!phoneNumber && (
              <Box mb={4}>
                <SectionHeader title="Phone number" />
                <Sans size="1" color="black50" mt={1}>
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
          loading={isMutating}
          disabled={isMutating}
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
            const { data } = await reserveItems({
              variables: {
                items: itemIDs,
                shippingCode: shippingOptions?.[shippingOptionIndex]?.shippingMethod?.code,
              },
            })
            if (data?.reserveItems) {
              props.navigation.navigate("BagStack", {
                screen: "ReservationConfirmation",
                params: { reservationID: data.reserveItems.id },
              })
            }
          }}
          block
        >
          Place order
        </FixedButton>
      </Container>
    </>
  )
})

const EmptyCircle = styled(Box)`
  height: 24;
  width: 24;
  border-radius: 12;
  border-color: ${color("black10")};
  border-width: 1;
`
