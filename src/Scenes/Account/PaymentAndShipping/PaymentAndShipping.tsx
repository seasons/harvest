import { Box, Container, FixedBackArrow, FixedButton, Flex, Sans, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import { AccountSection } from "../PersonalPreferences/PersonalPreferences"
import { useSafeArea } from "react-native-safe-area-context"
import { space } from "styled-system"

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

const GET_CHARGEBEE_UPDATE_PAYMENT_PAGE = gql`
  query chargebeeUpdatePaymentPage($planID: PlanID!) {
    chargebeeUpdatePaymentPage(planID: $planID) {
      created_at
      embed
      expires_at
      id
      object
      resource_version
      state
      type
      updated_at
      url
    }
  }
`

export const createShippingAddress = shippingAddress => {
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

export const createBillingAddress = billingInfo => {
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

export const PaymentAndShipping: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeArea()
  const { loading, error, data } = useQuery(GET_PAYMENT_DATA)
  const {
    data: chargebeeUpdatePaymentData,
    loading: chargebeeUpdatePaymentLoading,
    error: chargebeeUpdatePaymentError
  } = useQuery(GET_CHARGEBEE_UPDATE_PAYMENT_PAGE, {
    variables: {
      planID: "Essential",
    },
  })

  if (loading || chargebeeUpdatePaymentLoading) {
    return <Loader />
  }

  if (error || chargebeeUpdatePaymentError) {
    console.error("error PaymentAndShipping.tsx: ", error)
    return <Loader />
  }

  const chargebeeUpdatePaymentHostedPage = get(chargebeeUpdatePaymentData, "chargebeeUpdatePaymentPage")

  console.log("UPDATE PAYMENT HOSTED PAGE:", chargebeeUpdatePaymentData)

  let sections = []
  let shippingAddress = null
  let billingInfo = null
  if (data?.me?.customer) {
    const customer = data.me.customer
    const details = customer.detail
    // console.log(details)
    console.log(customer.billingInfo)

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
      sections.push({ title: "Phone number", value: details.phoneNumber })
    }
  }

  const handleEditBtnPressed = () => {
    navigation.navigate("EditPaymentAndShipping", {
      billingInfo,
      chargebeeUpdatePaymentHostedPage,
      shippingAddress
    })
  }

  const renderItem = item => {
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
    <Container insetsBottom={0}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <FlatList
        data={sections}
        ListHeaderComponent={() => (
          <Box px={2} mt={insets.top}>
            <Spacer mb={2} />
            <Sans size="3">Payment & Shipping</Sans>
            <Spacer mb={4} />
          </Box>
        )}
        keyExtractor={item => item.title}
        renderItem={({ item }) => renderItem(item)}
      />
      <FixedButton block variant="primaryWhite" onPress={handleEditBtnPressed}>
        Edit
      </FixedButton>
    </Container>
  )
}
