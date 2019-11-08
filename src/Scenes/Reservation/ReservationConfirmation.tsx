import React from "react"
import styled from "styled-components/native"
import { Theme, Box, Separator, Spacer, Sans, FixedButton, Flex } from "App/Components"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { get } from "lodash"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { BagItem } from "../Bag/Components/BagItem"

const GET_CUSTOMER = gql`
  query GetCustomer($reservationID: String!) {
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
        reservations(where: { id: $reservationID }) {
          id
          reservationNumber
        }
      }
    }
  }
`

export const ReservationConfirmationView = props => {
  const { bag } = props
  const { data, loading } = useQuery(GET_CUSTOMER, {
    variables: {
      reservationID: get(props, "navigation.state.params.reservationID"),
    },
  })
  const insets = useSafeArea()

  const customer = get(data, "me.customer")
  const address = get(customer, "detail.shippingAddress", {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const phoneNumber = get(customer, "detail.phoneNumber")

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
          <Box mt={2} mb={4}>
            <SectionHeader title="Shipping address" />
            <Sans size="2" color="gray" mt={1}>
              {`${address.address1} ${address.address2}`}
            </Sans>
            <Sans size="2" color="gray">
              {`${address.city}, ${address.state} ${address.zipCode}`}
            </Sans>
          </Box>
          <Box mb={4}>
            <SectionHeader title="Payment info" />
            <Sans size="2" color="gray" mt={1}>
              {`0007`}
            </Sans>
          </Box>
          <Box mb={4}>
            <SectionHeader title="Phone number" />
            <Sans size="2" color="gray" mt={1}>
              {phoneNumber}
            </Sans>
          </Box>
          <Box mb={5}>
            <SectionHeader title="Items" />
            <Box mt={2} mb="80">
              {bag.items.map((item, i) => {
                return (
                  <Box my={1} key={item.productID}>
                    <BagItem
                      removeItemFromBag={() => null}
                      sectionHeight={200}
                      index={i}
                      bagItem={item}
                      showRemoveButton={false}
                    />
                    <Spacer mb={1} />
                    <Separator color="#e5e5e5" />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <Box mb={insets.bottom}>
        <FixedButton onPress={() => props.navigation.dismiss()}>Done</FixedButton>
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

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const mapStateToProps = state => {
  const { bag } = state
  return { bag }
}

export const ReservationConfirmation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationConfirmationView)

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

const EditButton = styled(Sans)`
  color: #004eff;
  align-self: flex-end;
`
