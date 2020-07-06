import gql from "graphql-tag"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { MembershipCard } from "./Components"
import { PauseButtons } from "App/Components/Pause"

export const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    paymentPlans(where: { status: "active" }) {
      id
      description
      planID
      status
      name
      price
    }
    me {
      customer {
        id
        plan
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
  const insets = useSafeArea()
  const { data } = useQuery(GET_MEMBERSHIP_INFO)

  const customer = data?.me?.customer
  const customerPlan = customer?.plan
  const firstName = data?.me?.user?.firstName
  const lastName = data?.me?.user?.lastName
  const paymentPlans = data?.paymentPlans

  const plan = paymentPlans?.find((plan) => {
    plan.name === customerPlan
  })

  if (!plan) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const whatsIncluded = plan.description.split("\n")

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <ScrollView>
        <Box px={2} pb={insets.bottom}>
          <Spacer mb={80} />
          <Sans size="3">Membership info</Sans>
          <Spacer mb={3} />
          <MembershipCard memberName={`${firstName} ${lastName}`} planName={plan?.name} />
          <Spacer mb={4} />
          {!!plan?.price && (
            <>
              <Sans size="1">What you pay</Sans>
              <Spacer mb={12} />
              <Separator />
              <Spacer mb={1} />
              <Sans size="1" color={color("black50")}>
                {`$${plan.price / 100}`} / per month
              </Sans>
            </>
          )}
          {!!whatsIncluded && (
            <>
              <Spacer mb={4} />
              <Sans size="1">Whats included</Sans>
              <Spacer mb={12} />
              <Separator />
              {whatsIncluded.map((text) => (
                <Box key={text}>
                  <Spacer mb={1} />
                  <Sans size="1" color={color("black50")}>
                    {text.trim()}
                  </Sans>
                </Box>
              ))}
            </>
          )}
          <Spacer mb={4} />
          <Sans size="1">Upgrade your plan</Sans>
          <Spacer mb={12} />
          <Separator />
          <Spacer mb={1} />
          <Sans size="1" color={color("black50")}>
            Interested in upgrading or downgrading your current plan? Contact us below.
          </Sans>
          <Spacer mb={4} />
          <Sans size="1">Pause or cancel</Sans>
          <Spacer mb={12} />
          <Separator />
          <Spacer mb={1} />
          <PauseButtons customer={customer} />
        </Box>
      </ScrollView>
    </Container>
  )
})
