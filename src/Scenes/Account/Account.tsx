import { Box, Flex, Sans, Separator, Spacer, Toggle } from "App/Components"
import { Container } from "Components/Container"
import { ProfileList } from "./ProfileList"
import React from "react"
import { ScrollView, TouchableOpacity, Linking } from "react-native"
import { useQuery } from "react-apollo"
import * as Animatable from "react-native-animatable"
import gql from "graphql-tag"
import AsyncStorage from "@react-native-community/async-storage"
import { useSafeArea } from "react-native-safe-area-context"
import { Loader } from "App/Components/Loader"

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

  const renderOrderUpdates = () => {
    return null
    // FIXME: When push notifiations, re-enable
    return (
      <>
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
      </>
    )
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
            {renderOrderUpdates()}
            <Separator />
            <Spacer m={2} />
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject=Help`)}>
              <Sans size="2">Support</Sans>
            </TouchableOpacity>
            <Spacer m={2} />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" })}
            >
              <Sans size="2">Privacy Policy</Sans>
            </TouchableOpacity>
            <Spacer m={2} />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })}
            >
              <Sans size="2">Terms of Service</Sans>
            </TouchableOpacity>
            <Spacer m={2} />
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.removeItem("userSession")
                props.navigation.navigate("Auth")
              }}
            >
              <Sans size="2" color="red">
                Sign out
              </Sans>
            </TouchableOpacity>
            <Spacer m={2} />
          </Box>
        </ScrollView>
      </Animatable.View>
    </Container>
  )
}
