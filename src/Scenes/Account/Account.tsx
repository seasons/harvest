import { Box, Button, Container, Flex, GuestView, Sans, Separator, Skeleton, Spacer } from "App/Components"
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
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { default as React, useEffect } from "react"
import { Linking, Platform, ScrollView, StatusBar } from "react-native"
import * as Animatable from "react-native-animatable"
import Share from "react-native-share"

import { useQuery } from "@apollo/client"
import { useNavigation, useScrollToTop } from "@react-navigation/native"
import { useNotificationBarContext, WaitlistedCTA } from "@seasons/eclipse"
import { State, UserState } from "../CreateAccount/CreateAccount"
import { CreditBalance, CreditBalanceFragment_Customer } from "./Components/CreditBalance"
import { CreditsAvailableBar } from "./Components/CreditsAvailableBar"
import { InvitedFriendsRow } from "./Components/InviteFriendsRow"
import { NotificationToggle } from "./Components/NotificationToggle"
import { AccountList, CustomerStatus, OnboardingChecklist } from "./Lists"

export const GET_USER = gql`
  query GetUser {
    me {
      id
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
        ...CreditBalanceFragment_Customer
      }
    }
  }
  ${CreditBalanceFragment_Customer}
`

export const Account = screenTrack()(() => {
  const { authState, signOut } = useAuthContext()
  const { previousData, data = previousData, refetch, loading } = useQuery(GET_USER)
  const scrollViewRef = React.useRef(null)
  const tracking = useTracking()
  const navigation = useNavigation()

  useScrollToTop(scrollViewRef)
  const { hideNotificationBar } = useNotificationBarContext()
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
      title: "Manage membership",
      icon: <ManageMembership />,
      onPress: () => navigation.navigate("MembershipInfo"),
      tracking: Schema.ActionNames.MembershipInfoTapped,
    },
    {
      title: "Personal preferences",
      icon: <PersonalPreferences />,
      onPress: () => navigation.navigate("PersonalPreferences"),
      tracking: Schema.ActionNames.PersonalPreferencesTapped,
    },
    {
      title: "Payment & shipping",
      icon: <MapPin />,
      onPress: () => navigation.navigate("PaymentAndShipping"),
      tracking: Schema.ActionNames.PaymentAndShippingTapped,
    },
    {
      title: "Saved items & order history",
      icon: <MapPin />,
      onPress: () => navigation.navigate("SavedAndHistory"),
      tracking: Schema.ActionNames.PaymentAndShippingTapped,
    },
  ]

  const middleList = [
    {
      title: "Frequently asked questions",
      icon: <SpeechBubble />,
      onPress: () => navigation.navigate("Faq"),
      tracking: Schema.ActionNames.FAQTapped,
    },
    {
      title: "Follow us on Instagram",
      icon: <Instagram opacity={0.5} />,
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
        hideNotificationBar()
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

  console.log("status", status)
  const BodyContent: React.FC = () => {
    if (!status) {
      return <ListSkeleton />
    }
    switch (status) {
      case CustomerStatus.Created:
        return (
          <OnboardingChecklist
            rawMeasurements={rawMeasurements}
            navigation={navigation}
            onboardingSteps={onboardingSteps}
            shippingAddress={shippingAddress}
            stylePreferences={stylePreferences}
            userState={UserState.Undetermined}
          />
        )

      case CustomerStatus.Waitlisted:
        const firstWaitlist = status === CustomerStatus.Waitlisted && customer?.admissions?.authorizationsCount === 0
        return (
          <>
            <WaitlistedCTA
              authorizedAt={!!customer?.authorizedAt ? DateTime.fromISO(customer?.authorizedAt) : null}
              authorizationWindowClosesAt={DateTime.fromISO(customer?.admissions?.authorizationWindowClosesAt)}
              version={"mobile"}
            />
            {firstWaitlist && (
              <OnboardingChecklist
                rawMeasurements={rawMeasurements}
                navigation={navigation}
                onboardingSteps={onboardingSteps}
                shippingAddress={shippingAddress}
                stylePreferences={stylePreferences}
                userState={UserState.Waitlisted}
              />
            )}
          </>
        )
      case CustomerStatus.Authorized:
        return (
          <Box pb={1}>
            <Sans size="4">You're in.</Sans>
            <Spacer mb={3} />
            <Button
              block
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.ChoosePlanTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                navigation.navigate("Modal", {
                  screen: NavigationSchema.PageNames.CreateAccountModal,
                  params: { initialState: State.ChoosePlan, initialUserState: UserState.Admitted },
                })
              }}
            >
              Choose plan
            </Button>
            <Spacer mb={1} />
            <Button
              block
              variant="primaryWhite"
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.LearnMoreTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                navigation.navigate("Faq")
              }}
            >
              FAQ
            </Button>
          </Box>
        )
      case CustomerStatus.Invited:
      case CustomerStatus.Active:
      case CustomerStatus.Suspended:
      case CustomerStatus.Paused:
      case CustomerStatus.PaymentFailed:
        return <AccountList list={topList} roles={roles} />
      case CustomerStatus.Deactivated:
        return (
          <WaitlistedCTA
            authorizedAt={null}
            authorizationWindowClosesAt={null}
            version={"mobile"}
            title={"Ready to resume?"}
            detail="If you'd like to reactivate your account, please request access and we'll get back to you shortly."
          />
        )
      default:
        return <ListSkeleton />
    }
  }

  return (
    <Container insetsBottom={false}>
      <Animatable.View animation="fadeIn" duration={300}>
        <ScrollView ref={scrollViewRef}>
          <Box px={2} py={4}>
            {!!firstName && !!lastName ? (
              <Sans size="7" color="black100">
                {`${firstName} ${lastName}`}
              </Sans>
            ) : (
              <Box mt="3px">
                <Skeleton width={180} height={20} />
              </Box>
            )}
            {!!email ? (
              <Sans size="5" color="black50">
                {email}
              </Sans>
            ) : (
              <Box mt="13px">
                <Skeleton width={160} height={16} />
              </Box>
            )}
          </Box>
          <CreditBalance membership={customer?.membership} loading={loading} />
          <InsetSeparator />
          <Box px={2} py={4}>
            <BodyContent />
          </Box>
          <InsetSeparator />
          {!!referralLink && (
            <>
              <InvitedFriendsRow referralLink={referralLink} />
              <InsetSeparator />
            </>
          )}
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
          <Spacer mb="100px" />
        </ScrollView>
      </Animatable.View>
      <FadeBottom2 width="100%" style={{ position: "absolute", bottom: 0 }}>
        <CreditsAvailableBar membership={customer?.membership} />
      </FadeBottom2>
    </Container>
  )
})

const InsetSeparator = () => (
  <Box mx={2}>
    <Separator />
  </Box>
)
