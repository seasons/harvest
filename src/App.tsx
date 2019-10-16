import React from "react"
import { StateProvider } from "App/helpers/StateProvider"
import { AppContainer } from "App/Navigation"

export const BAG_NUM_ITEMS = 3
export const EMPTY_BAG = {
  bag: { items: [], itemCount: 0 },
}

interface AppProps {
  cacheData: any
}

export const App: React.FC<AppProps> = ({ cacheData }) => {
  const addEmptyItemsToBag = items => {
    const filteredEmptyItems = items.filter(bagItem => {
      return bagItem.type !== "empty"
    })
    const bagItemsArray = []
    filteredEmptyItems.forEach(item => {
      bagItemsArray.push({ type: "item", ...item })
    })
    const itemCount = filteredEmptyItems.length
    for (let i = 0; i < BAG_NUM_ITEMS - filteredEmptyItems.length; i++) {
      bagItemsArray.push({ type: "empty", id: "empty" + i })
    }
    return [bagItemsArray, itemCount]
  }

  const reducer = (state, action) => {
    const items = state.bag.items || []
    const clonedItems = items.slice(0)
    switch (action.type) {
      case "addItemToBag":
        if (!!clonedItems.find(item => item.id === action.item.id)) {
          // Item already in bag so we dont add it
          return state
        }
        clonedItems.push(action.item)
        const [updatedBagItems, itemCount] = addEmptyItemsToBag(clonedItems)
        const bagWithNewItem = {
          ...state,
          bag: { items: updatedBagItems, itemCount },
        }
        return bagWithNewItem
      case "removeItemFromBag":
        const filteredItems = clonedItems.filter(bagItem => {
          return bagItem.id !== action.item.id
        })
        const [updatedBagItems1, itemCount1] = addEmptyItemsToBag(filteredItems)
        const bagWithoutItem = {
          ...state,
          bag: {
            items: updatedBagItems1,
            itemCount: itemCount1,
          },
        }
        return bagWithoutItem
      default:
        return state
    }
  }

  return (
    <StateProvider initialState={cacheData} reducer={reducer}>
      <AppContainer />
    </StateProvider>
  )
}
