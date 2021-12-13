import { Box, Flex, Sans, Spacer } from "App/Components"
import React from "react"
import { ScrollView } from "react-native"
import { DateTime } from "luxon"
import { gql } from "@apollo/client"
import { ReservationHistoryProductItem } from "./ReservationHistoryProductItem"

export const ReservationHistoryItemFragment_Reservation = gql`
  fragment ReservationHistoryItemFragment_Reservation on Reservation {
    id
    status
    reservationNumber
    createdAt
    products {
      id
      productVariant {
        id
        displayShort
        product {
          id
          slug
          name
          images(size: Thumb) {
            id
            url
          }
          brand {
            id
            name
          }
        }
      }
    }
  }
`

export const ReservationHistoryItem = ({ item }) => {
  const date = item?.createdAt && DateTime.fromISO(item?.createdAt).toUTC().toFormat("MM/dd")

  return (
    <Box>
      <Spacer mb={2} />
      <Box px={2}>
        <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
          {item?.reservationNumber && <Sans size="4">{`Order #${item.reservationNumber}`}</Sans>}
          {item?.status && <Sans size="4">{item.status}</Sans>}
        </Flex>
        {!!date && (
          <Sans size="4" color="black50">
            {date}
          </Sans>
        )}
      </Box>
      <Spacer mb={3} />
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" pl="14px">
        {item?.products?.length > 3 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item?.products?.map((physicalProduct, index) => {
              return <ReservationHistoryProductItem key={index} physicalProduct={physicalProduct} />
            })}
          </ScrollView>
        ) : (
          <>
            {item?.products?.map((physicalProduct, index) => {
              return <ReservationHistoryProductItem key={index} physicalProduct={physicalProduct} />
            })}
          </>
        )}
      </Flex>
      <Spacer mb={2} />
    </Box>
  )
}
