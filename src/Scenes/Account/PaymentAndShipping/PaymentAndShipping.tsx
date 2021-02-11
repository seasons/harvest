import { Box, Container, FixedBackArrow, FixedButton, Sans, Spacer, Separator, Flex } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { FlatList, StyleSheet } from "react-native"
import { screenTrack } from "App/utils/track"
import { color } from "App/utils"
import { Schema as NavigationSchema } from "App/Navigation"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { getAdjustedInvoiceTotal, formatInvoiceDate } from "./utils"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"

export const GET_PAYMENT_DATA = gql`
  query GetUserPaymentData {
    me {
      id
      customer {
        id
        detail {
          id
          phoneNumber
          shippingAddress {
            id
            name
            company
            address1
            address2
            city
            state
            zipCode
          }
        }
        invoices {
          id
          status
          closingDate
          dueDate
          amount
          lineItems {
            id
            dateFrom
            isTaxed
            taxAmount
            taxRate
            discountAmount
            description
            entityDescription
            entityType
            entityId
            amount
          }
          billingAddress {
            firstName
            lastName
            line1
            line2
            line3
            city
            state
            zip
          }
          creditNotes {
            id
            reasonCode
            date
            total
            status
          }
          discounts {
            amount
            description
          }
        }
        billingInfo {
          id
          brand
          city
          expiration_month
          expiration_year
          last_digits
          name
          postal_code
          state
          street1
          street2
        }
      }
      activeReservation {
        id
        customer {
          id
          billingInfo {
            id
            last_digits
            street1
            street2
            city
            state
            postal_code
          }
        }
      }
    }
  }
`

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

const AccountSection: React.FC<{ title: string; value: string | [string] }> = ({ title, value }) => {
  return (
    <Box key={title} px={2}>
      <Sans size="5">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      <Box mb={1} />
      {Array.isArray(value) ? (
        value.map((text) => (
          <Sans key={text} size="5" color="black50">
            {text}
          </Sans>
        ))
      ) : (
        <Sans size="5" color="black50">
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
      <Sans size="5">{title}</Sans>
      <Box mb={1} />
      <Separator color={color("black10")} />
      {value.map((a) => (
        <>
          <Spacer mb={3} />
          <TouchableOpacity key={title} onPress={() => navigation.navigate("InvoiceDetail", { invoice: a })}>
            <Flex flexDirection="row" style={{ flex: 1 }} justifyContent="space-between">
              <Sans size="5">{formatInvoiceDate(a.dueDate)}</Sans>
              <Sans size="5">{getAdjustedInvoiceTotal(a)}</Sans>
            </Flex>
          </TouchableOpacity>
          <Spacer mb={3} />
          <Separator color={color("black10")} />
        </>
      ))}
      <Spacer mb={100} />
    </Box>
  )
}

export const PaymentAndShipping = screenTrack()(({ navigation }) => {
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

  const sections = []
  let shippingAddress = null
  let billingInfo = null
  let phoneNumber = null
  const customer = data?.me?.customer
  if (customer) {
    const details = customer.detail
    if (details?.shippingAddress) {
      shippingAddress = details.shippingAddress
      sections.push({ title: "Shipping address", value: createShippingAddress(details.shippingAddress) })
    }

    if (customer?.billingInfo) {
      billingInfo = customer.billingInfo
      sections.push({
        title: "Billing address",
        value: createBillingAddress(customer.billingInfo),
      })

      sections.push({
        title: "Payment info",
        value: `${customer.billingInfo.brand.toUpperCase()} ${customer.billingInfo.last_digits}`,
      })
    }

    if (details?.phoneNumber) {
      phoneNumber = details?.phoneNumber
      sections.push({ title: "Phone number", value: details.phoneNumber })
    }

    if (customer?.invoices) {
      sections.push({
        title: "Payment history",
        value: customer.invoices,
      })
    }
  }

  const handleEditBtnPressed = () => {
    navigation.navigate("EditPaymentAndShipping", {
      billingInfo,
      phoneNumber,
      shippingAddress,
    })
  }

  const renderItem = (item) => {
    if (item.title === "Payment history") {
      return <PaymentHistorySection title={item.title} value={item.value} />
    }
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
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
            <Sans size="7">Payment & Shipping</Sans>
            <Spacer mb={4} />
          </Box>
        )}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
      <FadeBottom2
        style={{
          ...StyleSheet.absoluteFillObject,
          top: "95%",
        }}
      ></FadeBottom2>
      <FixedButton block variant="primaryWhite" onPress={handleEditBtnPressed}>
        Edit
      </FixedButton>
    </Container>
  )
})
