import React from "react"
import { Box, Flex, Sans } from "App/Components"
import { TouchableOpacity } from "react-native"
import { useTracking, Schema } from "App/utils/track"
import { ChevronIcon } from "Assets/icons"

interface ListItem {
  title: string
  icon: JSX.Element
  tracking: string
  onPress: () => void
}

interface Props {
  list: ListItem[]
  roles: string[]
}

export const AccountList: React.FC<Props> = ({ list, roles }) => {
  const tracking = useTracking()

  const handleOnPress = (item) => {
    if (item.tracking) {
      tracking.trackEvent({
        actionName: item.tracking,
        actionType: Schema.ActionTypes.Tap,
      })
    }
    item.onPress?.()
  }

  const isAdmin = !!roles && roles.includes("Admin")

  return (
    <Box>
      {list?.map((item, index) => {
        if (item.title === "Debug menu" && !isAdmin) {
          return null
        }
        return (
          <TouchableOpacity key={item.title} onPress={() => handleOnPress(item)}>
            <Box mb={index !== list.length - 1 ? 4 : 0}>
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
