import { Box, Flex } from "App/Components"
import { Loader } from "App/Components/Loader"
import gql from "graphql-tag"
import React from "react"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BagView } from "../Bag"
import { BagEmptyState } from "./BagEmptyState"
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
  deleteBagItem
  bagIsFull
  loading: boolean
}> = ({ items, deleteBagItem, bagIsFull, loading }) => {
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
    <Box>
      {items?.length ? (
        items.map((bagItem, index) => {
          return <SavedItemRow key={index} bagItem={bagItem} deleteBagItem={deleteBagItem} bagIsFull={bagIsFull} />
        })
      ) : (
        <BagEmptyState currentView={BagView.Saved} wrapperHeight={wrapperHeight} />
      )}
    </Box>
  )
}
