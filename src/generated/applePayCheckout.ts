/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StripeToken } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: applePayCheckout
// ====================================================

export interface applePayCheckout {
  applePayCheckout: boolean | null;
}

export interface applePayCheckoutVariables {
  planID: string;
  token: StripeToken;
}
