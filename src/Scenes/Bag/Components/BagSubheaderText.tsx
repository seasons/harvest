import React from "react"
import { Box, Sans } from "App/Components"

const getSubheaderText = (me, activeReservation) => {
  const hasItems = me?.bag?.length > 0

  let subHeaderText
  if (!hasItems) {
    subHeaderText = "Added items will appear below"
  } else if (!activeReservation) {
    subHeaderText = "Reserve your order below"
  }

  return subHeaderText
}

export const BagSubheaderText = ({ me, atHome }) => {
  const activeReservation = me?.activeReservation
  const subHeaderText = getSubheaderText(me, me?.activeReservation)
  const markedAsReturned = !!activeReservation?.returnedAt
  const showDeliveryStatus = !!activeReservation && !atHome
  const showSubHeaderText = !markedAsReturned && !showDeliveryStatus && !!subHeaderText

  return (
    showSubHeaderText && (
      <Box px={2}>
        <Sans size="4" color="black50">
          {subHeaderText}
        </Sans>
      </Box>
    )
  )
}
