import gql from "graphql-tag"
import React from "react"
import { useQuery } from "@apollo/client"
import { ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box, Container, FixedBackArrow, Flex, Sans, SectionHeader, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { MembershipCard } from "./Components"
import { PauseButtons } from "App/Components/Pause"
import { ListCheck } from "Assets/svgs/ListCheck"

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
            features {
              included
            }
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

  if (!plan) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const whatsIncluded = plan?.description?.split("\n") || plan?.features?.included

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
              <SectionHeader title="What you're pay" />
              <Spacer mb={1} />
              <Sans size="4" color={color("black50")}>
                {`$${plan.price / 100} / per ${payPeriod}`}
              </Sans>
            </>
          )}
          {!!whatsIncluded && (
            <>
              <Spacer mb={4} />
              <SectionHeader title="Membership includes" />
              <Spacer mb={2} />
              {whatsIncluded.map((text, index) => (
                <Flex flexDirection="row" key={text} pb={1.5} alignItems="center" width="100%">
                  <Box mr={1.5}>
                    <ListCheck />
                  </Box>
                  <Sans size="3" color={color("black50")}>
                    {text.trim()}
                  </Sans>
                </Flex>
              ))}
            </>
          )}
          <Spacer mb={3} />
          <SectionHeader title="Cancel membership" />
          <Spacer mb={2} />
          <PauseButtons customer={customer} />
        </Box>
      </ScrollView>
    </Container>
  )
})
