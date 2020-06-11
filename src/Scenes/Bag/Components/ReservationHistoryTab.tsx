import { Box, Separator, Flex } from "App/Components"
import React from "react"
import { ReservationHistoryItem } from "./ReservationHistoryItem"
import { BagEmptyState } from "./BagEmptyState"
import { BagView } from "../Bag"
import { color } from "App/utils"

export const ReservationHistoryTab: React.FC<{ items }> = ({ items }) => {
  console.log("items", items)
  return (
    <Flex style={{ flex: 1 }}>
      {items?.length ? (
        items?.map((bagItem, index) => {
          return (
            <Box key={index}>
              <ReservationHistoryItem item={bagItem} />
              {index !== items.length - 1 && <Separator color={color("black10")} />}
            </Box>
          )
        })
      ) : (
        <BagEmptyState currentView={BagView.History} />
      )}
    </Flex>
  )
}
