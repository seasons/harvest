import { Box, Separator, Flex, Spacer } from "App/Components"
import React from "react"
import { ReservationHistoryItem, ReservationHistoryItemFragment_Reservation } from "./ReservationHistoryItem"
import { BagEmptyState } from "./BagEmptyState"
import { BagView } from "../Bag"
import { color } from "App/utils"
import { gql } from "@apollo/client"
import { Loader } from "App/Components/Loader"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const ReservationHistoryTabFragment_Customer = gql`
  fragment ReservationHistoryTabFragment_Customer on Customer {
    id
    reservations(orderBy: createdAt_DESC) {
      ...ReservationHistoryItemFragment_Reservation
    }
  }
  ${ReservationHistoryItemFragment_Reservation}
`

const { height } = Dimensions.get("window")

export const ReservationHistoryTab: React.FC<{ items; loading: boolean }> = ({ items, loading }) => {
  const insets = useSafeAreaInsets()
  const wrapperHeight = height - insets.top - 140

  if (loading) {
    return (
      <Flex height={wrapperHeight} width="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Loader />
      </Flex>
    )
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
        <BagEmptyState currentView={BagView.History} wrapperHeight={wrapperHeight} />
      )}
    </Flex>
  )
}
