import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { Schema as NavigationSchema } from "App/Navigation"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import * as Sentry from "@sentry/react-native"
import { ScrollView } from "react-native"
import { BagItemFragment } from "../Bag/Components/BagItem"
import { ReservationItem } from "./Components/ReservationItem"
import { useNavigation } from "@react-navigation/native"
import { ShippingOption } from "../Order/Components"
import { SectionHeader } from "App/Components/SectionHeader"
import { DateTime } from "luxon"
import { ReservationLineItems } from "./ReservationLineItems"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(items: $items, options: $options, shippingCode: $shippingCode) {
      id
    }
  }
`

const DrafReservationLineItems = gql`
  mutation DraftReservationLineItems($hasFreeSwap: Boolean) {
    draftReservationLineItems(hasFreeSwap: $hasFreeSwap) {
      id
      name
      price
      taxPrice
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer {
    me {
      id
      nextFreeSwapDate
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
        admissions {
          id
          allAccessEnabled
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

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const [lineItems, setLineItems] = useState([])
  const tracking = useTracking()
  const navigation = useNavigation()
  const { previousData, data = previousData } = useQuery(GET_CUSTOMER)
  const [shippingOptionIndex, setShippingOptionIndex] = useState(0)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [reserveItems] = useMutation(RESERVE_ITEMS, {
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
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
  const [getReservationLineItems] = useMutation(DrafReservationLineItems, {
    onCompleted: () => {},
    onError: (err) => {},
  })

  const me = data?.me
  const customer = me?.customer
  const address = me?.customer?.detail?.shippingAddress
  const allAccessEnabled = me?.customer?.admissions?.allAccessEnabled

  const nextFreeSwapDate = me?.nextFreeSwapDate
  const swapAvailable = nextFreeSwapDate <= DateTime.local().setZone("America/New_York")

  useEffect(() => {
    const getLineItems = async () => {
      const { data: resData } = await getReservationLineItems({
        variables: {
          hasFreeSwap: false,
        },
      })
      console.log("resData?.draftReservationLineItems", resData?.draftReservationLineItems)
      setLineItems(resData?.draftReservationLineItems || [])
    }
    if (!swapAvailable && lineItems?.length === 0) {
      getLineItems()
    }
  }, [swapAvailable])

  const phoneNumber = customer?.detail?.phoneNumber
  const items = me?.bag

  if (!customer || !items || !address) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const shippingOptions = customer?.detail?.shippingAddress?.shippingOptions
  let taxTotal = 0
  let total = 0

  return (
    <>
      <Container insetsTop insetsBottom={false} backgroundColor="white100">
        <FixedBackArrow navigation={props.navigation} variant="whiteBackground" />
        <Flex style={{ flex: 1 }} px={2}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Spacer mb={80} />
            <Box pb={1}>
              <Sans size="7" color="black100">
                Review your order
              </Sans>
            </Box>
            <Box mb={4}>
              <Sans size="4" color="black50">
                As a reminder, orders placed{" "}
                <Sans size="4" color="black100" style={{ textDecorationLine: "underline" }}>
                  after 4:00pm EST
                </Sans>{" "}
                will be processed the following business day.
              </Sans>
            </Box>
            {address && (
              <Box mb={4}>
                <SectionHeader
                  title="Shipping address"
                  rightText="Edit"
                  onPressRightText={() => {
                    navigation.navigate(NavigationSchema.StackNames.AccountStack, {
                      screen: NavigationSchema.PageNames.EditPaymentAndShipping,
                      params: { phoneNumber, shippingAddress: address },
                    })
                  }}
                />
                <Sans size="4" color="black50" mt={1}>
                  {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                </Sans>
                <Sans size="4" color="black50">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            )}
            {lineItems?.length > 0 && <ReservationLineItems lineItems={lineItems} />}
            {shippingOptions?.length > 0 && !allAccessEnabled && (
              <Box mb={4}>
                <SectionHeader title="Select shipping" />
                {shippingOptions.map((option, index) => {
                  return (
                    <Box key={option?.id || index}>
                      <ShippingOption
                        option={option}
                        index={index}
                        setShippingOptionIndex={setShippingOptionIndex}
                        shippingOptionIndex={shippingOptionIndex}
                      />
                      <Separator />
                    </Box>
                  )
                })}
                <Spacer mb={2} />
                <Sans size="3" color="black50">
                  UPS Ground shipping averages 1-2 days in the NY metro area, 3-4 days for the Midwest + Southeast, and
                  5-7 days on the West coast.
                </Sans>
              </Box>
            )}
            {!!phoneNumber && (
              <Box mb={4}>
                <SectionHeader title="Phone number" />
                <Sans size="4" color="black50" mt={1}>
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
                        <ReservationItem index={i} bagItem={item} navigation={props.navigation} />
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
