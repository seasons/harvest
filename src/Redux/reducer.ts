import get from "lodash/get"

export const BAG_NUM_ITEMS = 3
export const EMPTY_BAG = {
  bag: { items: [], itemCount: 0 },
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

export const reducer = (state, action) => {
  const clonedState = Object.assign({}, state)
  const items = get(clonedState, "bag.items") || []

  switch (action.type) {
    case "addItemToBag":
      if (!!items.find(item => item.id === action.payload.id)) {
        // Item already in bag so we dont add it
        return state
      }
      items.push(action.payload)
      const [updatedBagItems, itemCount] = addEmptyItemsToBag(items)
      const bagWithNewItem = {
        ...clonedState,
        bag: { items: updatedBagItems, itemCount },
      }
      return bagWithNewItem
    case "removeItemFromBag":
      const filteredItems = items.filter(bagItem => {
        return bagItem.id !== action.payload.id
      })
      const [updatedBagItems1, itemCount1] = addEmptyItemsToBag(filteredItems)
      const bagWithoutItem = {
        ...clonedState,
        bag: {
          items: updatedBagItems1,
          itemCount: itemCount1,
        },
      }
      return bagWithoutItem
    case "toggleShowSizeSelection":
      const toggleSizeSelection = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          showSizeSelection: action.payload,
        },
      }
      return toggleSizeSelection
    case "toggleReserveConfirmation":
      const toggleReserveConfirmation = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          showReserveConfirmation: action.payload,
        },
      }
      return toggleReserveConfirmation
    case "setVariant":
      const addVariant = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          variant: action.payload,
        },
      }
      return addVariant
    case "setProduct":
      const addProduct = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          product: action.payload.product,
          variant: action.payload.initialVariant,
        },
      }
      return addProduct
    default:
      return state
  }
}
