import { Box, Container, FixedBackArrow, Sans, Spacer, Separator, Flex } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FlatList, Keyboard } from "react-native"
import { Schema as TrackSchema, useTracking, screenTrack } from "App/utils/track"
import { color } from "App/utils"
import { Schema as NavigationSchema } from "App/Navigation"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { getAdjustedInvoiceTotal, formatInvoiceDate } from "./utils"
import { PopUp } from "App/Components/PopUp"
import stripe from "tipsi-stripe"
import * as Sentry from "@sentry/react-native"
import { PaymentMethods } from "./PaymentMethods"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { GET_PAYMENT_DATA } from "./queries"

export const createShippingAddress = (shippingAddress) => {
  const addressArray = []
  if (shippingAddress.address1) {
    addressArray.push(shippingAddress.address1)
  }
  if (shippingAddress.address2) {
    addressArray.push(shippingAddress.address2)
  }
  if (shippingAddress.city && shippingAddress.state && shippingAddress.zipCode) {
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

const AccountSection: React.FC<{ title: string; value: string | [string]; onEdit: () => void }> = ({
  title,
  value,
  onEdit,
}) => {
  return (
    <Box key={title} px={2}>
      <Flex flexDirection="row" justifyContent={!!onEdit ? "space-between" : "flex-start"} alignItems="center">
        <Sans size="4">{title}</Sans>
        {!!onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Sans size="4" style={{ textDecorationLine: "underline" }}>
              Edit
            </Sans>
          </TouchableOpacity>
        )}
      </Flex>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map((text) => (
          <Sans key={text} size="4" color="black50">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="4" color="black50">
          {value}
        </Sans>
      )}
      <Spacer mb={4} />
    </Box>
  )
}

const PaymentHistorySection: React.FC<{ title: string; value: any }> = ({ title, value }) => {
  const navigation = useNavigation()
  return (
    <Box key={title} px={2}>
      <Sans size="4">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      {value?.map((a, i) => (
        <Box key={i}>
          <Spacer mb={3} />
          <TouchableOpacity key={title} onPress={() => navigation.navigate("InvoiceDetail", { invoice: a })}>
            <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="space-between">
              <Sans size="4">{formatInvoiceDate(a.dueDate)}</Sans>
              <Sans size="4">{getAdjustedInvoiceTotal(a)}</Sans>
            </Flex>
          </TouchableOpacity>
          <Spacer mb={3} />
          <Separator color={color("black10")} />
        </Box>
      ))}
      <Spacer mb={100} />
    </Box>
  )
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
      })

      sections.push({
        title: "Payment info",
        value: `${customer.billingInfo.brand.toUpperCase()} ${customer.billingInfo.last_digits}`,
        onEdit: () => {
          setOpenPopUp(true)
        },
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
      })
    }

    if (customer?.invoices) {
      sections.push({
        title: "Payment history",
        value: customer.invoices,
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
    if (item.title === "Payment history") {
      return <PaymentHistorySection title={item.title} value={item.value} />
    }
    return <AccountSection title={item.title} value={item.value} onEdit={item.onEdit} />
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
