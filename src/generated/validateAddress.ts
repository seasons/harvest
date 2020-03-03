/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ValidateAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: validateAddress
// ====================================================

export interface validateAddress_validateAddress {
  __typename: "ValidationPayload";
  code: string | null;
  isValid: boolean;
  text: string | null;
}

export interface validateAddress {
  validateAddress: validateAddress_validateAddress;
}

export interface validateAddressVariables {
  input: ValidateAddressInput;
}
