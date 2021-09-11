import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import React from "react"

export const ReservationSectionHeader: React.FC<{
  title: string
  content?: JSX.Element
  bottomSpacing?: number
  hideSeparator?: boolean
}> = ({ title, content = null, bottomSpacing = 1, hideSeparator = false }) => {
  return (
    <>
      <Flex flexDirection="row" style={{ flex: 1 }} width="100%">
        <Sans size="4" color="black100">
          {title}
        </Sans>
        {content && <Box ml="auto">{content}</Box>}
      </Flex>
      <Spacer mb={bottomSpacing} />
      {!hideSeparator && <Separator />}
    </>
  )
}
