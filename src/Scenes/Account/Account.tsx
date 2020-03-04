import { Box, Flex, Sans, Separator, Spacer, GuestView } from "App/Components"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React from "react"
import { useQuery } from "react-apollo"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Image, Linking, ScrollView, TouchableOpacity } from "react-native"
import * as Animatable from "react-native-animatable"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { ProfileList } from "./ProfileList"
import { color } from "styled-system"
import { useAuthContext } from "App/Navigation/AuthContext"
import { space } from "App/Utils"
import { NotificationToggle } from "./Components/NotificationToggle"

export const GET_USER = gql`
  query GetUser {
    me {
      customer {
        user {
          firstName
          lastName
          email
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
  const { authState, signOut } = useAuthContext()
  const { navigation } = props

  if (!authState?.userSession) {
    return <GuestView navigation={navigation} />
  }

  const { loading, error, data } = useQuery(GET_USER)
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

  const bottomList = [
    { text: "Support", onPress: () => Linking.openURL(`mailto:membership@seasons.nyc?subject=Help`) },
    {
      text: "Privacy policy",
      onPress: () => navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" }),
    },
    {
      text: "Terms of Service",
      onPress: () => navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" }),
    },
    { text: "Log out", onPress: () => signOut() },
  ]

  const email = data?.me?.customer?.user?.email

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView>
          <Box pt={2}>
            <Spacer mb={6} />

            <Flex flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="nowrap" px={2}>
              {loading && (
                <LoaderContainer style={loaderStyles}>
                  <UserProfileLoader />
                </LoaderContainer>
              )}
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
            <Box px={2} py={4}>
              <ProfileList {...props} />
            </Box>
            <NotificationToggle email={email} />
            <Separator />
            <Box px={2} pt={4}>
              {bottomList.map(listItem => {
                return (
                  <Box key={listItem.text}>
                    <TouchableOpacity onPress={listItem.onPress}>
                      <Sans size="2" color={listItem.text === "Log out" ? "red" : color("black100")}>
                        {listItem.text}
                      </Sans>
                    </TouchableOpacity>
                    <Spacer m={2} />
                  </Box>
                )
              })}
            </Box>
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
  top: 3;
  left: ${space(2)};
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
