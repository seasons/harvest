import { Box, Flex, GuestView, Sans, Separator, Spacer, Skeleton } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { MembershipInfoIcon, PersonalPreferencesIcon, PaymentShippingIcon } from "Assets/icons"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useQuery } from "react-apollo"
import { ScrollView, StatusBar } from "react-native"
import * as Animatable from "react-native-animatable"
import { NotificationToggle } from "./Components/NotificationToggle"
import { ProfileList } from "./ProfileList"
import { screenTrack, Schema } from "App/utils/track"
import { Submit, QuestionMark, PrivacyPolicy, TermsOfService, LogOutSVG } from "Assets/svgs"

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
          pushNotifications
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

  const topList = [
    {
      title: "Membership info",
      icon: <MembershipInfoIcon />,
      onPress: () => navigation.navigate("MembershipInfo"),
      tracking: Schema.ActionNames.MembershipInfoTapped,
    },
    {
      title: "Personal preferences",
      icon: <PersonalPreferencesIcon />,
      onPress: () => navigation.navigate("PersonalPreferences"),
      tracking: Schema.ActionNames.PersonalPreferencesTapped,
    },
    {
      title: "Payments & shipping",
      icon: <PaymentShippingIcon />,
      onPress: () => navigation.navigate("PaymentAndShipping"),
      tracking: Schema.ActionNames.PaymentAndShippingTapped,
    },
    {
      title: "Submit an item",
      icon: <Submit />,
      onPress: () => navigation.navigate("ProductRequest"),
      tracking: Schema.ActionNames.SubmitAnItemTapped,
    },
  ]

  const bottomList = [
    {
      title: "Help and support",
      icon: <QuestionMark />,
      onPress: () => navigation.navigate("Faq"),
      tracking: Schema.ActionNames.SupportTapped,
    },
    {
      title: "Privacy policy",
      icon: <PrivacyPolicy />,
      tracking: Schema.ActionNames.PrivacyPolicyTapped,
      onPress: () => {
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" })
      },
    },
    {
      title: "Terms of Service",
      icon: <TermsOfService />,
      tracking: Schema.ActionNames.TermsOfServiceTapped,
      onPress: () => {
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })
      },
    },
    {
      title: "Sign out",
      icon: <LogOutSVG />,
      tracking: Schema.ActionNames.LogOutTapped,
      onPress: () => {
        signOut()
      },
    },
    {
      title: "Debug menu",
      icon: null,
      tracking: null,
      onPress: () => {
        navigation.navigate("Modal", {
          screen: "DebugMenu",
        })
      },
    },
  ]

  const user = data?.me?.customer?.user

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView>
          <Box pt={2}>
            <Spacer mb={6} />
            <Box px={2} style={{ height: 60 }}>
              <Flex>
                {!!user?.firstName && !!user?.lastName ? (
                  <Sans size="3" color="black">
                    {`${user?.firstName} ${user?.lastName}`}
                  </Sans>
                ) : (
                  <Box mt="3px">
                    <Skeleton width={180} height={20} />
                  </Box>
                )}
                {!!user?.email ? (
                  <Sans size="2" color="gray">
                    {user?.email}
                  </Sans>
                ) : (
                  <Box mt="13px">
                    <Skeleton width={160} height={16} />
                  </Box>
                )}
              </Flex>
            </Box>
            <Spacer mb={2} />
            <Box px={2}>
              <Separator />
            </Box>
            <Box px={2} py={4}>
              <ProfileList list={topList} userRole={user?.role} />
            </Box>
            <Box px={2}>
              <Separator />
            </Box>
            <NotificationToggle userID={user?.id} userNotificationStatus={user?.pushNotifications} />
            <Box px={2}>
              <Separator />
            </Box>
            <Box px={2} pt={4}>
              <ProfileList list={bottomList} userRole={user?.role} />
            </Box>
          </Box>
          <Spacer mb={4} />
        </ScrollView>
      </Animatable.View>
    </Container>
  )
})
