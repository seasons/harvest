/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertRestockNotification
// ====================================================

export interface UpsertRestockNotification_upsertRestockNotification {
  __typename: "ProductVariantWant";
  id: string;
}

export interface UpsertRestockNotification {
  upsertRestockNotification: UpsertRestockNotification_upsertRestockNotification;
}

export interface UpsertRestockNotificationVariables {
  variantID: string;
  shouldNotify: boolean;
}
