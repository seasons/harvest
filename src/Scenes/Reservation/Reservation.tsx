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

import { ReservationBottomBar } from "./Components/ReservationBottomBar"
import { ReservationShippingOptionsSection } from "./Components/ReservationShippingOptionsSection"
import { ReservationLineItems } from "./ReservationLineItems"
import { BagItemFragment_BagItem, SmallBagItem } from "../Bag/Components/BagItem/SmallBagItem"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($options: ReserveItemsOptions, $shippingCode: ShippingCode) {
    reserveItems(options: $options, shippingCode: $shippingCode) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer($shippingCode: String) {
    shippingMethods {
      id
      displayText
      code
      position
      timeWindows {
        id
        startTime
        endTime
        display
      }
    }
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
          ...BagItemFragment_BagItem
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
  ${BagItemFragment_BagItem}
`

export const Reservation = screenTrack()((props) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const navigation = useNavigation()

  const [shippingCode, setShippingCode] = useState("")
  const [dateAndTimeWindow, setDateAndTimeWindow] = useState(null)

  const { previousData, data = previousData, loading } = useQuery(GET_CUSTOMER, {
    variables: {
      shippingCode,
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
    if (data?.shippingMethods.length > 0 && shippingCode === "") {
      setShippingCode(data.shippingMethods[0].code)
    }
  }, [data?.shippingMethods])

  const me = data?.me
  const customer = me?.customer
  const address = me?.customer?.detail?.shippingAddress

  const phoneNumber = customer?.detail?.phoneNumber
  const billingInfo = customer?.billingInfo
  const bagItems = me?.bagSections?.find((section) => section.status === "Added")?.bagItems

  if (!customer || !bagItems || !address) {
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
        <Flex style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Spacer mb={80} />
            <Box px={2}>
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
              <ReservationLineItems lineItems={me?.reservationLineItems} loading={loading} />
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
                  {!!billingInfo && `${billingInfo.brand} ending in ${billingInfo.last_digits}`}
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
            </Box>
            <ReservationShippingOptionsSection
              shippingMethods={data.shippingMethods}
              onShippingMethodSelected={(method) => {
                setShippingCode(method.code)
              }}
              onTimeWindowSelected={(data) => {
                setDateAndTimeWindow(data)
              }}
            />
            <Box mb={5} px={2}>
              <SectionHeader title="Bag items" />
              <Box mt={2} mb={4}>
                {bagItems?.map((bagItem, index) => {
                  return (
                    <Box key={index}>
                      <SmallBagItem bagItem={bagItem} />
                      <Spacer mb={2} />
                      {index !== bagItems.length - 1 && <Separator />}
                      <Spacer mb={2} />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </ScrollView>
        </Flex>
        <ReservationBottomBar
          loading={loading}
          lineItems={me?.reservationLineItems}
          onReserve={async () => {
            if (isMutating) {
              return
            }
            tracking.trackEvent({
              actionName: Schema.ActionNames.PlaceOrderTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            setIsMutating(true)
            const { data } = await reserveItems({
              variables: {
                shippingCode,
                options: {
                  timeWindowID: dateAndTimeWindow?.timeWindow?.id,
                  pickupDate: dateAndTimeWindow?.date,
                },
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
