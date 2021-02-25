import { Box, Container, FixedButton, Flex, Sans, SectionHeader, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import React from "react"
import { Dimensions, ScrollView } from "react-native"

import { LineItem } from "./Components/LineItem"
import { OrderItem } from "./Components/OrderItem"

const windowWidth = Dimensions.get("window").width

export const OrderConfirmation = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()
  const order = route?.params?.order
  const customer = route?.params?.customer
  const address = customer?.detail?.shippingAddress
  const productVariantItems = order?.lineItems?.filter((i) => !!i.productVariant)
  const needsShipping = order?.lineItems?.some((item) => item.needShipping)

  if (!order) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex style={{ flex: 1 }} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={80} />
          <CheckCircled backgroundColor={color("green100")} />
          <Spacer mb={4} />
          <Box pb={1}>
            <Sans size="7" color="black100">
              {needsShipping ? "We've got your order" : "It's all yours"}
            </Sans>
          </Box>
          <Box mb={4}>
            <Sans size="4" color="black50">
              {needsShipping
                ? "We've emailed you a confirmation and we'll notify you when it's out for delivery."
                : "All you have to do is hold onto it and we'll reset your slot when we receive your return"}
            </Sans>
          </Box>
          {!!order && (
            <Box mb={1}>
              <LineItem
                windowWidth={windowWidth}
                leftText="Order number:"
                rightText={order?.orderNumber}
                color="black100"
              />
              <Spacer mb={1} />
              <Separator />
            </Box>
          )}
          {!!address && needsShipping && (
            <Box mb={1}>
              <Flex flexDirection="row" width="100%" justifyContent="space-between">
                <Flex flexDirection="row" pr={2}>
                  <Sans size="4" color="black100">
                    Shipping
                  </Sans>
                </Flex>
                <Flex style={{ maxWidth: windowWidth - 120 }}>
                  <Sans size="4" color="black100" style={{ textAlign: "right" }}>
                    {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                  </Sans>
                  <Sans size="4" color="black100" style={{ textAlign: "right" }}>
                    {`${address.city}, ${address.state} ${address.zipCode}`}
                  </Sans>
                </Flex>
              </Flex>
            </Box>
          )}
          {needsShipping && (
            <Box mb={2}>
              <Spacer mb={1} />
              <Separator />
              <Spacer mb={1} />
              <Flex flexDirection="row" width="100%" justifyContent="space-between">
                <Flex flexDirection="row" pr={2}>
                  <Sans size="4" color="black100">
                    Delivery
                  </Sans>
                </Flex>
                <Flex>
                  <Sans size="4" color="black100" style={{ textAlign: "right" }}>
                    5-day shipping
                  </Sans>
                  <Sans size="4" color="black100" style={{ textAlign: "right" }}>
                    UPS Ground
                  </Sans>
                </Flex>
              </Flex>
            </Box>
          )}
          <Box mb={5} pt={2}>
            <SectionHeader title={productVariantItems?.length === 1 ? "Item" : "Items"} />
            <Box mt={1} mb={4}>
              {productVariantItems?.map((item, i) => {
                return (
                  <Box key={item.productVariant?.id}>
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
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.CloseOrderConfirmationTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          navigation.popToTop()
        }}
        block
      >
        Done
      </FixedButton>
    </Container>
  )
})
