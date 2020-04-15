import gql from "graphql-tag"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, ContactUsButton, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { MembershipCard } from "./Components"

const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    me {
      customer {
        plan
      }
      user {
        firstName
        lastName
      }
    }
  }
`

export const MembershipInfo = screenTrack()(({ navigation }) => {
  const insets = useSafeArea()
  const { loading, data } = useQuery(GET_MEMBERSHIP_INFO)

  const plan = data?.me?.customer?.plan
  const firstName = data?.me?.user?.firstName
  const lastName = data?.me?.user?.lastName
  let planInfo = null

  if (plan === "Essential") {
    planInfo = {
      planName: plan,
      price: "155",
      whatsIncluded: [
        "3 pieces per month",
        "Swap out 1, 2 or all 3 pieces per month",
        "Free shipping, returns & dry cleaning",
        "Insurance included",
      ],
    }
  } else if (plan === "AllAccess") {
    planInfo = {
      planName: "All Access",
      price: "195",
      whatsIncluded: [
        "3 pieces at a time",
        "Unlimited swaps. 1, 2 or all 3 pieces at a time",
        "Free shipping, returns & dry cleaning",
        "Insurance included",
      ],
    }
  }

  if (loading || !planInfo) {
    return <Loader />
  }
  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <ScrollView>
        <Box px={2} pb={insets.bottom}>
          <Spacer mb={80} />
          <Sans size="3">
            Membership info
          </Sans>
          <Spacer mb={3} />
          <MembershipCard memberName={`${firstName} ${lastName}`} planName={planInfo?.planName} />
          <Spacer mb={4} />
          {!!planInfo?.price && (
            <>
              <Sans size="1" >What you pay</Sans>
              <Spacer mb={12} />
              <Separator />
              <Spacer mb={1} />
              <Sans size="1" color={color("black50")}>
                {`$${planInfo.price}`} / per month
              </Sans>
            </>
          )}
          {!!planInfo?.whatsIncluded && (
            <>
              <Spacer mb={4} />
              <Sans size="1">Whats included</Sans>
              <Spacer mb={12} />
              <Separator />
              {planInfo.whatsIncluded.map(text => (
                <Box key={text}>
                  <Spacer mb={1} />
                  <Sans size="1" color={color("black50")}>{text}</Sans>
                </Box>
              ))}
            </>
          )}
          <Spacer mb={4} />
          <Sans size="1">Upgrade your plan</Sans>
          <Spacer mb={12} />
          <Separator />
          <Spacer mb={1} />
          <Sans size="1" color={color("black50")} >
            Interested in upgrading or downgrading your current plan? Contact us below.
          </Sans>
          <Spacer mb={4} />
          <Sans size="1">Pause or cancel</Sans>
          <Spacer mb={12} />
          <Separator />
          <Spacer mb={1} />
          <Sans size="1" color={color("black50")} >
            If you’d like to pause or cancel your Seasons membership, contact us below.
          </Sans>
          <Spacer mb={88} />
        </Box>
      </ScrollView>
      <ContactUsButton subject="Membership" />
    </Container>
  )
})
