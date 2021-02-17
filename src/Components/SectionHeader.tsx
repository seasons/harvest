import { Flex, Sans, Separator, Spacer } from "App/Components"
import React from "react"

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <Flex flexDirection="row" style={{ flex: 1 }} width="100%">
        <Sans size="4" color="black">
          {title}
        </Sans>
      </Flex>
      <Spacer mb={1} />
      <Separator />
    </>
  )
}
