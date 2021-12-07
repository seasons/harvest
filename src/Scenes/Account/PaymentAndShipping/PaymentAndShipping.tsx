import { Box, Container, FixedBackArrow, Sans, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FlatList, Keyboard } from "react-native"
import { Schema as TrackSchema, useTracking, screenTrack } from "App/utils/track"
import { Schema as NavigationSchema } from "App/Navigation"
import { PopUp } from "App/Components/PopUp"
import stripe from "tipsi-stripe"
import * as Sentry from "@sentry/react-native"
import { PaymentMethods } from "./PaymentMethods"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_PAYMENT_DATA } from "./queries"
import { PaymentHistorySection } from "./PaymentHistorySection"
import { AccountSection } from "./AccountSection"

enum SectionType {
  PaymentHistory = "PaymentHistory",
  AccountSection = "AccountSection",
}

export const createShippingAddress = (shippingAddress) => {
  const addressArray = []
  if (shippingAddress?.address1) {
    addressArray.push(shippingAddress.address1)
  }
  if (shippingAddress?.address2) {
    addressArray.push(shippingAddress.address2)
  }
  if (shippingAddress?.city && shippingAddress?.state && shippingAddress?.zipCode) {
    addressArray.push(`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}`)
  }
  return addressArray
}

export const createBillingAddress = (billingInfo) => {
  const addressArray = []
  if (billingInfo.street1) {
    addressArray.push(billingInfo.street1)
  }
  if (billingInfo.street2) {
    addressArray.push(billingInfo.street2)
  }
  if (billingInfo.city && billingInfo.state && billingInfo.postal_code) {
    addressArray.push(`${billingInfo.city}, ${billingInfo.state}, ${billingInfo.postal_code}`)
  }
  return addressArray
}

export const PAYMENT_UPDATE = gql`
  mutation applePayUpdatePaymentMethod($planID: String!, $token: StripeToken!, $tokenType: String) {
    applePayUpdatePaymentMethod(planID: $planID, token: $token, tokenType: $tokenType)
  }
`

export const PaymentAndShipping = screenTrack()(({ navigation }) => {
  const [openPopUp, setOpenPopUp] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()

  const { error, previousData, data = previousData, startPolling, stopPolling } = useQuery(GET_PAYMENT_DATA)

  useEffect(() => {
    // The Chargebee address update takes multiple seconds to update
    // therefore we must check and refetch data if the user leaves this view
    const unsubscribe = navigation?.addListener("focus", () => {
      if (data) {
        startPolling(1500)
        setTimeout(stopPolling, 20000)
      }
    })

    return unsubscribe
  }, [navigation])

  const [applePayUpdatePayment] = useMutation(PAYMENT_UPDATE, {
    onCompleted: () => {
      setIsMutating(false)
    },
    refetchQueries: [
      {
        query: GET_PAYMENT_DATA,
      },
    ],
    onError: (err) => {
      console.log("Error ChoosePlanPane.tsx", err)
      Sentry.captureException(JSON.stringify(err))
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue updating your payment method. Please retry or contact us.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      Keyboard.dismiss()
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  if (!data || error) {
    if (error) console.error("error PaymentAndShipping.tsx: ", error)
    return (
      <>
        <FixedBackArrow
          navigation={navigation}
          variant="whiteBackground"
          onPress={() => navigation.navigate(NavigationSchema.PageNames.Account)}
        />
        <Loader />
      </>
    )
  }

  const paymentPlan = data?.me?.customer?.paymentPlan

  const sections = []
  let shippingAddress = null
  let billingInfo = null
  let phoneNumber = null
  const customer = data?.me?.customer
  if (customer) {
    const details = customer.detail
    if (details?.shippingAddress) {
      shippingAddress = details.shippingAddress
      sections.push({
        title: "Shipping address",
        value: createShippingAddress(details.shippingAddress),
        onEdit: () => {
          navigation.navigate("EditPaymentAndShipping", {
            phoneNumber,
            shippingAddress,
          })
        },
        type: SectionType.AccountSection,
      })
    }

    if (customer?.billingInfo) {
      billingInfo = customer.billingInfo
      sections.push({
        title: "Billing address",
        value: createBillingAddress(customer.billingInfo),
        onEdit: () => {
          setOpenPopUp(true)
        },
        type: SectionType.AccountSection,
      })

      sections.push({
        title: "Payment info",
        value: `${customer.billingInfo.brand.toUpperCase()} ${customer.billingInfo.last_digits}`,
        onEdit: () => {
          setOpenPopUp(true)
        },
        type: SectionType.AccountSection,
      })
    }

    if (details?.phoneNumber) {
      phoneNumber = details?.phoneNumber
      sections.push({
        title: "Phone number",
        value: details.phoneNumber,
        onEdit: () => {
          navigation.navigate("EditPaymentAndShipping", {
            phoneNumber,
            shippingAddress,
          })
        },
        type: SectionType.AccountSection,
      })
    }

    if (customer?.invoices?.length > 0) {
      sections.push({
        title: "Payment history",
        value: customer?.invoices,
        type: SectionType.PaymentHistory,
      })
    }
  }

  const onApplePay = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ApplePayTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    const applePaySupportedOnDevice = await stripe.deviceSupportsApplePay()
    if (applePaySupportedOnDevice) {
      const canMakeApplePayment = await stripe.canMakeApplePayPayments()
      if (canMakeApplePayment) {
        // Customer has a payment card set up
        try {
          const token = await stripe.paymentRequestWithNativePay(
            {
              requiredBillingAddressFields: ["all"],
            },
            [
              {
                label: "SZNS Inc.",
                amount: `${paymentPlan.price / 100}.00`,
              },
            ]
          )
          applePayUpdatePayment({
            variables: {
              planID: paymentPlan.planID,
              token,
              tokenType: "apple_pay",
            },
            awaitRefetchQueries: true,
          })
          // You should complete the operation by calling
          stripe.completeApplePayRequest()
          setOpenPopUp(false)
          // setShowApplePaySuccess(true)
        } catch (error) {
          console.log("error", error)
          stripe.cancelApplePayRequest()
          setIsMutating(false)
          setOpenPopUp(false)
        }
      } else {
        // Customer hasn't set up apple pay on this device so we request payment setup
        stripe.openApplePaySetup()
        setIsMutating(false)
        setOpenPopUp(false)
      }
    }
  }

  const onAddCreditCard = () => {
    setOpenPopUp(false)
    navigation.navigate(NavigationSchema.StackNames.AccountStack, {
      screen: NavigationSchema.PageNames.EditCreditCard,
      params: { billingAddress: billingInfo, paymentPlan },
    })
  }

  const renderItem = (item) => {
    switch (item.type) {
      case SectionType.AccountSection:
        return <AccountSection title={item.title} value={item.value} onEdit={item.onEdit} />
      case SectionType.PaymentHistory:
        return <PaymentHistorySection title={item.title} value={item.value} />
    }
  }

  return (
    <>
      <Container insetsBottom={false}>
        <FixedBackArrow
          navigation={navigation}
          variant="whiteBackground"
          onPress={() => navigation.navigate(NavigationSchema.PageNames.Account)}
        />
        <FlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box px={2}>
              <Spacer mb={80} />
              <Sans size="7">Payment & shipping</Sans>
              <Spacer mb={4} />
            </Box>
          )}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => renderItem(item)}
        />
      </Container>
      <PopUp show={openPopUp}>
        <PaymentMethods onApplePay={onApplePay} onCreditCard={onAddCreditCard} setOpenPopUp={setOpenPopUp} />
      </PopUp>
    </>
  )
})
