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
  const variantArray = variants.slice()
  return variantArray.sort((variantA, variantB) => {
    const sortWeightA =
      (variantA.size && sizes[variantA.size.toLowerCase()] && sizes[variantA.size.toLowerCase()].sortWeight) || 0
    const sortWeightB =
      (variantB.size && sizes[variantB.size.toLowerCase()] && sizes[variantB.size.toLowerCase()].sortWeight) || 0
    return sortWeightB - sortWeightA
  })
}
