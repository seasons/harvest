import { screenTrack } from "App/utils/track"
import React from "react"
import { ReviewOrder } from "@seasons/eclipse"
import { Dimensions } from "react-native"
import { Schema as NavigationSchema } from "App/Navigation"

const windowWidth = Dimensions.get("window").width

export const Order = screenTrack()(({ route, navigation }) => {
  const handleOrderSubmitted = ({ order, customer }) => {
    navigation.navigate(NavigationSchema.PageNames.OrderConfirmation, {
      order,
      customer,
    })
  }
  const handleBackPressed = () => {
    navigation.goBack()
  }
  const handleOrderItemPressed = (product) => {
    navigation.navigate("Product", { id: product.id, slug: product.slug })
  }
  const handleError = (error) => {
    console.error(error)
  }

  return (
    <ReviewOrder
      onOrderSubmitted={handleOrderSubmitted}
      onBackPressed={handleBackPressed}
      onOrderItemPressed={handleOrderItemPressed}
      order={order}
      onError={handleError}
      windowWidth={windowWidth}
    />
  )
})
