import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import * as Sentry from "@sentry/react-native"
import { ScrollView } from "react-native"
import { BagItemFragment } from "../Bag/Components/BagItem"
import { ReservationItem } from "./Components/ReservationItem"
import { useNavigation } from "@react-navigation/native"

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
        membership {
          id
          plan {
            id
            itemCount
          }
        }
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
      <Flex flexDirection="row" flex={1} width="100%">
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

  const planItemCount = data?.me?.customer?.membership?.plan?.itemCount

  if (!customer || !items || !address) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  return (
    <>
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
              <Sans size="1" color="black50">
                As a reminder, orders placed{" "}
                <Sans size="1" color="black100" style={{ textDecorationLine: "underline" }}>
                  after 4:00pm
                </Sans>{" "}
                will be processed the following business day.
              </Sans>
            </Box>
            <Box mb={4}>
              <SectionHeader title="Delivery Time" />
              <Sans size="1" color="black50" mt={1}>
                2-day Shipping
              </Sans>
            </Box>
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
                planItemCount,
                items: itemIDs,
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
