import React, { useState } from "react"
import { Sans, Spacer, Box } from "App/Components"
import gql from "graphql-tag"
import { CollapseHeader } from "./CollapseHeader"
import Collapsible from "react-native-collapsible"

export const ProductConditionSectionFragment_PhysicalProductQualityReport = gql`
  fragment ProductConditionSectionFragment_PhysicalProductQualityReport on PhysicalProductQualityReport {
    id
    score
    notes
    published
  }
`

const conditionDisplayName = (score: number): string => {
  if (score < 3) {
    return "Offloaded"
  } else {
    return "Used"
  }
}

export const ProductConditionSection = ({ physicalProductQualityReport, ...boxProps }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!physicalProductQualityReport || !physicalProductQualityReport.published || !physicalProductQualityReport.score) {
    return null
  }

  const { score, notes } = physicalProductQualityReport

  if (score >= 7) {
    return null
  }

  return (
    <Box {...boxProps}>
      <CollapseHeader title="Condition" isCollapsed={isCollapsed} handleOnPress={() => setIsCollapsed(!isCollapsed)} />
      <Collapsible collapsed={isCollapsed}>
        <Spacer mb={2} />
        <Sans size="4">{conditionDisplayName(score)}</Sans>
        <Spacer mb={2} />
        {notes && (
          <>
            <Sans size="3" color="black50">
              {notes}
            </Sans>
            <Spacer mb={2} />
          </>
        )}
      </Collapsible>
    </Box>
  )
}
