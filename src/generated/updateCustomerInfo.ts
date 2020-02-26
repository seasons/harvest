/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BillingInfoCreateInput, CustomerDetailCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCustomerInfo
// ====================================================

export interface updateCustomerInfo_updateCustomerInfo {
  __typename: "Customer";
  id: string;
}

export interface updateCustomerInfo {
  updateCustomerInfo: updateCustomerInfo_updateCustomerInfo;
}

export interface updateCustomerInfoVariables {
  billingInfo?: BillingInfoCreateInput | null;
  detail?: CustomerDetailCreateInput | null;
}
