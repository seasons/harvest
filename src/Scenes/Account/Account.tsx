import { Box, Flex, GuestView, Sans, Separator, Spacer, Skeleton } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { color } from "App/utils"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useQuery } from "react-apollo"
import { Linking, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import * as Animatable from "react-native-animatable"
import { NotificationToggle } from "./Components/NotificationToggle"
import { ProfileList } from "./ProfileList"
import { screenTrack, useTracking, Schema } from "App/utils/track"

export const GET_USER = gql`
  query GetUser {
    me {
      customer {
        id
        user {
          id
          firstName
          lastName
          email
          pushNotificationStatus
          role
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

export const Account = screenTrack()((props) => {
  const { authState, signOut } = useAuthContext()
  const tracking = useTracking()
  const { error, data, refetch } = useQuery(GET_USER)

  const { navigation } = props

  useEffect(() => {
    const unsubscribe = navigation?.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content")
      refetch?.()
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  if (!authState?.userSession) {
    return <GuestView navigation={navigation} />
  }

  if (error) {
    console.log("Error Account.tsx", error)
  }

  const bottomList = [
    {
      text: "Support",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.SupportTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        Linking.openURL(`mailto:membership@seasons.nyc?subject=Help`)
      },
    },
    {
      text: "Privacy policy",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.PrivacyPolicyTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" })
      },
    },
    {
      text: "Terms of Service",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.TermsOfServiceTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })
      },
    },
    {
      text: "Log out",
      onPress: () => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.LogOutTapped,
          actionType: Schema.ActionTypes.Tap,
        })
        signOut()
      },
    },
    {
      text: "Debug menu",
      onPress: () => {
        navigation.navigate("Modal", {
          screen: "DebugMenu",
        })
      },
    },
  ]

  const user = data?.me?.customer?.user
  const pushNotificationStatus = user?.pushNotificationStatus
  const userID = user?.id
  const role = user?.role
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView>
          <Box pt={2}>
            <Spacer mb={6} />
            <Box px={2} style={{ height: 60 }}>
              <Flex>
                {!!firstName && !!lastName ? (
                  <Sans size="3" color="black">
                    {`${firstName} ${lastName}`}
                  </Sans>
                ) : (
                  <Box mt="3px">
                    <Skeleton width={180} height={20} />
                  </Box>
                )}
                {!!email ? (
                  <Sans size="2" color="gray">
                    {email}
                  </Sans>
                ) : (
                  <Box mt="13px">
                    <Skeleton width={160} height={16} />
                  </Box>
                )}
              </Flex>
            </Box>
            <Spacer mb={2} />
            <Separator />
            <Box px={2} py={4}>
              <ProfileList {...props} />
            </Box>
            <Separator />
            <NotificationToggle userID={userID} userNotificationStatus={pushNotificationStatus} />
            <Separator />
            <Box px={2} pt={4}>
              {bottomList.map((listItem) => {
                if (listItem.text === "Debug menu" && role !== "Admin") {
                  return null
                }
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
})
