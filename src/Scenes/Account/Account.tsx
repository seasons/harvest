import { Box, Flex, Sans, Separator, Spacer, Toggle } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React from "react"
import { useQuery } from "react-apollo"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Image, Linking, ScrollView, TouchableOpacity } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"

import AsyncStorage from "@react-native-community/async-storage"

import { ProfileList } from "./ProfileList"

const GET_USER = gql`
  query GetUser {
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
  const loaderStyles = useSpring({
    opacity: loading ? 1 : 0,
  })

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
            <Box mb={5} />
            <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
              <LoaderContainer style={loaderStyles}>
                <UserProfileLoader />
              </LoaderContainer>
              <Flex>
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
              <ImageContainer source={require(`../../../assets/images/smiley.png`)} />
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

const ImageContainer = styled(Image)`
  height: 64;
  width: 64;
  border-radius: 32;
  overflow: hidden;
`

const LoaderContainer = animated(styled(Box)`
  height: 100;
  position: absolute;
`)

const UserProfileLoader = () => {
  return (
    <ContentLoader height={100} primaryColor="#f6f6f6">
      <Rect x="0" y="5" width="120" height="20" />
      <Rect x="0" y="35" width="80" height="20" />
      <Rect x="90" y="35" width="90" height="20" />
    </ContentLoader>
  )
}
