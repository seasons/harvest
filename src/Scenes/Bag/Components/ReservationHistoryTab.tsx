import { Box, Separator } from "App/Components"
import React from "react"
import { ReservationHistoryItem } from "./ReservationHistoryItem"
import { BagEmptyState } from "./BagEmptyState"
import { BagView } from "../Bag"
import { color } from "App/utils"

export const ReservationHistoryTab: React.FC<{ items }> = ({ items }) => {
  return (
    <Box>
      {items.length ? (
        items.map((bagItem, index) => {
          return (
            <Box index={index}>
              <ReservationHistoryItem item={bagItem} />
              {index !== items.length - 1 && <Separator color={color("black10")} />}
            </Box>
          )
        })
      ) : (
        <BagEmptyState currentView={BagView.History} />
      )}
    </Box>
  )
}
