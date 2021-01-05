import { AuthorizedCTA, RewaitlistedCTA } from "@seasons/eclipse"
import { Box, Container, Flex, GuestView, Sans, Separator, Skeleton, Spacer } from "App/Components"
import { Schema as NavigationSchema } from "App/Navigation"
import { useAuthContext } from "App/Navigation/AuthContext"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { ChevronIcon } from "Assets/icons"
import {
  DocumentWithText,
  Envelope,
  Instagram,
  LogOutSVG,
  ManageMembership,
  MapPin,
  MonocromeSeasonsLogo,
  PersonalPreferences,
  PrivacyPolicy,
  SpeechBubble,
  Star,
} from "Assets/svgs"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { default as React, useEffect } from "react"
import { useQuery } from "react-apollo"
import { Linking, Platform, ScrollView, StatusBar } from "react-native"
import * as Animatable from "react-native-animatable"
import Share from "react-native-share"
import { State, UserState } from "../CreateAccount/CreateAccount"
import { InvitedFriendsRow } from "./Components/InviteFriendsRow"
import { NotificationToggle } from "./Components/NotificationToggle"
import { AccountList, CustomerStatus, OnboardingChecklist } from "./Lists"

export const GET_USER = gql`
  query GetUser {
    me {
      customer {
        id
        status
        referralLink
        onboardingSteps
        user {
          id
          firstName
          lastName
          email
          roles
          pushNotification {
            id
            status
          }
        }
        detail {
          id
          height
          weight
          topSizes
          waistSizes
          shippingAddress {
            id
            name
            address1
            address2
            zipCode
            city
            state
          }
          stylePreferences {
            id
            styles
            patterns
            colors
            brands
          }
        }
        authorizedAt
        admissions {
          id
          authorizationWindowClosesAt
          authorizationsCount
        }
      }
    }
  }
`

