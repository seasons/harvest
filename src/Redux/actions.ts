export const addItemToBag = item => ({
  type: "addItemToBag",
  payload: item,
})

export const removeItemFromBag = item => ({
  type: "removeItemFromBag",
  payload: item,
})

export const toggleShowSizeSelection = showSizeSelection => ({
  type: "toggleShowSizeSelection",
  payload: showSizeSelection,
})

export const toggleReserveConfirmation = showReserveConfirmation => ({
  type: "toggleReserveConfirmation",
  payload: showReserveConfirmation,
})

export const setVariant = variant => ({
  type: "setVariant",
  payload: variant,
})

export const setProduct = product => ({
  type: "setVariant",
  payload: product,
})
