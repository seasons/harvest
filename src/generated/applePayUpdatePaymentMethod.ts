/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StripeToken } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: applePayUpdatePaymentMethod
// ====================================================

export interface applePayUpdatePaymentMethod {
  applePayUpdatePaymentMethod: boolean | null;
}

export interface applePayUpdatePaymentMethodVariables {
  planID: string;
  token: StripeToken;
  tokenType?: string | null;
}
