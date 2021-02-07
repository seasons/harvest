import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import React from "react"
import { ScrollView } from "react-native"
import { space } from "App/utils"
import { SectionHeader } from "./Components/SectionHeader"
import { LineItem } from "./Components/LineItem"
import { OrderItem } from "./Components/OrderItem"

export const OrderConfirmation = screenTrack()(({ route, navigation }) => {
  const tracking = useTracking()
  const order = route?.params?.order
  const totalInDollars = order?.total / 100

  const address = order?.customer?.detail?.shippingAddress
  const productVariantItems = order?.items?.filter((i) => !!i.productVariant)
  const salesTaxTotalInDollars = order?.salesTaxTotal / 100

  if (!order) {
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
              Order confirmed
            </Sans>
          </Box>
          <Box mb={4}>
            <Sans size="4" color="black50">
              We've emailed you a confirmation and we'll notify you when it's out for delivery.
            </Sans>
          </Box>
          {!!order && (
            <Box mb={4}>
              <LineItem leftText="Order number:" rightText={order?.orderNumber} />
              <LineItem
                leftText="Sales tax"
                rightText={
                  salesTaxTotalInDollars?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) || ""
                }
              />
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
          <Box mb={5}>
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
          navigation.navigate.popToTop()
        }}
        block
      >
        Done
      </FixedButton>
    </Container>
  )
})
