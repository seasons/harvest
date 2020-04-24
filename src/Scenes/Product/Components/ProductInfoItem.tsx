import React from "react"
import { Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/utils"

interface Props {
  detailType: string
  detailValue: string
  hideSeparator?: boolean
}

export const ProductInfoItem: React.FC<Props> = ({ detailType, detailValue, hideSeparator }) => {
  return (
    <>
      <Spacer mb={2} />
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
        <Sans size="1" color="black">
          {detailType}
        </Sans>
        <Sans size="1" color="gray">
          {detailValue}
        </Sans>
      </Flex>
      <Spacer mb={2} />
      {!hideSeparator && <Separator color={color("black10")} />}
    </>
  )
}
