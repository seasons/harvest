import { Box, Flex, Sans, Separator } from "App/Components"
import { color } from "App/utils"
import { ChevronIcon } from "Assets/icons"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"

export const CollapseHeader: React.FC<{ handleOnPress: () => void; isCollapsed: boolean; title: string }> = ({
  handleOnPress,
  isCollapsed,
  title,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleOnPress()}>
      <Box>
        <Flex alignItems="center" flexDirection="row" justifyContent="space-between" flexWrap="nowrap" pb={2}>
          <Sans size="4">{title}</Sans>
          <ChevronIcon color={color("black100")} rotateDeg={isCollapsed ? "90deg" : "-90deg"} />
        </Flex>
        <Separator color={color("black10")} />
      </Box>
    </TouchableWithoutFeedback>
  )
}