export const Account = screenTrack()(({ navigation }) => {
  const { authState, signOut } = useAuthContext()
  const { data, refetch } = useQuery(GET_USER)

  const tracking = useTracking()

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

  const customer = data?.me?.customer
  const onboardingSteps = customer?.onboardingSteps
  const status = customer?.status
  const referralLink = customer?.referralLink

  const user = customer?.user
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName
  const pushNotification = user?.pushNotification
  const roles = user?.roles

  const detail = customer?.detail
  const shippingAddress = detail?.shippingAddress
  const stylePreferences = detail?.stylePreferences
  const rawMeasurements = {
    height: detail?.height,
    weight: detail?.weight,
    topSizes: detail?.topSizes,
    waistSizes: detail?.waistSizes,
  }

  const onShare = () => {
    const url = "https://www.wearseasons.com"
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: "url", content: url },
            item: {
              default: { type: "url", content: url },
            },
            linkMetadata: { originalUrl: url, url },
          },
        ],
      },
      default: {
        message: url,
      },
    })

    return Share.open(options)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  const ListSkeleton = () => {
    return (
      <Box pt="5px">
        {[...Array(4)].map((_arr, index) => (
          <Box mb={index !== 3 ? "43px" : 0} key={index}>
            <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
              <Flex flexDirection="row" alignItems="center">
                <Skeleton width={22} height={27} />
                <Spacer mr={2} />
                <Skeleton width={150} height={20} />
              </Flex>
              <ChevronIcon />
            </Flex>
          </Box>
        ))}
      </Box>
    )
  }

  const topList = [
    {
      title: "Manage Membership",
      icon: <ManageMembership />,
      onPress: () => navigation.navigate("MembershipInfo"),
      tracking: Schema.ActionNames.MembershipInfoTapped,
    },
    {
      title: "Personal Preferences",
      icon: <PersonalPreferences />,
      onPress: () => navigation.navigate("PersonalPreferences"),
      tracking: Schema.ActionNames.PersonalPreferencesTapped,
    },
    {
      title: "Payment & Shipping",
      icon: <MapPin />,
      onPress: () => navigation.navigate("PaymentAndShipping"),
      tracking: Schema.ActionNames.PaymentAndShippingTapped,
    },
    {
      title: "Frequently Asked Questions",
      icon: <SpeechBubble />,
      onPress: () => navigation.navigate("Faq"),
      tracking: Schema.ActionNames.FAQTapped,
    },
  ]

  const middleList = [
    {
      title: "Follow us on Instagram",
      icon: <Instagram opacity={0.3} />,
      onPress: () => Linking.openURL("https://www.instagram.com/seasons.ny"),
      tracking: Schema.ActionNames.FollowUsTapped,
    },
    {
      title: "Rate us in the App Store",
      icon: <Star />,
      tracking: Schema.ActionNames.RateUsTapped,
      onPress: () => Linking.openURL("https://itunes.apple.com/us/app/appName/id1483089476?mt=8&action=write-review"),
    },
    {
      title: "Share Seasons",
      icon: <MonocromeSeasonsLogo />,
      tracking: Schema.ActionNames.ShareButtonTapped,
      onPress: onShare,
    },
  ]

  const bottomList = [
    {
      title: "Help & Support",
      icon: <Envelope />,
      onPress: () => Linking.openURL(`mailto:membership@seasons.nyc?subject=Support`),
      tracking: Schema.ActionNames.SupportTapped,
    },
    {
      title: "Privacy Policy",
      icon: <PrivacyPolicy />,
      tracking: Schema.ActionNames.PrivacyPolicyTapped,
      onPress: () => {
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/privacy-policy" })
      },
    },
    {
      title: "Terms of Service",
      icon: <DocumentWithText />,
      tracking: Schema.ActionNames.TermsOfServiceTapped,
      onPress: () => {
        navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })
      },
    },
    {
      title: "Sign Out",
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

  const renderBody = () => {
    switch (status) {
      case CustomerStatus.Created:
      case CustomerStatus.Waitlisted:
        // Allow rewaitlisted users to requst access
        if (status === CustomerStatus.Waitlisted && customer?.admissions?.authorizationsCount > 0) {
          return (
            <RewaitlistedCTA
              authorizedAt={DateTime.fromISO(customer?.authorizedAt)}
              authorizationWindowClosesAt={DateTime.fromISO(customer?.admissions?.authorizationWindowClosesAt)}
            />
          )
        }

        const userState = status == CustomerStatus.Created ? UserState.Undetermined : UserState.Waitlisted
        return (
          <OnboardingChecklist
            rawMeasurements={rawMeasurements}
            navigation={navigation}
            onboardingSteps={onboardingSteps}
            shippingAddress={shippingAddress}
            stylePreferences={stylePreferences}
            userState={userState}
          />
        )
      case CustomerStatus.Authorized:
        return (
          <AuthorizedCTA
            authorizedAt={DateTime.fromISO(customer?.authorizedAt)}
            authorizationWindowClosesAt={DateTime.fromISO(customer?.admissions?.authorizationWindowClosesAt)}
            onPressLearnMore={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.LearnMoreTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              navigation.navigate("Modal", {
                screen: NavigationSchema.PageNames.CreateAccountModal,
                params: {
                  initialState: State.ChoosePlan,
                  initialUserState: UserState.Admitted,
                  onMountScrollToFaqSection: true,
                },
              })
            }}
            onPressChoosePlan={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.ChoosePlanTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              navigation.navigate("Modal", {
                screen: NavigationSchema.PageNames.CreateAccountModal,
                params: { initialState: State.ChoosePlan, initialUserState: UserState.Admitted },
              })
            }}
          />
        )
      case CustomerStatus.Invited:
      case CustomerStatus.Active:
      case CustomerStatus.Suspended:
      case CustomerStatus.Paused:
      case CustomerStatus.Deactivated:
        return <AccountList list={topList} roles={roles} />
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
          <InsetSeparator />
          <Box px={2} py={4}>
            {!!data ? renderBody() : <ListSkeleton />}
          </Box>
          <InsetSeparator />
          {!!referralLink && <InvitedFriendsRow referralLink={referralLink} />}
          <InsetSeparator />
          <NotificationToggle pushNotification={pushNotification} />
          <InsetSeparator />
          <Spacer mb={4} />
          <Box px={2}>
            <AccountList list={middleList} roles={roles} />
          </Box>
          <Spacer mb={4} />
          <InsetSeparator />
          <Spacer mb={4} />
          <Box px={2}>
            <AccountList list={bottomList} roles={roles} />
          </Box>
          <Spacer mb={2} />
        </ScrollView>
      </Animatable.View>
    </Container>
  )
})

const InsetSeparator = () => (
  <Box mx={2}>
    <Separator />
  </Box>
)
