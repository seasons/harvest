import { Box, Flex, Sans, Separator, Spacer, Toggle } from "App/Components"
import { Container } from "Components/Container"
import { ProfileList } from "./ProfileList"
import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import AsyncStorage from "@react-native-community/async-storage"
import { useSafeArea } from "react-native-safe-area-context"

const GET_USER = gql`
  query getUser {
    me {
      customer {
        user {
          firstName
          lastName
        }
        detail {
          shippingAddress {
            city
            state
          }
        }
      }
    }
  }
`

export function Account(props) {
  const { loading, error, data } = useQuery(GET_USER)
  const insets = useSafeArea()

  if (loading) {
    return <Loader />
  }

  console.log("data", data)

  const {
    me: {
      customer: {
        user: { firstName, lastName },
        detail: {
          shippingAddress: { city, state },
        },
      },
    },
  } = data || {
    me: {
      customer: {
        user: { firstName: "", lastName: "" },
        detail: {
          shippingAddress: { city: "", state: "" },
        },
      },
    },
  }

  return (
    <Container>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView>
          <Box p={2} mt={insets.top}>
            <Flex>
              <Box mb={5} />
              {!!firstName && !!lastName && (
                <Sans size="3" color="black">
                  {`${firstName} ${lastName}`}
                </Sans>
              )}
              {!!city && !!state && (
                <Sans size="2" color="gray">
                  {`${city}, ${state}`}
                </Sans>
              )}
            </Flex>
            <Spacer m={2} />
            <Separator />
            <Spacer m={2} />
            <ProfileList {...props} />
            <Spacer m={2} />
            <Separator />
            <Spacer m={2} />
            <Flex flexDirection="row" justifyContent="space-between">
              <Box>
                <Sans size="2">Order updates</Sans>
                <Sans size="2" color="gray">
                  Send me push notifications
                </Sans>
              </Box>
              <Toggle />
            </Flex>
            <Spacer m={2} />
            <Separator />
            <Box py={2}>
              <Sans size="2">Support</Sans>
            </Box>
            <Toggle />
          </Flex>
          <Spacer m={2} />
          <Separator />
          <Box py={2}>
            <Sans size="2">Support</Sans>
          </Box>
          <Box py={2}>
            <Sans size="2">Privacy Policy & Terms of Service</Sans>
          </Box>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("userSession")
              props.navigation.navigate("Auth")
            }}
          >
            <Box py={2}>
              <Sans size="2" color="red">
                Sign out
              </Sans>
            </Box>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </Container>
  )
}
