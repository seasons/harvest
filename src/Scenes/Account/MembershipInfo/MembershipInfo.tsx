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

  const itemCount = plan?.itemCount

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
                {`${itemCount} items, $${plan.price / 100}`} / per month
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
          <SectionHeader title={canChangePlan ? "Change your plan" : "Cancel membership"} />
          <Spacer mb={2} />
          {canChangePlan && (
            <>
              <Button
                variant="secondaryWhite"
                onPress={() => navigation.navigate("Modal", { screen: Schema.PageNames.UpdatePaymentPlanModal })}
                block
              >
                View membership options
              </Button>
              <Spacer mb={2} />
            </>
          )}
          <Button
            variant="secondaryWhite"
            onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
            block
          >
            Contact us
          </Button>
          <Spacer mb={2} />
          <Sans size="4" color={color("black50")}>
            If you’d like to cancel your membership, contact us using the button above. We’re happy to help with this.
          </Sans>
        </Box>
      </ScrollView>
    </Container>
  )
})
