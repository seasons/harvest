import { Box, Container, FixedBackArrow, Flex, Sans, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { FlatList } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"

import { AccountSection } from "../PersonalPreferences/PersonalPreferences"
import { useSafeArea } from "react-native-safe-area-context"

const GET_PAYMENT_DATA = gql`
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
          last_digits
          street1
          street2
          city
          state
          postal_code
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

export const PaymentAndShipping: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const insets = useSafeArea()
  const [sections, setSections] = useState([])
  const { loading, error, data } = useQuery(GET_PAYMENT_DATA)

  useEffect(() => {
    if (data && data.me && data.me.customer) {
      const sectionsArray = []
      const customer = data.me.customer
      const details = customer.detail
      const activeReservation = data.me.activeReservation

      if (details && details.shippingAddress) {
        sectionsArray.push({ title: "Shipping address", value: createShippingAddress(details.shippingAddress) })
      }

      if (customer && customer.billingInfo) {
        sectionsArray.push({
          title: "Billing address",
          value: createBillingAddress(customer.billingInfo),
        })

        sectionsArray.push({
          title: "Payment info",
          value: customer.billingInfo.last_digits,
        })
      }

      if (details && details.phoneNumber) {
        sectionsArray.push({ title: "Phone number", value: details.phoneNumber })
      }

      setSections(sectionsArray)
    }
  }, [data])

  if (loading) {
    return <Loader />
  }

  if (error) {
    console.error("error PaymentAndShipping.tsx: ", error)
    return <Loader />
  }

  const renderItem = item => {
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
    <Container>
      <>
        <FixedBackArrow navigation={navigation} />
        <FlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box px={2} mt={insets.top}>
              <Spacer mb={80} />
              <Sans size="3">Payment & Shipping</Sans>
              <Spacer mb={3} />
            </Box>
          )}
          keyExtractor={item => item.title}
          renderItem={({ item }) => renderItem(item)}
        />
      </>
    </Container>
  )
}
