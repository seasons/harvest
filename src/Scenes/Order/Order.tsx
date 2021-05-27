import { useMutation, ApolloError } from "@apollo/client"
import { screenTrack, Schema, useTracking } from "App/utils/track"
import React from "react"
import { ReviewOrder } from "@seasons/eclipse"
import { Dimensions, Linking } from "react-native"
import { Schema as NavigationSchema } from "App/Navigation"
import { SUBMIT_ORDER } from "../Product/Mutations"
import { GetBag_NoCache_Query } from "../Bag/BagQueries"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"

const windowWidth = Dimensions.get("window").width

export const Order = screenTrack()(({ route, navigation }) => {
  const order = route?.params?.order
  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
    ],
    awaitRefetchQueries: true,
  })
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()

  const handleError = (error: Error | readonly ApolloError[]) => {
    console.error(error)
    showPopUp({
      title: "Oops! Try again!",
      note: "There was an issue purchasing this item. Please retry or contact us.",
      buttonText: "Close",
      onClose: hidePopUp,
    })
  }

  const handleOrderSubmitted = async ({ order, customer }) => {
    try {
      tracking.trackEvent({
        actionName: Schema.ActionNames.PlaceOrderTapped,
        actionType: Schema.ActionTypes.Tap,
      })
      const result = await submitOrder({
        variables: {
          input: {
            orderID: order.id,
          },
        },
      })

      if (result.errors) {
        handleError((result.errors as any) as readonly ApolloError[])
        return
      }
    } catch (e) {
      handleError(e)
      return
    }

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
  const handleNavigateToBrand = (href: string) => {
    Linking.openURL(href)
  }

  return (
    <ReviewOrder
      onOrderSubmitted={handleOrderSubmitted}
      onBackPressed={handleBackPressed}
      onOrderItemPressed={handleOrderItemPressed}
      order={order}
      windowWidth={windowWidth}
      onNavigateToBrand={handleNavigateToBrand}
    />
  )
})
