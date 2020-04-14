import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import { AccountSection } from "../PersonalPreferences/PersonalPreferences"
import { screenTrack } from "App/utils/track"

export const GET_PAYMENT_DATA = gql`
  query GetUserPaymentData {
    me {
      customer {
        detail {
          phoneNumber
          shippingAddress {
            name
            company
            address1
            address2
            city
            state
            zipCode
          }
        }
        billingInfo {
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
        customer {
          billingInfo {
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

export const PaymentAndShipping = screenTrack()(({ navigation }) => {
  let timeout1
  let timeout2
  let timeout3
  let timeout4
  const { error, data, refetch } = useQuery(GET_PAYMENT_DATA)
  useEffect(() => {
    // The Chargebee address update takes multiple seconds to update
    // therefore we must check and refetch data if the user leaves this view
    const unsubscribe = navigation.addListener("focus", () => {
      if (data) {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        clearTimeout(timeout3)
        clearTimeout(timeout4)
        timeout1 = setTimeout(() => {
          refetch()
        }, 1000)
        timeout2 = setTimeout(() => {
          refetch()
        }, 5000)
        timeout3 = setTimeout(() => {
          refetch()
        }, 10000)
        timeout4 = setTimeout(() => {
          refetch()
        }, 20000)
      }
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
      clearTimeout(timeout4)
    }
  }, [])

  if (!data) {
    return <Loader />
  }

  if (error) {
    console.error("error PaymentAndShipping.tsx: ", error)
    return <Loader />
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
  }

  const handleEditBtnPressed = () => {
    navigation.navigate("EditPaymentAndShipping", {
      billingInfo,
      phoneNumber,
      shippingAddress,
    })
  }

  const renderItem = (item) => {
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <FlatList
        data={sections}
        ListHeaderComponent={() => (
          <Box px={2}>
            <Spacer mb={80} />
            <Sans size="3">Payment & Shipping</Sans>
            <Spacer mb={4} />
          </Box>
        )}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
      <FixedButton block variant="primaryWhite" onPress={handleEditBtnPressed}>
        Edit
      </FixedButton>
    </Container>
  )
})
