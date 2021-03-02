import {
  Box,
  Container,
  FixedBackArrow,
  FixedButton,
  Flex,
  Sans,
  SectionHeader,
  Separator,
  Spacer,
} from "App/Components"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { Loader } from "App/Components/Loader"
import { Schema as NavigationSchema } from "App/Navigation"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import React, { useState } from "react"
import { Dimensions, ScrollView } from "react-native"

import { useMutation, useQuery } from "@apollo/client"

import { SUBMIT_ORDER } from "../Product/Mutations"
import { LineItem } from "./Components/LineItem"
import { OrderItem } from "./Components/OrderItem"
import { GET_BAG } from "../Bag/BagQueries"

const GET_CUSTOMER_ORDER_VIEW = gql`
  query GetCustomerOrderView {
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
          brand
          last_digits
        }
      }
    }
  }
`

const windowWidth = Dimensions.get("window").width

export const Order = screenTrack()(({ route, navigation }) => {
  const { data } = useQuery(GET_CUSTOMER_ORDER_VIEW)
  const order = route?.params?.order
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const customer = data?.me?.customer
  const address = data?.me?.customer?.detail?.shippingAddress

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: (res) => {
      setIsMutating(false)
      if (res?.submitOrder) {
        navigation.navigate(NavigationSchema.PageNames.OrderConfirmation, {
          order: res.submitOrder,
          customer: data?.me?.customer,
        })
      }
    },
    onError: (error) => {
      console.log("error createDraftOrder ", error)
      setIsMutating(false)
      showPopUp({
        title: "Oops! Try again!",
        note: "There was an issue purchasing this item. Please retry or contact us.",
        buttonText: "Close",
        onClose: hidePopUp,
      })
    },
  })

  const phoneNumber = customer?.detail?.phoneNumber
  const paymentMethod = customer?.billingInfo?.last_digits
  const paymentBrand = customer?.billingInfo?.brand
  const productVariantItems = order?.lineItems?.filter((i) => !!i.productVariant)

  const totalInDollars = order?.total / 100
  const totalSalesTaxDollars = order?.salesTaxTotal / 100
  const needsShipping = order?.lineItems?.some((item) => item.needShipping)

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
              Purchased items will live in your bag until your reservation is returned & processed. We’ll reset your
              slot and you'll be able to get a new item.
            </Sans>
          </Box>
          {!!order && (
            <Box mb={4}>
              <SectionHeader title="Purchase summary" />
              {order?.lineItems?.map((item, index) => {
                const itemPriceInDollars = item?.price / 100
                let displayName
                if (item.recordType === "Package") {
                  displayName = "Shipping"
                } else {
                  displayName = item?.productVariant?.product?.name
                }
                return (
                  <LineItem
                    leftText={displayName}
                    rightText={
                      itemPriceInDollars?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      }) || ""
                    }
                    key={item?.productVariant?.id ?? index}
                    windowWidth={windowWidth}
                  />
                )
              })}
              <LineItem
                leftText="Sales tax"
                windowWidth={windowWidth}
                rightText={
                  totalSalesTaxDollars?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) || ""
                }
              />
              <LineItem
                leftText="Total"
                windowWidth={windowWidth}
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
                {`${paymentBrand} ending in ${paymentMethod}`}
              </Sans>
            </Box>
          )}
          {!!address && needsShipping && (
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
          {!!phoneNumber && (
            <Box mb={4}>
              <SectionHeader title="Phone number" />
              <Sans size="4" color="black50" mt={1}>
                {phoneNumber}
              </Sans>
            </Box>
          )}
          <Box mb={5}>
            <SectionHeader title={productVariantItems?.length === 1 ? "Item" : "Items"} />
            <Box mt={1} mb={4}>
              {productVariantItems?.map((item, i) => {
                return (
                  <Box key={i}>
                    <OrderItem index={i} productVariant={item.productVariant} navigation={navigation} />
                    <Spacer mb={1} />
                    {i !== productVariantItems.length - 1 && <Separator />}
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
          await submitOrder({
            awaitRefetchQueries: true,
            variables: {
              input: {
                orderID: order.id,
              },
            },
          })
        }}
        block
      >
        Place order
      </FixedButton>
    </Container>
  )
})
