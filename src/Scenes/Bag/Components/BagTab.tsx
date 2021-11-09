import { Flex, Separator } from "App/Components"
import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { color } from "App/utils"
import { assign, fill } from "lodash"
import { DateTime } from "luxon"
import React from "react"

import { useNavigation } from "@react-navigation/native"
import { Box, Spacer } from "@seasons/eclipse"

import { BagItem } from "./BagItem"
import { BagTabBottomCards } from "./BagTabBottomCards"
import { BagTabHeader } from "./BagTabHeader"
import { EmptyBagItem } from "./EmptyBagItem"

export const BagTab: React.FC<{
  bagItems
  data: GetBag_NoCache_Query_Type
  items
  deleteBagItem
  removeFromBagAndSaveItem
}> = ({ bagItems, data, deleteBagItem, removeFromBagAndSaveItem }) => {
  const navigation = useNavigation()

  const me = data?.me
  const activeReservation = me?.activeReservation

  const status = activeReservation?.status
  const updatedMoreThan24HoursAgo =
    activeReservation?.updatedAt && DateTime.fromISO(activeReservation?.updatedAt).diffNow("days")?.values?.days <= -1

  // atHome represents that the package is currently not in a state of transition and the user has it at home.
  // We wait 24 hours before showing its at home so the user can see the delivery status as delivered
  // With this variable we can show and hide the delivery status, for example
  const atHome = status && status === "Delivered" && !activeReservation?.returnedAt && updatedMoreThan24HoursAgo

  const itemCount = me?.customer?.membership?.plan?.itemCount || MAXIMUM_ITEM_COUNT
  const paddedItems =
    assign(fill(new Array(Math.min(bagItems.length + 1, itemCount)), { variantID: "", productID: "" }), bagItems) || []

  const showBagItems = bagItems?.length > 0

  return (
    <Flex height="100%">
      <BagTabHeader atHome={atHome} me={me} />

      {!showBagItems && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Add an item" navigation={navigation} />
        </Flex>
      )}

      <Spacer mb={2} />

      {showBagItems &&
        paddedItems?.map((bagItem, index) => {
          const isReserved = !!bagItem?.status && bagItem?.status === "Reserved"
          return bagItem?.productID?.length > 0 ? (
            <Box key={index} pt={2}>
              {index !== 0 && !isReserved && (
                <>
                  <Separator color={color("black10")} />
                  <Spacer mb={2} />
                </>
              )}
              <Box px={2}>
                <BagItem
                  deleteBagItem={deleteBagItem}
                  removeFromBagAndSaveItem={removeFromBagAndSaveItem}
                  index={index}
                  bagItem={bagItem}
                  navigation={navigation}
                />
              </Box>
            </Box>
          ) : (
            <Box key={index}>
              <Spacer mb={2} />
              <Separator />
              <EmptyBagItem text="Add another item" navigation={navigation} />
            </Box>
          )
        })}

      <Box mt={3}>
        <BagTabBottomCards reservation={activeReservation} />
        {showBagItems && <Spacer mb={90} />}
      </Box>
    </Flex>
  )
}
