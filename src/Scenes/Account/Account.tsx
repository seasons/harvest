import { Box, Container, GuestView, Sans, Separator, Skeleton, Spacer } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { screenTrack } from "App/utils/track"
import { NotificationToggle } from "./Components/NotificationToggle"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useQuery } from "react-apollo"
import { ScrollView, StatusBar } from "react-native"
import * as Animatable from "react-native-animatable"

import { BottomList, CustomerStatus, OnboardingChecklist, ProfileList } from "./Lists"
import { UserState } from "../CreateAccount/CreateAccount"

export const GET_USER = gql`
  query GetUser {
    me {
      customer {
        id
        status
        onboardingSteps
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
            name
            address1
            address2
            zipCode
            city
            state
          }
          stylePreferences {
            styles
            patterns
            colors
            brands
          }
        }
      }
    }
  }
`

export const Account = screenTrack()(({ navigation }) => {
  const { authState, signOut } = useAuthContext()
  const { error, data, refetch } = useQuery(GET_USER)

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

  const customer = data?.me?.customer
  const onboardingSteps = customer?.onboardingSteps
  const status = customer?.status
  const shippingAddress = customer?.detail?.shippingAddress
  const stylePreferences = customer?.detail?.stylePreferences
  const user = customer?.user
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName
  const pushNotificationStatus = user?.pushNotificationStatus
  const role = user?.role
  const userID = user?.id

  let body: JSX.Element
  switch (status) {
    case CustomerStatus.Invited:
      // what is this?
      break
    case CustomerStatus.Created:
      body = (
        <OnboardingChecklist
          navigation={navigation}
          onboardingSteps={onboardingSteps}
          shippingAddress={shippingAddress}
          stylePreferences={stylePreferences}
          userState={UserState.Undetermined}
        />
      )
      break
    case CustomerStatus.Waitlisted:
      body = (
        <OnboardingChecklist
          navigation={navigation}
          onboardingSteps={onboardingSteps}
          shippingAddress={shippingAddress}
          stylePreferences={stylePreferences}
          userState={UserState.Waitlisted}
        />
      )
      break
    case CustomerStatus.Authorized:
      // show special message to add payment info
      body = (
        <Sans size="2" color="black100">
          Add your payment information!
        </Sans>
      )
      break
    case CustomerStatus.Active:
    case CustomerStatus.Suspended:
    case CustomerStatus.Paused:
    case CustomerStatus.Deactivated:
      body = <ProfileList navigation={navigation} />
      break
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView>
          <Box pt={2}>
            <Spacer mb={6} />
            <Box px={2} style={{ height: 60 }}>
              {firstName && lastName ? (
                <Sans size="3" color="black">
                  {`${firstName} ${lastName}`}
                </Sans>
              ) : (
                <Box mt="3px">
                  <Skeleton width={180} height={20} />
                </Box>
              )}
              {email ? (
                <Sans size="2" color="gray">
                  {email}
                </Sans>
              ) : (
                <Box mt="13px">
                  <Skeleton width={160} height={16} />
                </Box>
              )}
            </Box>
            <Spacer mb={2} />
            <Separator />
            <Box px={2} py={4}>
              {body}
            </Box>
            <Separator />
            <NotificationToggle userID={userID} userNotificationStatus={pushNotificationStatus} />
            <Separator />
            <BottomList navigation={navigation} role={role} signOut={signOut} />
          </Box>
        </ScrollView>
      </Animatable.View>
    </Container>
  )
})
