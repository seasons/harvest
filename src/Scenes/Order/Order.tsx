import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { useQuery } from "react-apollo"
import { ReservationItem } from "../Reservation/Components/ReservationItem"
import { space } from "App/utils"
import { SectionHeader } from "./Components/SectionHeader"
import { ShippingOption } from "./Components"
import { LineItem } from "./Components/LineItem"
import { OrderItem } from "./Components/OrderItem"

const GET_CUSTOMER = gql`
  query GetCustomer {
    me {
      user {
        id
        firstName
        lastName
        email
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
`

export const Order = screenTrack()(({ route, navigation }) => {
  const { data } = useQuery(GET_CUSTOMER)
  const order = route?.params?.order
  const tracking = useTracking()
  const [isMutating, setIsMutating] = useState(false)
  const customer = data?.me?.customer
  const address = data?.me?.customer?.detail?.shippingAddress
  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled
  const [shippingOptionIndex, setShippingOptionIndex] = useState(0)

  const phoneNumber = customer?.detail?.phoneNumber
  const paymentMethod = ""
  const items = []

  console.log("order", order)

  const shippingOptions = customer?.detail?.shippingAddress?.shippingOptions
  const productVariantItems = order?.items?.filter((i) => !!i.productVariant)

  const totalInDollars = order?.total / 100

  console.log("products", productVariantItems)

  if (!customer || !address) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <Flex style={{ flex: 1 }} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={80} />
          <Box pb={1}>
            <Sans size="7" color="black100">
              Confirm purchase
            </Sans>
          </Box>
          <Box mb={4}>
            <Sans size="4" color="black50">
              Purchased items will live in your bag until your reservation is returned & processed. We’ll reset.
            </Sans>
          </Box>
          {!!order && (
            <Box mb={4}>
              <SectionHeader title="Purchase summary" />
              {productVariantItems.map((item) => {
                return <LineItem leftText={item?.productVariant?.product?.name} rightText="" />
              })}
              <LineItem leftText="Subtotal" rightText={order?.subTotal || ""} />
              <LineItem leftText="Sales tax" rightText={order?.subTotal || ""} />
              <LineItem
                leftText="Total"
                rightText={
                  totalInDollars?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) || ""
                }
                color="black100"
              />
            </Box>
          )}
          {!!paymentMethod && (
            <Box mb={4}>
              <SectionHeader title="Payment method" />
              <Sans size="4" color="black50" mt={1}>
                {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
              </Sans>
            </Box>
          )}
          {!!address && (
            <Box mb={4}>
              <SectionHeader title="Shipping address" />
              <Sans size="4" color="black50" mt={1}>
                {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
              </Sans>
              <Sans size="4" color="black50">
                {`${address.city}, ${address.state} ${address.zipCode}`}
              </Sans>
            </Box>
          )}
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
              {productVariantItems?.map((item, i) => {
                return (
                  <Box key={item.productVariant?.id}>
                    <OrderItem index={i} productVariant={item.productVariant} navigation={navigation} />
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
          // const { data } = await reserveItems({
          //   variables: {
          //     items: itemIDs,
          //     shippingCode: shippingOptions?.[shippingOptionIndex]?.shippingMethod?.code,
          //   },
          // })
          if (data?.reserveItems) {
            navigation.navigate("BagStack", {
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
  )
})
