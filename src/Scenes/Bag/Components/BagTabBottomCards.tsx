import { DarkInstagram } from "Assets/svgs"
import React from "react"
import { ScrollView } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Box } from "@seasons/eclipse"

import { BagCardButton } from "./BagCardButton"

export const BagTabBottomCards = () => {
  const navigation = useNavigation()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <Box ml={2} mr={1}>
        <BagCardButton
          Icon={DarkInstagram}
          title="Share to IG Stories"
          caption="Post your new styles to Instagram"
          onPress={() =>
            navigation.navigate("Modal", {
              screen: "ShareReservationToIGModal",
            })
          }
        />
      </Box>
    </ScrollView>
  )
}
