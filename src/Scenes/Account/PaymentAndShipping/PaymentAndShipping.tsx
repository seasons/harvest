import { Box, Container, Sans, Separator, Spacer, FixedBackArrow } from "App/Components"
import React, { useState, useEffect } from "react"
import { space } from "App/Utils"
import styled from "styled-components/native"
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

export const PaymentAndShipping: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const [sections, setSections] = useState([])
  const { loading, error, data } = useQuery(GET_PAYMENT_DATA)

  useEffect(() => {
    if (data && data.me && data.me.customer && data.me.customer.detail) {
      const sectionsArray = []
      const details = data.me.customer.detail

      if (details.shippingAddress) {
        sectionsArray.push({ title: "Shipping address", value: createShippingAddress(details.shippingAddress) })
      }

      if (details.phoneNumber) {
        sectionsArray.push({ title: "Phone number", value: details.phoneNumber })
      }

      setSections(sectionsArray)
    }
  }, [data])

  if (loading) {
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
            <Box px={2}>
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

const FixedButtonWrapper = styled(Box)`
  position: absolute;
  bottom: ${space(1)};
`
