import { Box, Container, Display, FixedButton, Flex, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color, space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { CheckCircled, Instagram } from "Assets/svgs"
import gql from "graphql-tag"
import React from "react"
import { useQuery } from "@apollo/client"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import Rate, { AndroidMarket } from "react-native-rate"
import { ReservationItem } from "./Components/ReservationItem"
import { ReservationLineItems } from "./ReservationLineItems"

enum Option {
  ShareToIG = "Share to IG",
  ReferAndEarn = "Refer and Earn",
}

const GET_CUSTOMER_RESERVATION_CONFIRMATION = gql`
  query GetCustomerReservationConfirmation($reservationID: ID!) {
    me {
      id
      user {
        id
        firstName
        lastName
        email
      }
      customer {
        id
        detail {
          id
          phoneNumber
          shippingAddress {
            id
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
          shippingOption {
            id
            externalCost
            shippingMethod {
              id
              displayText
            }
          }
          lineItems {
            id
            name
            price
            taxPrice
          }
          products {
            id
            productVariant {
              id
              product {
                id
                name
                modelSize {
                  id
                  display
                }
                brand {
                  id
                  name
                }
                images {
                  id
                  url
                }
                variants {
                  id
                  displayShort
                  displayLong
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ReservationConfirmation = screenTrack()((props) => {
  const tracking = useTracking()
  const reservationID = props?.route?.params?.reservationID
  const { previousData, data = previousData, error } = useQuery(GET_CUSTOMER_RESERVATION_CONFIRMATION, {
    variables: {
      reservationID,
    },
  })
  if (error) {
    console.log("error reservationConfirmation:", error)
  }

  if (!data) {
    return <Loader />
  }

  const customer = data?.me?.customer
  const address = customer?.detail?.shippingAddress
  const reservation = customer?.reservations?.[0]
  const items = reservation?.products

  const SectionHeader = ({ title, content = null, bottomSpacing = 1, hideSeparator = false }) => {
    return (
      <>
        <Flex flexDirection="row" style={{ flex: 1 }} width="100%">
          <Sans size="4" color="black100">
            {title}
          </Sans>
          {content && <Box ml="auto">{content}</Box>}
        </Flex>
        <Spacer mb={bottomSpacing} />
        {!hideSeparator && <Separator />}
      </>
    )
  }

  const formatedAddress1 =
    !!address?.address1 && `${address?.address1}${address?.address2 ? " " + address?.address2 : ""},`
  const formatedAddress2 = !!address?.city && `${address?.city}, ${address?.state} ${address?.zipCode}`
  const shippingOption = reservation?.shippingOption
  const shippingDisplayText = shippingOption?.shippingMethod?.displayText
  const externalCost = shippingOption?.externalCost
  const lineItems = reservation?.lineItems

  const shareToIG = async () => {
    props.navigation.navigate("Modal", { screen: "ShareReservationToIGModal", params: { reservationID } })
  }

  const SectionWrapper = ({ isFirst = false, isLast = false, onPress, children }) => {
    const defaultBorderWidth = 1
    const cornerRadius = 4
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Box
          style={{
            borderWidth: defaultBorderWidth,
            flex: 2,
            display: "flex",
            borderColor: color("black10"),
            borderRightWidth: isFirst ? defaultBorderWidth / 2.0 : defaultBorderWidth,
            borderLeftWidth: isLast ? defaultBorderWidth / 2.0 : defaultBorderWidth,
            borderTopLeftRadius: isFirst ? cornerRadius : 0,
            borderBottomLeftRadius: isFirst ? cornerRadius : 0,
            borderTopRightRadius: isLast ? cornerRadius : 0,
            borderBottomRightRadius: isLast ? cornerRadius : 0,
          }}
        >
          {children}
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  const OptionSections = ({ options }) => {
    return (
      <Flex flexDirection={"row"} flexGrow={1}>
        {options.map((option, index) => {
          const isFirst = index === 0
          const isLast = index === options.length

          switch (option) {
            case Option.ShareToIG:
              return (
                <SectionWrapper isFirst={isFirst} isLast={isLast} onPress={() => shareToIG()} key={index}>
                  <Flex py={2} alignItems="center">
                    <Instagram />
                    <Sans pt={0.5} size="4" color="black50">
                      Share to IG Stories
                    </Sans>
                  </Flex>
                </SectionWrapper>
              )
            case Option.ReferAndEarn:
              return (
                <SectionWrapper
                  isFirst={isFirst}
                  isLast={isLast}
                  onPress={() => props.navigation.navigate("ReferralView")}
                  key={index}
                >
                  <Flex py={2} alignItems="center">
                    <Box
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 12,
                        height: 24,
                        width: 24,
                        borderColor: color("black100"),
                        borderWidth: 1.5,
                      }}
                    >
                      <Display size="4" color="black100">
                        $
                      </Display>
                    </Box>
                    <Sans pt={0.5} size="4" color="black50">
                      Refer & earn
                    </Sans>
                  </Flex>
                </SectionWrapper>
              )
          }
        })}
      </Flex>
    )
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <Flex style={{ flex: 1 }} px={2}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Spacer mb={52} />
          <CheckCircled />
          <Box my={4}>
            <Sans size="7" color="black100">
              We've got your order!
            </Sans>
            <Sans size="4" color="black50">
              We've emailed you a confirmation and we'll notify you when its out for delivery.
            </Sans>
          </Box>
          <OptionSections options={[Option.ShareToIG, Option.ReferAndEarn]} />
          <Spacer pb={4} />
          <Box>
            <SectionHeader
              title="Order number"
              content={
                <>
                  {!!reservation.reservationNumber && (
                    <Sans size="4" color="black100" textAlign="right" ml="auto">
                      {reservation.reservationNumber}
                    </Sans>
                  )}
                </>
              }
            />
          </Box>
          {lineItems?.length > 0 && (
            <>
              <Spacer mb={2} />
              <ReservationLineItems lineItems={lineItems} />
            </>
          )}
          <Box pt={1}>
            <SectionHeader
              title="Shipping"
              content={
                <>
                  {!!formatedAddress1 && (
                    <Sans size="4" color="black100" textAlign="right">
                      {formatedAddress1}
                    </Sans>
                  )}
                  {!!formatedAddress2 && (
                    <Sans size="4" color="black100" textAlign="right">
                      {formatedAddress2}
                    </Sans>
                  )}
                </>
              }
              bottomSpacing={3}
            />
          </Box>
          <Box pt={1}>
            <SectionHeader
              title="Delivery"
              content={
                <>
                  {!!shippingDisplayText && (
                    <Sans size="4" color="black100" ml="auto" textAlign="right">
                      {shippingDisplayText}
                    </Sans>
                  )}
                </>
              }
              hideSeparator={!externalCost}
              bottomSpacing={4}
            />
          </Box>
          {!!externalCost && externalCost !== 0 && (
            <Box pt={1}>
              <SectionHeader
                title="Order total"
                content={
                  <Sans size="4" color="black100" ml="auto" textAlign="right">
                    ${externalCost / 100}
                  </Sans>
                }
                hideSeparator
                bottomSpacing={4}
              />
            </Box>
          )}
          <Box mb={5}>
            <SectionHeader title="Items" />
            <Box mt={1} mb={4}>
              {items?.map((item, i) => {
                return (
                  <Box key={item.id}>
                    <ReservationItem index={i} bagItem={item} navigation={props.navigation} />
                    <Spacer mb={1} />
                    {i !== items.length - 1 && <Separator />}
                    <Spacer mb={1} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <FixedButton
        positionBottom={space(2)}
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ReservationConfirmationDoneButtonTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          props.navigation.navigate("Bag", { reservationID: reservationID })
          const options = {
            AppleAppID: "1483089476",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: false,
          }
          Rate.rate(options, (success) => {
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
            }
          })
        }}
        block
      >
        Done
      </FixedButton>
    </Container>
  )
})
