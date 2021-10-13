import {
  Box,
  Container,
  FixedBackArrow,
  Flex,
  Sans,
  Separator,
  Spacer,
  SuggestedAddressPopupComponent,
} from "App/Components"
import { Loader } from "App/Components/Loader"
import { SectionHeader } from "App/Components/SectionHeader"
import { Schema as NavigationSchema } from "App/Navigation"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { UPDATE_PHONE_AND_SHIPPING } from "App/Scenes/Account/PaymentAndShipping/EditPaymentAndShipping"
import { GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"

import { useMutation, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"

import { ShippingOption } from "../Order/Components"
import { ReservationBottomBar } from "./Components/ReservationBottomBar"
import { ReservationItem, ReservationProductVariantFragment_ProductVariant } from "./Components/ReservationItem"
import { ReservationLineItems } from "./ReservationLineItems"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(items: $items, options: $options, shippingCode: $shippingCode) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer($shippingCode: String) {
    me {
      id
      user {
        id
        firstName
        lastName
        email
      }
      bagSections {
        id
        status
        bagItems {
          id
          productVariant {
            id
            ...ReservationProductVariantFragment_ProductVariant
          }
        }
      }
      reservationLineItems(filterBy: NewItems, shippingCode: $shippingCode) {
        id
        name
        price
        recordType
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
          brand
          last_digits
        }
      }
    }
  }
  ${ReservationProductVariantFragment_ProductVariant}
`

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const navigation = useNavigation()

  const [shippingOptionIndex, setShippingOptionIndex] = useState(0)
  const [shippingCode, setShippingCode] = useState("UPSGround")

  const { previousData, data = previousData, refetch } = useQuery(GET_CUSTOMER, {
    variables: {
      shippingCode: shippingCode || "UPSGround",
    },
  })
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [updatePhoneAndShippingAddress] = useMutation(UPDATE_PHONE_AND_SHIPPING, {
    onError: (error) => {
      let popUpData = {
        buttonText: "Got it",
        note: "Please make sure your address is valid. If you're having trouble contact us.",
        title: "Something went wrong!",
        onClose: () => hidePopUp(),
      }
      Sentry.captureException(error)
      showPopUp(popUpData)
      console.log("Error Reservation.tsx: ", error)
    },
  })
  const [reserveItems] = useMutation(RESERVE_ITEMS, {
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (error) => {
      console.log("error", error)
      let popUpData = {
        title: "Sorry!",
        note: "We couldn't process your order because of an unexpected error, please try again later",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      if (error.message === "Need to Suggest Address") {
        const suggestedAddress = error.graphQLErrors?.[0]?.extensions?.suggestedAddress
        if (!!suggestedAddress) {
          popUpData = {
            buttonText: "Use address",
            //@ts-ignore
            component: <SuggestedAddressPopupComponent suggestedAddress={suggestedAddress} type="Reservation" />,
            secondaryButtonText: "Close",
            secondaryButtonOnPress: () => hidePopUp(),
            onClose: () => {
              updatePhoneAndShippingAddress({
                variables: {
                  phoneNumber,
                  shippingAddress: {
                    street1: suggestedAddress.street1,
                    street2: suggestedAddress.street2,
                    city: suggestedAddress.city,
                    state: suggestedAddress.state,
                    postalCode: suggestedAddress.zip,
                  },
                },
                refetchQueries: [{ query: GET_CUSTOMER }],
              })
              hidePopUp()
            },
          }
        }
      }
      Sentry.captureException(error)
      showPopUp(popUpData)
      console.log("Error reservation.tsx: ", error)
      setIsMutating(false)
    },
  })

  useEffect(() => {
    refetch()
  }, [shippingOptionIndex, refetch])

  const me = data?.me
  const customer = me?.customer
  const address = me?.customer?.detail?.shippingAddress
  const shippingOptions = customer?.detail?.shippingAddress?.shippingOptions

  useEffect(() => {
    if (shippingOptions?.length > 0) {
      const selectedShippingOption = shippingOptions[shippingOptionIndex]
      setShippingCode(selectedShippingOption?.shippingMethod?.code)
    }
  }, [shippingOptionIndex, shippingOptions])

  const phoneNumber = customer?.detail?.phoneNumber
  const billingInfo = customer?.billingInfo
  const addedItems = me?.bagSections?.find((section) => section.status === "Added")?.bagItems

  if (!customer || !addedItems || !address) {
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
            <ReservationLineItems lineItems={me.reservationLineItems} />
            <Box mb={4}>
              <SectionHeader
                title="Payment method"
                rightText="Edit"
                onPressRightText={() => {
                  navigation.navigate(NavigationSchema.StackNames.AccountStack, {
                    screen: NavigationSchema.PageNames.EditPaymentAndShipping,
                    params: { phoneNumber, shippingAddress: address },
                  })
                }}
              />
              <Sans size="4" color="black50" mt={1}>
                {`${billingInfo.brand} ending in ${billingInfo.last_digits}`}
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
            {shippingOptions?.length > 0 && (
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
            <Box mb={5}>
              <SectionHeader title="Bag items" />
              <Box mt={1} mb={4}>
                {addedItems?.map((item, i) => {
                  return (
                    <Box key={item.id}>
                      <ReservationItem index={i} bagItem={item} navigation={props.navigation} />
                      <Spacer mb={1} />
                      {i !== addedItems.length - 1 && <Separator />}
                      <Spacer mb={1} />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </ScrollView>
        </Flex>
        <ReservationBottomBar
          lineItems={me.reservationLineItems}
          onReserve={async () => {
            if (isMutating) {
              return
            }
            tracking.trackEvent({
              actionName: Schema.ActionNames.PlaceOrderTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            setIsMutating(true)
            const itemIDs = addedItems?.map((item) => item?.productVariant?.id)
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
          buttonProps={{ loading: isMutating }}
        />
      </Container>
    </>
  )
})
