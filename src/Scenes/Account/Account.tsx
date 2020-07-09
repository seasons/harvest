import { Box, Button, Container, GuestView, Sans, Separator, Skeleton, Spacer, Flex } from "App/Components"
import { useAuthContext } from "App/Navigation/AuthContext"
import { screenTrack } from "App/utils/track"
import { NotificationToggle } from "./Components/NotificationToggle"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useQuery } from "react-apollo"
import { Image, ScrollView, StatusBar } from "react-native"
import * as Animatable from "react-native-animatable"
import * as Sentry from "@sentry/react-native"
import { BottomList, CustomerStatus, OnboardingChecklist, ProfileList } from "./Lists"
import { State, UserState } from "../CreateAccount/CreateAccount"
import { Spinner } from "App/Components/Spinner"

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
          role
          pushNotification {
            id
            status
          }
        }
        detail {
          height
          weight
          topSizes
          waistSizes
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
    Sentry.captureException(error)
  }

  const customer = data?.me?.customer
  const onboardingSteps = customer?.onboardingSteps
  const status = customer?.status
  const shippingAddress = customer?.detail?.shippingAddress
  const stylePreferences = customer?.detail?.stylePreferences
  const measurements = {
    height: customer?.detail?.height,
    weight: customer?.detail?.weight,
    topSizes: customer?.detail?.topSizes,
    waistSizes: customer?.detail?.waistSizes,
  }
  const user = customer?.user
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName
  const pushNotification = user?.pushNotification
  const role = user?.role
  const userID = user?.id

  const renderBody = () => {
    switch (status) {
      case CustomerStatus.Created:
      case CustomerStatus.Waitlisted:
        const userState = status == CustomerStatus.Created ? UserState.Undetermined : UserState.Waitlisted
        return (
          <OnboardingChecklist
            measurements={measurements}
            navigation={navigation}
            onboardingSteps={onboardingSteps}
            shippingAddress={shippingAddress}
            stylePreferences={stylePreferences}
            userState={userState}
          />
        )
      case CustomerStatus.Authorized:
        return (
          <Box pb={1}>
            <Flex alignItems="center" pb={3}>
              <Image style={{ width: 136, height: 80 }} source={require("Assets/images/Sunset.png")} />
            </Flex>
            <Sans size="2" color="black100" textAlign="center">
              You're in. Let's choose your plan
            </Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50" textAlign="center">
              You have 48 hours to choose your plan. If we don’t hear from you, your invite will go to the next person
              in line.
            </Sans>
            <Spacer mb={3} />
            <Button
              block
              variant="primaryWhite"
              onPress={() =>
                navigation.navigate("Modal", {
                  screen: "CreateAccountModal",
                  params: { initialState: State.ChoosePlan, initialUserState: UserState.Admitted },
                })
              }
            >
              Choose plan
            </Button>
          </Box>
        )
      case CustomerStatus.Invited:
      case CustomerStatus.Active:
      case CustomerStatus.Suspended:
      case CustomerStatus.Paused:
      case CustomerStatus.Deactivated:
        return <ProfileList navigation={navigation} />
    }
  }

  return (
    <Container insetsBottom={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView>
          <Box px={2} py={4}>
            {!!firstName && !!lastName ? (
              <Sans size="3" color="black100">
                {`${firstName} ${lastName}`}
              </Sans>
            ) : (
              <Box mt="3px">
                <Skeleton width={180} height={20} />
              </Box>
            )}
            {!!email ? (
              <Sans size="2" color="black50">
                {email}
              </Sans>
            ) : (
              <Box mt="13px">
                <Skeleton width={160} height={16} />
              </Box>
            )}
          </Box>
          <Separator mx={2} />
          <Box px={2} py={4}>
            {data ? (
              renderBody()
            ) : (
              <Flex pt={5} width="100%" alignItems="center" flexDirection="row" justifyContent="center">
                <Spinner />
              </Flex>
            )}
          </Box>
          <Separator mx={2} />
          <NotificationToggle pushNotification={pushNotification} />
          <Separator mx={2} />
          <Spacer mb={4} />
          <BottomList navigation={navigation} role={role} signOut={signOut} />
        </ScrollView>
      </Animatable.View>
    </Container>
  )
})
