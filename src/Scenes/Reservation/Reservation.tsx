import { Box, CloseButton, FixedButton, Flex, PopUp, Sans, Separator, Spacer, Theme, Container } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { ScrollView, StatusBar } from "react-native"
import styled from "styled-components/native"

import { BagItem, BagItemFragment } from "../Bag/Components/BagItem"
import { space } from "App/utils"
import { screenTrack, useTracking, Schema } from "App/utils/track"

const RESERVE_ITEMS = gql`
  mutation ReserveItems($items: [ID!]!, $options: ReserveItemsOptions) {
    reserveItems(items: $items, options: $options) {
      id
    }
  }
`

const GET_CUSTOMER = gql`
  query GetCustomer {
    me {
      user {
        firstName
        lastName
        email
      }
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
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
          last_digits
        }
      }
    }
  }
  ${BagItemFragment}
`

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

export const Reservation = screenTrack()(props => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const { data, loading } = useQuery(GET_CUSTOMER)
  const [reserveItems] = useMutation(RESERVE_ITEMS, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: err => {
      setIsMutating(false)
      console.warn("Error reservation.tsx: ", err)
    },
  })
  const [showError, setShowError] = useState(false)

  if (loading) {
    return <Loader />
  }

  const customer = get(data, "me.customer")
  const address = get(customer, "detail.shippingAddress", {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const phoneNumber = get(customer, "detail.phoneNumber", "")
  const items = data?.me?.bag ?? []

  const popUpData = {
    title: "Sorry!",
    note: "We couldn't process your order because of an unexpected error, please try again later",
    buttonText: "Close",
    onClose: () => setShowError(false),
  }

  const content = (
    <>
      <StatusBar backgroundColor="dark" barStyle="light-content" />
      <Flex flex={1} px={2}>
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

          {phoneNumber && (
            <Box mb={4}>
              <SectionHeader title="Phone number" />
              <Sans size="2" color="gray" mt={1}>
                {phoneNumber || ""}
              </Sans>
            </Box>
          )}
          <Box mb={5}>
            <SectionHeader title="Items" />
            <Box mt={2} mb="80">
              {!!items &&
                items.map((item, i) => {
                  return (
                    <Box key={item.id}>
                      <BagItem sectionHeight={200} index={i} bagItem={item} navigation={props.navigation} hideButtons />
                      <Spacer mb={2} />
                    </Box>
                  )
                })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
    </>
  )

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="black100">
      <CloseButton navigation={props.navigation} />
      <Box px={2} pb={3}>
        <Sans size="3" color="white">
          Review your order
        </Sans>
      </Box>
      <Content>{content}</Content>
      <FixedButton
        positionBottom={space(4)}
        loading={isMutating}
        disabled={isMutating}
        onPress={async () => {
          if (isMutating) {
            return
          }
          tracking.trackEvent({
            actionName: Schema.ActionNames.PlaceOrderTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          setIsMutating(true)
          try {
            const { data } = await reserveItems({
              variables: {
                items: items?.map(item => item?.productVariant?.id),
              },
            })
            if (data.reserveItems) {
              props.navigation.navigate("Modal", {
                screen: "ReservationConfirmationModal",
                params: { reservationID: data.reserveItems.id },
              })
            }
          } catch (e) {
            setShowError(true)
            setIsMutating(false)
          }
        }}
        block
      >
        Place order
      </FixedButton>
      <PopUp data={popUpData} show={showError} insetsBottom />
    </Container>
  )
})

const Content = styled(Box)`
  background: white;
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  overflow: hidden;
  flex: 1;
`
