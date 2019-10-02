import React from "react"
import { Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/Utils"

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
        <Sans size="2" color="gray">
          {detailType}
        </Sans>
        <Sans size="2" color="black">
          {detailValue}
        </Sans>
      </Flex>
      <Spacer mb={2} />
      {!hideSeparator && <Separator color={color("lightGray")} />}
    </>
  )
}
