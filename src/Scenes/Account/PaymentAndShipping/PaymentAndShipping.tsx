import { Box, Container, Sans, Spacer, FixedBackArrow, Flex } from "App/Components"
import React, { useState, useEffect } from "react"
import { FlatList } from "react-native"
import { useQuery } from "react-apollo"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import gql from "graphql-tag"
import { AccountSection } from "../PersonalPreferences/PersonalPreferences"
import { Loader } from "App/Components/Loader"

const GET_PAYMENT_DATA = gql`
  query getUser {
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
    addressArray.push(billingInfo.address1)
  }
  if (billingInfo.street2) {
    addressArray.push(billingInfo.address2)
  }
  if (billingInfo.city && billingInfo.state && billingInfo.zipCode) {
    addressArray.push(`${billingInfo.city}, ${billingInfo.state}, ${billingInfo.postal_code}`)
  }
  return addressArray
}

export const PaymentAndShipping: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const [sections, setSections] = useState([])
  const { loading, error, data } = useQuery(GET_PAYMENT_DATA)

  useEffect(() => {
    if (data && data.me && data.me.customer) {
      const sectionsArray = []
      const details = data.me.customer.detail
      const activeReservation = data.me.activeReservation

      if (details && details.shippingAddress) {
        sectionsArray.push({ title: "Shipping address", value: createShippingAddress(details.shippingAddress) })
      }

      if (activeReservation && activeReservation.customer && activeReservation.customer.billingInfo) {
        sectionsArray.push({
          title: "Billing address",
          value: createBillingAddress(activeReservation.customer.billingInfo),
        })

        if (activeReservation.customer.billingInfo.last_digits)
          sectionsArray.push({
            title: "Payment info",
            value: activeReservation.customer.billingInfo.last_digits,
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
    console.log("error PaymentAndShipping.tsx: ", error)
    return <Loader />
  }

  const renderItem = item => {
    return <AccountSection title={item.title} value={item.value} />
  }

  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <FixedBackArrow navigation={navigation} />
        <FlatList
          data={sections}
          ListHeaderComponent={() => (
            <Box px={2} mt={4}>
              <Spacer mb={80} />
              <Sans size="3">Payment & Shipping</Sans>
              <Spacer mb={3} />
            </Box>
          )}
          keyExtractor={item => item.title}
          renderItem={({ item }) => renderItem(item)}
        />
      </Flex>
    </Container>
  )
}
