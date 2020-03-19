import { uniqBy } from "lodash"

const sizes = {
  xs: {
    sortWeight: 0,
  },
  s: {
    sortWeight: 1,
  },
  m: {
    sortWeight: 2,
  },
  l: {
    sortWeight: 3,
  },
  xl: {
    sortWeight: 4,
  },
  xxl: {
    sortWeight: 5,
  },
}

export const sortVariants = variants => {
  // The higher the sortWeight the sooner it will be displayed, e.g. "xxl, xl, l, m"
  const uniqueArray = uniqBy(variants, "internalSize.display")
  return uniqueArray.sort((variantA, variantB) => {
    const sortWeightA =
      (variantA.internalSize?.display &&
        sizes[variantA.internalSize?.display.toLowerCase()] &&
        sizes[variantA.internalSize?.display.toLowerCase()].sortWeight) ||
      0
    const sortWeightB =
      (variantB.internalSize?.display &&
        sizes[variantB.internalSize?.display.toLowerCase()] &&
        sizes[variantB.internalSize?.display.toLowerCase()].sortWeight) ||
      0
    return sortWeightA - sortWeightB
  })
}
