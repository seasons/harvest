import { Box, Container, FixedBackArrow, Sans, Separator, Spacer } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { useQuery } from "react-apollo"
import { ScrollView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { useSafeArea } from "react-native-safe-area-context"

const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    me {
      customer {
        plan
      }
    }
  }
`

export const MembershipInfo: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const { loading, error, data } = useQuery(GET_MEMBERSHIP_INFO)
  const insets = useSafeArea()

  const plan = get(data, "me.customer.plan")
  let planInfo = null

  if (plan === "Essential") {
    planInfo = {
      price: "155",
      whatsIncluded: [
        "3 pieces every month",
        "Keep for up to 30 days",
        "Free returns & dry cleaning",
        "Pause or cancel anytime",
      ],
    }
  } else if (plan === "AllAccess") {
    planInfo = {
      price: "195",
      whatsIncluded: [
        "3 pieces at a time",
        "Unlimited swaps",
        "Free returns & dry cleaning",
        "Pause or cancel anytime",
      ],
    }
  }

  if (loading || !planInfo) {
    return <Loader />
  }
  return (
    <Container>
      <>
        <FixedBackArrow navigation={navigation} />
        <ScrollView>
          <Box p={2} mt={insets.top}>
            <Spacer mb={60} />
            <Sans size="3" color="black">
              Membership info
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={6} />
            {!!planInfo.price && (
              <>
                <Sans size="4" color="black">
                  {`$${planInfo.price}`}
                </Sans>
                <Sans size="2" color="gray">
                  per month
                </Sans>
              </>
            )}
            {!!planInfo.whatsIncluded && (
              <>
                <Spacer mb={6} />
                <Sans size="3">Whats included</Sans>
                <Spacer mb={2} />
                <Separator />
                {planInfo.whatsIncluded.map(text => (
                  <Box key={text}>
                    <Spacer mb={3} />
                    <Sans size="2">{text}</Sans>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </ScrollView>
      </>
    </Container>
  )
}
