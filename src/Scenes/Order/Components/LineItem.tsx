import { Flex, Sans } from "App/Components"
import React from "react"

export const LineItem = ({ leftText, rightText, color = "black50" }) => {
  return (
    <Flex
      mt={1}
      flexDirection="row"
      width="100%"
      justifyContent={!!leftText && !!rightText ? "space-between" : "flex-start"}
    >
      <Sans size="4" color={color}>
        {leftText}
      </Sans>
      <Sans size="4" color={color}>
        {rightText}
      </Sans>
    </Flex>
  )
}
