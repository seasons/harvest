import React from "react"
import { Box, Sans } from "App/Components"
import { DateTime } from "luxon"

const getSubheaderText = (me, activeReservation, atHome) => {
  const nextSwapDate = me?.nextFreeSwapDate
  const nextSwapDateLuxon = DateTime.fromISO(nextSwapDate)
  const swapAvailable = nextSwapDate < DateTime.local().toISO()
  const hasItems = me?.bag?.length > 0

  let subHeaderText
  if (!hasItems) {
    subHeaderText = "Added items will appear below"
  } else if (atHome && swapAvailable) {
    subHeaderText = "You have a swap available"
  } else if (atHome && !!nextSwapDate) {
    subHeaderText = `You get a free swap ${nextSwapDateLuxon.weekdayLong}, ${nextSwapDateLuxon.monthLong} ${nextSwapDateLuxon.day}`
  } else if (!activeReservation) {
    subHeaderText = "Reserve your order below"
  }

  return subHeaderText
}

export const BagSubheaderText = ({ me, atHome }) => {
  const activeReservation = me?.activeReservation
  const subHeaderText = getSubheaderText(me, me?.activeReservation, atHome)
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
