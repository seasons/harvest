import gql from "graphql-tag"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box, Button, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { MembershipCard } from "./Components"
import { PauseButtons } from "App/Components/Pause"
import { Schema } from "App/Navigation"

export const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    me {
      customer {
        id
        status
        invoices {
          id
          subscriptionId
          dueDate
        }
        membership {
          id
          pauseRequests(orderBy: createdAt_DESC) {
            id
            resumeDate
            pauseDate
            pausePending
          }
          plan {
            id
            price
            description
          }
        }
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export const MembershipInfo = screenTrack()(({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { data } = useQuery(GET_MEMBERSHIP_INFO)
  const customer = data?.me?.customer
  const firstName = data?.me?.user?.firstName
  const lastName = data?.me?.user?.lastName
  const plan = customer?.membership?.plan

  if (!plan) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const whatsIncluded = plan?.description?.split("\n")

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <ScrollView>
        <Box px={2} pb={insets.bottom}>
          <Spacer mb={80} />
          <Sans size="7">Membership info</Sans>
          <Spacer mb={3} />
          <MembershipCard memberName={`${firstName} ${lastName}`} />
          <Spacer mb={4} />
          {!!plan?.price && (
            <>
              <Sans size="4">What you pay</Sans>
              <Spacer mb={12} />
              <Separator />
              <Spacer mb={1} />
              <Sans size="4" color={color("black50")}>
                {`$${plan.price / 100}`} / per month
              </Sans>
            </>
          )}
          {!!whatsIncluded && (
            <>
              <Spacer mb={4} />
              <Sans size="4">Whats included</Sans>
              <Spacer mb={12} />
              <Separator />
              {whatsIncluded.map((text) => (
                <Box key={text}>
                  <Spacer mb={1} />
                  <Sans size="4" color={color("black50")}>
                    {text.trim()}
                  </Sans>
                </Box>
              ))}
            </>
          )}
          <Spacer mb={4} />
          <Sans size="4">Change your plan</Sans>
          <Spacer mb={2} />
          <Button
            variant="secondaryWhite"
            onPress={() => navigation.navigate("Modal", { screen: Schema.PageNames.UpdatePaymentPlanModal })}
            block
          >
            View membership options
          </Button>
          <Spacer mb={4} />
          <Sans size="4">Pause or cancel</Sans>
          <Spacer mb={2} />
          <PauseButtons customer={customer} />
        </Box>
      </ScrollView>
    </Container>
  )
})
