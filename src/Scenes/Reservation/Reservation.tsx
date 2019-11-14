import { Box, ErrorPopUp, FixedButton, Flex, Sans, Separator, Spacer, Theme } from "App/Components"
import { CloseXIcon } from "Assets/icons"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { ScrollView, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components/native"

import { BagItem } from "../Bag/Components/BagItem"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions) {
    reserveItems(items: $items, options: $options) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  {
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
          billingInfo {
            last_digits
          }
        }
      }
    }
  }
`

export const ReservationView = props => {
  const { bag } = props
  const { data, loading } = useQuery(GET_CUSTOMER)
  const [reserveItems] = useMutation(RESERVE_ITEMS)
  const [showError, setShowError] = useState(false)

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
  const lastFourDigits = get(customer, "detail.billingInfo.last_digits", "")

  const SectionHeader = ({ title }) => {
    return (
      <>
        <Flex flexDirection="row" flex={1} width="100%">
          <Sans size="2" color="black">
            {title}
          </Sans>
          <EditButton ml="auto" size="2">
            Edit
          </EditButton>
        </Flex>
        <Spacer mb={1} />
        <Separator color="#e5e5e5" />
      </>
    )
  }

  console.log(address)

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
          {lastFourDigits && (
            <Box mb={4}>
              <SectionHeader title="Payment info" />
              <Sans size="2" color="gray" mt={1}>
                {lastFourDigits}
              </Sans>
            </Box>
          )}
          {phoneNumber && (
            <Box mb={4}>
              <SectionHeader title="Phone number" />
              <Sans size="2" color="gray" mt={1}>
                {phoneNumber}
              </Sans>
            </Box>
          )}
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
        <FixedButton
          onPress={async () => {
            // TODO: display loading screen
            try {
              const { data } = await reserveItems({
                variables: {
                  items: bag.items.map(item => item.variantID),
                },
              })
              if (data.reserveItems) {
                props.navigation.navigate("ReservationConfirmation", {
                  reservationID: data.reserveItems.id,
                })
              }
            } catch (e) {
              setShowError(true)
            }
          }}
        >
          Place order
        </FixedButton>
      </Box>

      <ErrorPopUp
        show={showError}
        title="One of your items is out of order!"
        note="Sorry, one of the items became unavailable while you checked out, please replacement with another item"
        buttonText="Got it"
        onClose={() => setShowError(false)}
      />
    </>
  )

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top }}>
        <CloseButton onPress={() => props.navigation.dismiss()}>
          <Box p="14px">
            <CloseXIcon />
          </Box>
        </CloseButton>
        <Box style={{ marginTop: 60 }} m={2}>
          <Sans size="3" color="white">
            Review your order
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

export const Reservation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationView)

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

const CloseButton = styled(TouchableOpacity)`
  background-color: rgba(255, 255, 255, 0.2);
  width: 40;
  height: 40;
  border-radius: 20;
  margin-left: auto;
  margin-right: 20;
`

const EditButton = styled(Sans)`
  color: #004eff;
  align-self: flex-end;
`
