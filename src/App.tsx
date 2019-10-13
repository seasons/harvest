import React, { useEffect } from "react"
import { StateProvider, useStateValue } from "App/helpers/StateProvider"
import { persistCache } from "./helpers/asyncStorage"
import { AppState, View } from "react-native"
import AppContainer from "App/Navigation"

export const BAG_NUM_ITEMS = 3

const handleAppStateChange = (nextAppState, bag) => {
  if (nextAppState === "inactive") {
    persistCache(bag)
  }
}

interface AppProps {
  cacheData: any
}

export const App: React.FC<AppProps> = cacheData => {
  const [{ bag }]: any = useStateValue()
  useEffect(() => {
    AppState.addEventListener("change", nextAppState => handleAppStateChange(nextAppState, bag))
    return AppState.removeEventListener("change", nextAppState => handleAppStateChange(nextAppState, bag))
  }, [])
  const initialState = {
    bag: {
      items: [],
    },
  }

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
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppContainer />
    </StateProvider>
  )
}
