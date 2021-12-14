import { Box, Flex, Sans } from "App/Components"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { useTracking, Schema } from "App/utils/track"

export const BagTabHeader = ({ title }) => {
  const navigation = useNavigation()
  const tracking = useTracking()

  return (
    <Box px={2} pt={4} pb={3}>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" pb={1}>
        <Sans size="6">{title}</Sans>
        <Sans
          size="6"
          style={{ textDecorationLine: "underline" }}
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.FAQButtonTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            navigation.navigate("Faq")
          }}
        >
          FAQ
        </Sans>
      </Flex>
      <Sans size="4" color="black50">
        Added items will appear below
      </Sans>
    </Box>
  )
}
