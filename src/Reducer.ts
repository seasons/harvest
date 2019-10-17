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
  const items = clonedState.bag.items || []
  switch (action.type) {
    case "addItemToBag":
      if (!!items.find(item => item.id === action.item.id)) {
        // Item already in bag so we dont add it
        return state
      }
      items.push(action.item)
      const [updatedBagItems, itemCount] = addEmptyItemsToBag(items)
      const bagWithNewItem = {
        ...clonedState,
        bag: { items: updatedBagItems, itemCount },
      }
      return bagWithNewItem
    case "removeItemFromBag":
      const filteredItems = items.filter(bagItem => {
        return bagItem.id !== action.item.id
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
    case "productMounted":
      const productMountedState = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          displayFooter: action.productMountedState.displayFooter,
          showSizeSelection: action.productMountedState.showSizeSelection,
        },
      }
      return productMountedState
    case "toggleShowSizeSelection":
      const toggleSizeSelection = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          showSizeSelection: action.showSizeSelection,
        },
      }
      return toggleSizeSelection
    case "toggleReserveConfirmation":
      const toggleReserveConfirmation = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          showReserveConfirmation: action.showReserveConfirmation,
        },
      }
      return toggleReserveConfirmation
    case "setSizeSelection":
      const sizeSelection = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          sizeSelection: action.sizeSelection,
        },
      }
      return sizeSelection
    default:
      return state
  }
}
