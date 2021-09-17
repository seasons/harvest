import { space } from "App/utils"
import { DarkInstagram, Stylist } from "Assets/svgs"
import React from "react"
import { Dimensions, Linking, ScrollView } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Box } from "@seasons/eclipse"

import { BagCardButton } from "./BagCardButton"

const dimensions = Dimensions.get("window")
const WindowWidth = dimensions.width

export const BagTabBottomCards = ({ reservation }) => {
  const navigation = useNavigation()
  const hasActiveReservation = !!reservation

  const stylistEmail = {
    subject: encodeURIComponent("Chat with our stylist"),
    body: encodeURIComponent("Hey Seasons. I’d like to chat with a stylist and get recommendations for my next order."),
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      {hasActiveReservation && (
        <Box ml={2} mr={1}>
          <BagCardButton
            Icon={DarkInstagram}
            title="Share to IG Stories"
            caption="Post your new styles to Instagram"
            onPress={() =>
              navigation.navigate("Modal", {
                screen: "ShareReservationToIGModal",
                params: { reservationID: reservation?.id },
              })
            }
          />
        </Box>
      )}

      <Box ml={hasActiveReservation ? 0 : 2} mr={1}>
        <BagCardButton
          width={hasActiveReservation ? "auto" : WindowWidth - space(4)}
          Icon={Stylist}
          title="Chat with our stylist"
          caption="Get a personalized consultation"
          onPress={() =>
            Linking.openURL(`mailto:membership@seasons.nyc?subject=${stylistEmail.subject}&body=${stylistEmail.body}`)
          }
        />
      </Box>
    </ScrollView>
  )
}
