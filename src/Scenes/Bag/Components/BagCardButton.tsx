import { Box, Flex, Spacer } from "App/Components"
import { color } from "App/utils"
import { Sans } from "Components/Typography"
import React, { ComponentType } from "react"
import { TouchableOpacity } from "react-native"
import { ChevronIcon } from "Assets/icons"

export const BagCardButton: React.FC<{
  Icon: ComponentType
  title: string
  caption: string
  onPress: () => void
}> = ({ Icon, title, caption, onPress }) => {
  return (
    <Box>
      <TouchableOpacity onPress={onPress}>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
          p={2}
          style={{ flex: 1 }}
        >
          <Flex flexDirection="row" justifyContent="flex-start" alignItems="center" flexWrap="nowrap">
            <Icon />
            <Spacer mr={2} />
            <Box>
              <Sans size="1" color="black100">
                {title}
              </Sans>
              <Sans size="1" color="black50">
                {caption}
              </Sans>
            </Box>
          </Flex>
          <ChevronIcon color={color("black10")} />
        </Flex>
      </TouchableOpacity>
    </Box>
  )
}
