import React, { useEffect, useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import { PopUp } from "App/Components/PopUp"
import { Box, Spacer, Sans, FixedBackArrow, Button } from "App/Components"
import { Dimensions, StatusBar, Share } from "react-native"
import { Loader } from "App/Components/Loader"
import { screenTrack, useTracking, Schema } from "App/utils/track"
import Contacts from "react-native-contacts"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ImageWithInfoView } from "App/Components/ImageWithInfoView"

const GET_REFERRAL_VIEW = gql`
  query GetReferralView {
    view(viewID: "Referral") {
      id
      title
      caption
      type
      properties
    }
    me {
      customer {
        id
        referralLink
      }
    }
  }
`

const windowWidth = Dimensions.get("window").width

export const ReferralView = screenTrack()((props: any) => {
  const tracking = useTracking()
  const [openPopUp, setOpenPopUp] = useState(false)
  const { navigation } = props
  const insets = useSafeAreaInsets()
  const { data } = useQuery(GET_REFERRAL_VIEW)

  const referralLink = data?.me?.customer?.referralLink
  const referralView = data?.view
  const shareMessage = referralView?.properties?.shareMessage

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("light-content")
    })
    return unsubscribe
  }, [navigation])

  if (!referralView) {
    return (
      <>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: `${shareMessage} ${referralLink}`,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const onPressViewContacts = async () => {
    setOpenPopUp(false)
    await Contacts.requestPermission()
    navigation.navigate("Modal", { screen: "InviteFromContactsModal", params: { referralLink, shareMessage } })
  }

  const onPressInviteFromContacts = async () => {
    const contactPermission = await Contacts.checkPermission()
    if (contactPermission === "authorized") {
      navigation.navigate("Modal", { screen: "InviteFromContactsModal", params: { referralLink, shareMessage } })
    } else {
      setOpenPopUp(true)
    }
  }

  const InviteContactsPopUp = () => {
    return (
      <PopUp show={openPopUp}>
        <Box pb={insets.bottom} px={2} width={windowWidth}>
          <Spacer mb={4} />
          <Sans size="5">Allow access to contacts</Sans>
          <Spacer mb={1} />
          <Sans size="4" color="black50">
            Choose which friends to invite to Seasons by allowing us to view your contacts.
          </Sans>
          <Spacer mb={4} />
          <Button block variant="primaryBlack" onPress={onPressViewContacts}>
            View Contacts
          </Button>
          <Spacer mb={1} />
          <Button block variant="secondaryWhite" onPress={() => setOpenPopUp(false)}>
            Not Now
          </Button>
          <Spacer mb={5} />
        </Box>
      </PopUp>
    )
  }

  return (
    <>
      <ImageWithInfoView
        listText={referralView?.properties?.listText}
        caption={referralView.caption}
        title={referralView.title}
        imageURL={referralView?.properties?.imageURL}
        topButtonText="Invite contacts"
        bottomButtonText="Share link"
        topButtonOnPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.InviteFromContactsTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          onPressInviteFromContacts()
        }}
        bottomButtonOnPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ShareLinkTapped,
            actionType: Schema.ActionTypes.Tap,
          })
          onShare()
        }}
      />
      <InviteContactsPopUp />
    </>
  )
})
