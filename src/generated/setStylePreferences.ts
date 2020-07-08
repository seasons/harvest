/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setStylePreferences
// ====================================================

export interface setStylePreferences_addCustomerDetails {
  __typename: "Customer";
  id: string;
}

export interface setStylePreferences {
  addCustomerDetails: setStylePreferences_addCustomerDetails;
}

export interface setStylePreferencesVariables {
  styles?: string[] | null;
  patterns?: string[] | null;
  colors?: string[] | null;
  brands?: string[] | null;
}
