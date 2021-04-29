import { Box, Separator, Flex } from "App/Components"
import React from "react"
import { ReservationHistoryItem, ReservationHistoryItemFragment_Reservation } from "./ReservationHistoryItem"
import { BagEmptyState } from "./BagEmptyState"
import { BagView } from "../Bag"
import { color } from "App/utils"
import { gql } from "@apollo/client"
import { Loader } from "App/Components/Loader"

export const ReservationHistoryTabFragment_Customer = gql`
  fragment ReservationHistoryTabFragment_Customer on Customer {
    id
    reservations(orderBy: createdAt_DESC) {
      ...ReservationHistoryItemFragment_Reservation
    }
  }
  ${ReservationHistoryItemFragment_Reservation}
`

export const ReservationHistoryTab: React.FC<{ items; loading: boolean }> = ({ items, loading }) => {
  if (loading || true) {
    return <Loader />
  }

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
