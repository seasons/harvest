import { useMutation } from "@apollo/client"
import { Box } from "App/Components"
import { DELETE_BAG_ITEM } from "App/Scenes/Bag/BagQueries"
import { BagEmptyState } from "App/Scenes/Bag/Components/BagEmptyState"
import gql from "graphql-tag"
import React from "react"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SavedAndHistoryView } from "../SavedAndHistory"
import { SavedItemRow, SavedItemRowFragment_BagItem } from "./SavedItemRow"

const { height } = Dimensions.get("window")

export const SavedItemsTabFragment_Me = gql`
  fragment SavedItemsTabFragment_Me on Me {
    id
    savedItems {
      id
      ...SavedItemRowFragment_BagItem
    }
  }
  ${SavedItemRowFragment_BagItem}
`

export const SavedItemsTab: React.FC<{
  items
}> = ({ items }) => {
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM)
  const insets = useSafeAreaInsets()
  const wrapperHeight = height - insets.top - 140

  return (
    <Box>
      {items?.length ? (
        items.map((bagItem, index) => {
          return <SavedItemRow key={index} bagItem={bagItem} deleteBagItem={deleteBagItem} />
        })
      ) : (
        <BagEmptyState currentView={SavedAndHistoryView.Saved} wrapperHeight={wrapperHeight} />
      )}
    </Box>
  )
}
