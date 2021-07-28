/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DraftReservationLineItems
// ====================================================

export interface DraftReservationLineItems_draftReservationLineItems {
  __typename: "OrderLineItem";
  id: string;
  name: string | null;
  price: number;
  taxPrice: number | null;
}

export interface DraftReservationLineItems {
  draftReservationLineItems: DraftReservationLineItems_draftReservationLineItems[] | null;
}

export interface DraftReservationLineItemsVariables {
  hasFreeSwap?: boolean | null;
}
