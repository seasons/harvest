export const addItemToBag = item => ({
  type: "addItemToBag",
  payload: item,
})

export const removeItemFromBag = item => ({
  type: "removeItemFromBag",
  payload: item,
})

export const addItemToWantItems = item => ({
  type: "addItemToWantItems",
  payload: item,
})

export const removeItemFromWantItems = item => ({
  type: "removeItemFromWantItems",
  payload: item,
})

export const toggleShowSizeSelection = showSizeSelection => ({
  type: "toggleShowSizeSelection",
  payload: showSizeSelection,
})

export const togglePopUp = (showPopUp, data) => ({
  type: "togglePopUp",
  payload: {
    ...data,
    show: showPopUp,
  },
})

export const setVariant = variant => ({
  type: "setVariant",
  payload: variant,
})

export const setProduct = product => ({
  type: "setVariant",
  payload: product,
})

export const setActiveReservation = id => ({
  type: "setActiveReservation",
  payload: id,
})
