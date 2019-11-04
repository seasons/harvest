import React from "react"
import styled from "styled-components/native"
import { Theme, Box, Separator, Spacer, Sans, FixedButton, Flex } from "App/Components"
import { color } from "App/Utils"
import { useMutation, useQuery } from "react-apollo"
import gql from "graphql-tag"
import { BackArrowIcon } from "Assets/icons"
import { TouchableWithoutFeedback, ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { get } from "lodash"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { BagItem } from "../Bag/Components/BagItem"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!) {
    reserveItems(items: $items) {
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
        }
      }
    }
  }
`

export const ReservationView = props => {
  const { bag } = props
  const { data, loading } = useQuery(GET_CUSTOMER)
  const [reserveItems] = useMutation(RESERVE_ITEMS)
  const insets = useSafeArea()

  const handleReserve = () => {
    reserveItems({
      variables: {
        // items: [].items.map(item => item.variantID),
      },
    })
  }

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
          <EditButton ml="auto" size="2">
            Edit
          </EditButton>
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
      <FixedButton onPress={() => handleReserve()}>Place order</FixedButton>
    </>
  )

  return (
    <Theme>
      <Container style={{ paddingTop: insets.top }}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Box m={2}>
            <BackArrowIcon />
          </Box>
        </TouchableWithoutFeedback>
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

const EditButton = styled(Sans)`
  color: #004eff;
  align-self: flex-end;
`
