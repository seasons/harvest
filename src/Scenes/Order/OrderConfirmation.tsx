import { screenTrack } from "App/utils/track"
import React from "react"
import { Dimensions } from "react-native"
import { OrderConfirmation as OrderConfirmationContainer } from "@seasons/eclipse"

const windowWidth = Dimensions.get("window").width

export const OrderConfirmation = screenTrack()(({ route, navigation }) => {
  const order = route?.params?.order
  const customer = route?.params?.customer

  const handleBackPressed = () => {
    navigation.goBack()
  }
  const handleDonePressed = () => {
    navigation.popToTop()
  }
  const handleOrderItemPressed = (product) => {
    navigation.navigate("Product", { id: product.id, slug: product.slug })
  }

  return (
    <OrderConfirmationContainer
      onBackPressed={handleBackPressed}
      onDonePressed={handleDonePressed}
      onOrderItemPressed={handleOrderItemPressed}
      order={order}
      customer={customer}
      windowWidth={windowWidth}
    />
  )
})
