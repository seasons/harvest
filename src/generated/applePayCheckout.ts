/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StripeToken } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApplePayCheckout
// ====================================================

export interface ApplePayCheckout {
  applePayCheckout: boolean | null;
}

export interface ApplePayCheckoutVariables {
  planID: string;
  token: StripeToken;
  tokenType?: string | null;
}
