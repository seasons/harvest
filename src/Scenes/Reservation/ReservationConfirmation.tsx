import { Box, FixedButton, Flex, Sans, Separator, Spacer, Theme } from "App/Components"
import { setActiveReservation } from "App/Redux/actions"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"

import { BagItem } from "../Bag/Components/BagItem"

const GET_CUSTOMER = gql`
  query GetCustomer($reservationID: ID!) {
    me {
      user {
        firstName
        lastName
        email
      }
      customer {
        id
        detail {
          phoneNumber
          shippingAddress {
            slug
            name
            address1
            address2
            city
            state
            zipCode
          }
        }
        billingInfo {
          brand
          last_digits
        }
        reservations(where: { id: $reservationID }) {
          id
          reservationNumber
          products {
            id
            productVariant {
              id
              product {
                id
              }
            }
          }
        }
      }
    }
  }
`

export const ReservationConfirmationView = props => {
  const reservationID = get(props, "navigation.state.params.reservationID", "ck2tvabt6172l07017jcsr2a1")
  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    variables: {
      reservationID,
    },
  })
  console.log(data)
  const insets = useSafeArea()

  const customer = get(data, "me.customer")
  const address = get(customer, "detail.shippingAddress", {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const billingInfo = get(customer, "detail.billingInfo", { brand: "", last_digits: "" })
  const reservation = get(data, "me.customer.reservations[0]", { reservationNumber: "", products: [] })

  const items =
    (reservation &&
      reservation.products.map(item => ({
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      }))) ||
    []

  const SectionHeader = ({ title }) => {
    return (
      <>
        <Flex flexDirection="row" flex={1} width="100%">
          <Sans size="2" color="black">
            {title}
          </Sans>
        </Flex>
        <Spacer mb={1} />
        <Separator color="#e5e5e5" />
      </>
    )
  }

  const content = (
    <>
      <Flex flex={1} p={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Box>
            <Flex flexDirection="row" flex={1} width="100%">
              <Sans size="2" color="black">
                Order number
              </Sans>
              <Sans size="2" color="black" ml="auto">
                {reservation.reservationNumber}
              </Sans>
            </Flex>
            <Spacer mb={1} />
            <Separator color="#e5e5e5" />
          </Box>
          <Box>
            <Flex flexDirection="row" flex={1} width="100%">
              <Box py={1}>
                <Sans size="2" color="black">
                  Shipping
                </Sans>
              </Box>
              <Box ml="auto" py={1}>
                <Sans size="2" color="gray" mt={1} textAlign="right">
                  {`${address.address1} ${address.address2}`}
                </Sans>
                <Sans size="2" color="gray" textAlign="right">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            </Flex>
            <Spacer mb={1} />
            <Separator color="#e5e5e5" />
          </Box>
          <Box>
            <Flex flexDirection="row" flex={1} width="100%" py={1}>
              <Sans size="2" color="black">
                Delivery
              </Sans>
              <Sans size="2" color="black" ml="auto">
                {`UPS Ground - 2 day shipping`}
              </Sans>
            </Flex>
            <Spacer mb={1} />
          </Box>
          <Box mt={4} mb={5}>
            <SectionHeader title="Items" />
            <Box mt={2} mb="80">
              {items.map((item, i) => {
                return (
                  <Box key={item.productID}>
                    <BagItem removeItemFromBag={() => null} sectionHeight={200} index={i} bagItem={item} saved={true} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <Box mb={insets.bottom}>
        <FixedButton
          onPress={() => {
            setActiveReservation(reservationID)
            props.navigation.navigate("Bag", { reservationID: reservationID })
            props.navigation.dismiss()
          }}
        >
          Done
        </FixedButton>
      </Box>
    </>
  )

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top }}>
        <Box style={{ marginTop: 60 }} m={2}>
          <Sans size="3" color="white">
            We've got your order!
          </Sans>
          <Sans size="1" color="gray">
            We've emailed you a confirmation and we'll notify you when its out for delivery.
          </Sans>
        </Box>
        <Content>{content}</Content>
      </Container>
    </Theme>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setActiveReservation,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag } = state
  return { bag }
}

export const ReservationConfirmation = connect(mapStateToProps, mapDispatchToProps)(ReservationConfirmationView)

const Container = styled(Box)`
  background: black;
  flex: 1;
`

const Content = styled(Box)`
  background: white;
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  overflow: hidden;
  flex: 1;
`
