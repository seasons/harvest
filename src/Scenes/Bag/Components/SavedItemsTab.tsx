import { Box } from "App/Components"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { SavedItem } from "./SavedItem"
import { BagEmptyState } from "./BagEmptyState"
import { BagView } from "../Bag"

const SECTION_HEIGHT = 300

export const SavedItemsTab: React.FC<{ items; deleteBagItem; hasActiveReservation; bagIsFull }> = ({
  items,
  deleteBagItem,
  hasActiveReservation,
  bagIsFull,
}) => {
  const navigation = useNavigation()
  return (
    <Box>
      {items.length ? (
        items.map((bagItem, index) => {
          return (
            <Box mt={index === 0 ? 1 : 0}>
              <SavedItem
                hasActiveReservation={hasActiveReservation}
                bagIsFull={bagIsFull}
                removeItemFromBag={deleteBagItem}
                sectionHeight={SECTION_HEIGHT}
                bagItem={bagItem}
                navigation={navigation}
              />
            </Box>
          )
        })
      ) : (
        <BagEmptyState currentView={BagView.Saved} />
      )}
    </Box>
  )
}
