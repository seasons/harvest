/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateShippingAddress
// ====================================================

export interface updateShippingAddress_addCustomerDetails {
  __typename: "Customer";
  id: string;
}

export interface updateShippingAddress {
  addCustomerDetails: updateShippingAddress_addCustomerDetails;
}

export interface updateShippingAddressVariables {
  name: string;
  city: string;
  zipCode: string;
  state: string;
  address1: string;
  address2?: string | null;
}
