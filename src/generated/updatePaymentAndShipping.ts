/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updatePaymentAndShipping
// ====================================================

export interface updatePaymentAndShipping {
  updatePaymentAndShipping: boolean | null;
}

export interface updatePaymentAndShippingVariables {
  billingAddress: AddressInput;
  shippingAddress: AddressInput;
  phoneNumber: string;
}
