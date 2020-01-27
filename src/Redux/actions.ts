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

export const toggleShowVariantPicker = showVariantSelection => ({
  type: "toggleShowVariantPicker",
  payload: showVariantSelection,
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
