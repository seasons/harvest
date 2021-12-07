import React from "react"
import { Flex, Sans } from "App/Components"
import { Schema, useTracking } from "App/utils/track"
import { useNavigation } from "@react-navigation/native"
import gql from "graphql-tag"

export const BagSectionHeaderFragment_BagSection = gql`
  fragment BagSectionHeaderFragment_BagSection on BagSection {
    title
  }
`

export const BagSectionHeader = ({ section, sectionIndex }) => {
  const navigation = useNavigation()
  const tracking = useTracking()

  const isFirstSection = sectionIndex === 0

  return (
    <Flex flexDirection="row" justifyContent={isFirstSection ? "space-between" : "flex-start"} flexWrap="nowrap">
      <Sans size="6">{section.title}</Sans>
      {isFirstSection && (
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
      )}
    </Flex>
  )
}
