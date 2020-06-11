import React from "react"
import { Box, Flex, Sans } from "App/Components"
import { ChevronIcon } from "Assets/icons"
import { TouchableOpacity } from "react-native"
import { useTracking, Schema } from "App/utils/track"

export const ProfileList = ({ list, userRole }) => {
  const tracking = useTracking()

  const openURL = (item) => {
    if (!!item.tracking) {
      tracking.trackEvent({
        actionName: item.tracking,
        actionType: Schema.ActionTypes.Tap,
      })
    }
    item.onPress?.()
  }

  return (
    <Box>
      {list.map((item, index) => {
        if (item.title === "Debug menu" && userRole !== "Admin") {
          return null
        }
        return (
          <TouchableOpacity key={item.title} onPress={() => openURL(item)}>
            <Box style={index !== list.length - 1 ? { marginBottom: 40 } : null}>
              <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
                <Flex flexDirection="row" flexWrap="nowrap" alignItems="center">
                  <Box style={{ marginRight: 20 }}>{item.icon}</Box>
                  <Sans size="2">{item.title}</Sans>
                </Flex>
                <ChevronIcon />
              </Flex>
            </Box>
          </TouchableOpacity>
        )
      })}
    </Box>
  )
}
