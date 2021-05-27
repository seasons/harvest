/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReturnItems
// ====================================================

export interface ReturnItems_returnItems {
  __typename: "Reservation";
  id: string;
}

export interface ReturnItems {
  returnItems: ReturnItems_returnItems | null;
}

export interface ReturnItemsVariables {
  items: string[];
}
