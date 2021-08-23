import gql from "graphql-tag"
import React from "react"
import { useQuery } from "@apollo/client"
import { Linking, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box, Button, Container, FixedBackArrow, Sans, SectionHeader, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { MembershipCard } from "./Components"
import { PauseButtons } from "App/Components/Pause"
import { Schema } from "App/Navigation"

export const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    me {
      id
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
          subscriptionId
          pauseRequests(orderBy: createdAt_DESC) {
            id
            resumeDate
            pauseDate
            pausePending
          }
          subscription {
            id
            nextBillingAt
          }
          plan {
            id
            planID
            price
            description
            itemCount
            pauseWithItemsPrice
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
  const { previousData, data = previousData } = useQuery(GET_MEMBERSHIP_INFO)
  const customer = data?.me?.customer
  const firstName = data?.me?.user?.firstName
  const lastName = data?.me?.user?.lastName
  const plan = customer?.membership?.plan
  const payPeriod = plan?.planID === "access-yearly" ? "year" : "month"
  const isPaused = customer?.status === "Paused"

  if (!plan) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const whatsIncluded = plan?.description?.split("\n")

  // For now since we don't support downgrading on Access plans
  // only show change plan if they can upgrade only or change to Access
  const canChangePlan = plan.planID !== "access-yearly"

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
              <SectionHeader title="What you pay" />
              <Spacer mb={1} />
              <Sans size="4" color={color("black50")}>
                {`$${plan.price / 100} / per ${payPeriod}`}
              </Sans>
            </>
          )}
          {!!whatsIncluded && (
            <>
              <Spacer mb={4} />
              <SectionHeader title="Whats included" />
              <Spacer mb={1} />
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
          <SectionHeader title={canChangePlan || isPaused ? "Update your plan" : "Cancel membership"} />
          <Spacer mb={2} />
          <PauseButtons customer={customer} />
        </Box>
      </ScrollView>
    </Container>
  )
})
