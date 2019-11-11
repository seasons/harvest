import React from "react"
import { Sans, Box, Separator, Spacer, Container, FixedBackArrow } from "App/Components"
import { ScrollView } from "react-native"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import { get } from "lodash"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { Loader } from "App/Components/Loader"

const GET_MEMBERSHIP_INFO = gql`
  query getMembershipInfo {
    me {
      activeReservation {
        customer {
          planInfo {
            whatsIncluded
            price
          }
        }
      }
    }
  }
`

export const MembershipInfo: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  const { loading, error, data } = useQuery(GET_MEMBERSHIP_INFO)

  if (loading || (data && !data.activeReservation)) {
    return <Loader />
  }

  console.log("data", data)

  if (error) {
    console.log("error MembershipInfo.tsx: ", error)
    return null
  }

  const results = get(data, "me.customer.activeRegistration.customer.planInfo")

  return (
    <Container>
      <>
        <FixedBackArrow navigation={navigation} />
        <ScrollView>
          <Box mt={6} p={2}>
            <Sans size="3" color="black">
              Membership info
            </Sans>
            <Spacer mb={2} />
            <Separator />
            <Spacer mb={6} />
            {!!results.price && (
              <>
                <Sans size="4" color="black">
                  {`$${results.price}`}
                </Sans>
                <Sans size="2" color="gray">
                  per month
                </Sans>
              </>
            )}
            {!!results.whatsIncluded && (
              <>
                <Spacer mb={6} />
                <Sans size="3">Whats included</Sans>
                <Spacer mb={2} />
                <Separator />
                {results.whatsIncluded.map(text => (
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
