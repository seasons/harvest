import React, { useEffect, useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import { PopUp } from "App/Components/PopUp"
import { Container, Box, Spacer, Sans, FixedBackArrow, FadeInImage, Flex, Button } from "App/Components"
import { Dimensions, ScrollView, StatusBar, Share } from "react-native"
import { Loader } from "App/Components/Loader"
import { screenTrack, useTracking, Schema } from "App/utils/track"
import Contacts from "react-native-contacts"
import { ListCheck } from "Assets/svgs/ListCheck"
import { space } from "App/utils"
import { useSafeAreaInsets } from "react-native-safe-area-context"

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
const slideHeight = windowWidth * 0.84

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
      <Container insetsTop={false} insetsBottom={false}>
        <FixedBackArrow navigation={navigation} variant="whiteTransparent" />
        <ScrollView>
          <FadeInImage
            source={{ uri: referralView?.properties?.imageURL + "?w=850&fit=clip&fm=jpg" }}
            style={{ width: windowWidth, height: slideHeight }}
          />
          <Box px={2} pt={4} pb={140}>
            <Sans size="7">{referralView.title}</Sans>
            <Spacer mb={1} />
            <Sans size="4" color="black50">
              {referralView.caption}
            </Sans>
            <Spacer mb={4} />
            {referralView?.properties?.listText?.map((text, index) => {
              return (
                <Flex key={index} flexDirection="row" pb={2} alignItems="center">
                  <ListCheck />
                  <Spacer mr={2} />
                  <Sans size="4" color="black50" style={{ textDecorationLine: "underline" }}>
                    {text}
                  </Sans>
                </Flex>
              )
            })}
          </Box>
        </ScrollView>
        <Flex flexDirection="column" px={2} style={{ position: "absolute", bottom: space(3), left: 0 }}>
          <Button
            block
            variant="primaryBlack"
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.InviteFromContactsTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              onPressInviteFromContacts()
            }}
          >
            Invite contacts
          </Button>
          <Spacer mb={1} />
          <Button
            block
            variant="secondaryWhite"
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.ShareLinkTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              onShare()
            }}
          >
            Share link
          </Button>
        </Flex>
      </Container>
      <InviteContactsPopUp />
    </>
  )
})
