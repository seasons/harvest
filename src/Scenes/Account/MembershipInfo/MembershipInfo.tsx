import gql from "graphql-tag"
import React, { useState } from "react"
import { useQuery, useMutation } from "react-apollo"
import { ScrollView, Linking } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Container, FixedBackArrow, Sans, Separator, Spacer, Button } from "App/Components"
import { Loader } from "App/Components/Loader"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import { MembershipCard } from "./Components"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    me {
      customer {
        id
        plan
        status
        invoices {
          id
          subscriptionId
          dueDate
        }
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`

const RESUME_MEMBERRSHIP = gql`
  mutation ResumeMembership($subscriptionID: String!) {
    resumeMembership(subscriptionID: $subscriptionID)
  }
`

const PAUSE_MEMBERRSHIP = gql`
  mutation PauseMembership($subscriptionID: String!) {
    pauseMembership(subscriptionID: $subscriptionID)
  }
`

export const MembershipInfo = screenTrack()(({ navigation }) => {
  const insets = useSafeArea()
  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { loading, data } = useQuery(GET_MEMBERSHIP_INFO)

  const [pauseMembership] = useMutation(PAUSE_MEMBERRSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error pausing your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const [resumeMembership] = useMutation(RESUME_MEMBERRSHIP, {
    refetchQueries: [
      {
        query: GET_MEMBERSHIP_INFO,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error resuming your membership, please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const plan = data?.me?.customer?.plan
  const firstName = data?.me?.user?.firstName
  const lastName = data?.me?.user?.lastName
  const customerStatus = data?.me?.customer?.status
  let planInfo = null

  const membershipPaused = customerStatus && (customerStatus === "Paused" || customerStatus === "PausePending")

  if (plan === "Essential") {
    planInfo = {
      planName: plan,
      price: "155",
      whatsIncluded: [
        "3 pieces per month",
        "Swap out 1, 2 or all 3 pieces per month",
        "Free shipping, returns & dry cleaning",
        "Insurance included",
      ],
    }
  } else {
    planInfo = {
      planName: "All Access",
      price: "195",
      whatsIncluded: [
        "3 pieces at a time",
        "Unlimited swaps. 1, 2 or all 3 pieces at a time",
        "Free shipping, returns & dry cleaning",
        "Insurance included",
      ],
    }
  }

  const toggleSubscriptionStatus = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    const subscriptionId = data?.me?.customer?.invoices?.[0]?.subscriptionId || ""
    const vars = {
      variables: {
        subscriptionId,
      },
    }
    if (membershipPaused) {
      await resumeMembership(vars)
    } else {
      await pauseMembership(vars)
    }
    setIsMutating(false)
  }

  if (loading || !planInfo) {
    return <Loader />
  }

  console.log("data", data)
  return (
    <Container insetsBottom={false}>
      <FixedBackArrow navigation={navigation} variant="whiteBackground" />
      <ScrollView>
        <Box px={2} pb={insets.bottom}>
          <Spacer mb={80} />
          <Sans size="3">Membership info</Sans>
          <Spacer mb={3} />
          <MembershipCard memberName={`${firstName} ${lastName}`} planName={planInfo?.planName} />
          <Spacer mb={4} />
          {!!planInfo?.price && (
            <>
              <Sans size="1">What you pay</Sans>
              <Spacer mb={12} />
              <Separator />
              <Spacer mb={1} />
              <Sans size="1" color={color("black50")}>
                {`$${planInfo.price}`} / per month
              </Sans>
            </>
          )}
          {!!planInfo?.whatsIncluded && (
            <>
              <Spacer mb={4} />
              <Sans size="1">Whats included</Sans>
              <Spacer mb={12} />
              <Separator />
              {planInfo.whatsIncluded.map((text) => (
                <Box key={text}>
                  <Spacer mb={1} />
                  <Sans size="1" color={color("black50")}>
                    {text}
                  </Sans>
                </Box>
              ))}
            </>
          )}
          <Spacer mb={4} />
          <Sans size="1">Upgrade your plan</Sans>
          <Spacer mb={12} />
          <Separator />
          <Spacer mb={1} />
          <Sans size="1" color={color("black50")}>
            Interested in upgrading or downgrading your current plan? Contact us below.
          </Sans>
          <Spacer mb={4} />
          <Sans size="1">Pause or cancel</Sans>
          <Spacer mb={12} />
          <Separator />
          <Spacer mb={1} />
          <Button
            onPress={toggleSubscriptionStatus}
            disabled={isMutating}
            loading={isMutating}
            block
            variant={membershipPaused ? "primaryBlack" : "primaryGray"}
          >
            {membershipPaused ? "Resume membership" : "Pause membership"}
          </Button>
          <Spacer mb={1} />
          <Button
            variant="secondaryWhite"
            onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership"`)}
            block
          >
            Contact us
          </Button>
          <Spacer mb={2} />
          <Sans size="1" color={color("black50")} style={{ textAlign: "center" }}>
            If you’d like cancel your membership, contact us using the button above. We’re happy to help with this.
          </Sans>
        </Box>
      </ScrollView>
    </Container>
  )
})
