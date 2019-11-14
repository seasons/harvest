import get from "lodash/get"

export const BAG_NUM_ITEMS = 3
export const EMPTY_BAG = {
  bag: { items: [], itemCount: 0, wantItems: [], reserved: false },
}

const addEmptyItemsToBag = items => {
  const filteredEmptyItems = items.filter(item => {
    return item.productID && item.productID.length
  })
  const bagItemsArray = []
  filteredEmptyItems.forEach(item => {
    bagItemsArray.push(item)
  })
  const itemCount = bagItemsArray.length
  for (let i = 0; i < BAG_NUM_ITEMS - filteredEmptyItems.length; i++) {
    bagItemsArray.push({ productID: "", variantID: "" })
  }
  return [bagItemsArray, itemCount]
}

export const reducer = (state, action) => {
  const clonedState = Object.assign({}, state)
  const items = get(clonedState, "bag.items") || []
  const wantItems = get(clonedState, "bag.wantItems") || []

  switch (action.type) {
    case "addItemToBag":
      if (!!items.find(item => item.productID === action.payload.productID)) {
        // Item already in bag so we dont add it
        return state
      }
      const itemsInBag = items.filter(item => item.productID !== "")
      if (itemsInBag.length === 3) {
        return state
      }
      items.push(action.payload)
      const [updatedBagItems, itemCount] = addEmptyItemsToBag(items)
      const bagWithNewItem = {
        ...clonedState,
        bag: { ...clonedState.bag, items: updatedBagItems, itemCount },
      }
      return bagWithNewItem
    case "removeItemFromBag":
      const filteredItems = items.filter(item => {
        return item.productID !== action.payload.productID && item.variantID !== action.payload.variantID
      })
      const [updatedBagItems1, itemCount1] = addEmptyItemsToBag(filteredItems)
      const bagWithoutItem = {
        ...clonedState,
        bag: {
          ...clonedState.bag,
          items: updatedBagItems1,
          itemCount: itemCount1,
        },
      }
      return bagWithoutItem
    case "addItemToWantItems":
      if (!!wantItems.find(item => item.productID === action.payload.productID)) {
        // Item already in wantItems so we dont add it
        return state
      }
      wantItems.push(action.payload)
      const newWantItems = {
        ...clonedState,
        bag: { ...clonedState.bag, wantItems },
      }
      return newWantItems
    case "removeItemFromWantItems":
      const filteredWantItems = wantItems.filter(item => {
        return item.productID !== action.payload.productID
      })
      const bagWithoutWantItem = {
        ...clonedState,
        bag: {
          ...clonedState.bag,
          wantItems: filteredWantItems,
        },
      }
      return bagWithoutWantItem
    case "toggleShowSizeSelection":
      const toggleSizeSelection = {
        ...clonedState,
        productState: {
          ...clonedState.productState,
          showSizeSelection: action.payload,
        },
      }
      return toggleSizeSelection
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
    case "setActiveReservation":
      return {
        ...clonedState,
        bag: {
          ...clonedState.bag,
          reservationID: action.payload,
          reserved: true,
        },
      }
    default:
      return state
  }
}
