import { Box, FixedButton, Flex, PopUp, Sans, Separator, Spacer, Theme } from "App/Components"
import { Loader } from "App/Components/Loader"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { CloseXIcon } from "Assets/icons"
import gql from "graphql-tag"
import { get } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { ScrollView, StatusBar, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"

import { BagItem, BagItemFragment } from "../Bag/Components/BagItem"

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

export const Reservation = props => {
  const [isMutating, setIsMutating] = useState(false)
  const insets = useSafeArea()
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
                      <BagItem
                        sectionHeight={200}
                        index={i}
                        bagItem={item}
                        navigation={props.navigation}
                        saved={true}
                      />
                    </Box>
                  )
                })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <FixedButton
        loading={isMutating}
        disabled={isMutating}
        onPress={async () => {
          if (isMutating) {
            return
          }
          setIsMutating(true)
          try {
            const { data } = await reserveItems({
              variables: {
                items: items?.map(item => item?.productVariant?.id),
              },
            })
            if (data.reserveItems) {
              props.navigation.navigate("ReservationConfirmation", {
                reservationID: data.reserveItems.id,
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

      <PopUp data={popUpData} show={showError} />
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
