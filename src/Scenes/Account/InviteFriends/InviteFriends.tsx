import Clipboard from "@react-native-community/clipboard"
import { Box, Button, Container, FixedBackArrow, Flex, Sans, Separator, Spacer } from "App/Components"
import { PopUp } from "App/Components/PopUp"
import { color } from "App/utils"
import { screenTrack } from "App/utils/track"
import React, { useState } from "react"
import { Dimensions, Share, TouchableOpacity } from "react-native"
import Contacts from "react-native-contacts"
import { useSafeArea } from "react-native-safe-area-context"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const InviteFriends = screenTrack()(({ route, navigation }) => {
  const insets = useSafeArea()
  const [openPopUp, setOpenPopUp] = useState(false)
  const referralLink = route.params.referralLink

  const onShare = async () => {
    try {
      await Share.share({
        message: "Here’s my referral link for Seasons. Get $50 off your first month when you sign-up:",
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const onInviteFromContacts = async () => {
    setOpenPopUp(true)
  }

  const InviteContactsPopUp = () => {
    return (
      <PopUp show={openPopUp}>
        <Box pb={insets.bottom} px={2} style={{ width: windowWidth }}>
          <Spacer mb={4} />
          <Sans size="2">Invite friends, get a free slot</Sans>
          <Spacer mb={1} />
          <Sans size="1" color="black50">
            Choose which friends to invite to Seasons by allowing us to view your contacts.
          </Sans>
          <Spacer mb={4} />
          <Button
            block
            variant="primaryBlack"
            onPress={() => {
              setOpenPopUp(false)
              navigation.navigate("Modal", { screen: "InviteFromContactsModal" })
              Contacts.getAll().then((contacts) => {
                console.log(contacts)
                // contacts returned
              })
            }}
          >
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
      <Container insetsBottom={false}>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Box px={2}>
          <Spacer mb={156} />
          <Sans size="3">Refer & earn</Sans>
          <Spacer mb={1} />
          <Sans size="1" color="black50">
            Give $50 off of a Seasons membership and get $50 off your next month for every sign-up.
          </Sans>
          <Spacer mb={4} />
          <Box px={2} py={12} style={{ height: 48, backgroundColor: color("black04"), borderRadius: 24 }}>
            <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
              <Sans size="1" color="black50">
                {referralLink}
              </Sans>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(referralLink)
                }}
              >
                <Sans size="1" color="black100">
                  Copy Link
                </Sans>
              </TouchableOpacity>
            </Flex>
          </Box>
          <Spacer mb={3} />
        </Box>
        <Separator />
        <Box px={2} pb={insets.bottom} style={{ position: "absolute", bottom: 0 }}>
          <Button variant="primaryBlack" onPress={onInviteFromContacts} block>
            Invite from contacts
          </Button>
          <Spacer mb={1} />
          <Button variant="secondaryWhite" onPress={onShare} block>
            Share
          </Button>
          <Spacer mb={3} />
          <Flex flexDirection="row" justifyContent="center">
            <TouchableOpacity
              onPress={() => navigation.navigate("Webview", { uri: "https://www.seasons.nyc/terms-of-service" })}
            >
              <Sans size="2" color="black50">
                Terms & Conditions
              </Sans>
            </TouchableOpacity>
          </Flex>
          <Spacer mb={2} />
        </Box>
      </Container>
      <InviteContactsPopUp />
    </>
  )
})
