/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOrRemoveFromLocalBag
// ====================================================

export interface AddOrRemoveFromLocalBag_addOrRemoveFromLocalBag {
  __typename: "LocalProduct"
  productID: string
  variantID: string
}

export interface AddOrRemoveFromLocalBag {
  addOrRemoveFromLocalBag: AddOrRemoveFromLocalBag_addOrRemoveFromLocalBag[]
}

export interface AddOrRemoveFromLocalBagVariables {
  productID: string
  variantID: string
}
