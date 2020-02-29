/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanID } from "./globalTypes";

// ====================================================
// GraphQL query operation: chargebeeCheckout
// ====================================================

export interface chargebeeCheckout_chargebeeCheckout {
  __typename: "ChargebeeCheckout";
  created_at: any;
  embed: boolean;
  expires_at: number;
  id: string;
  object: string;
  resource_version: any;
  state: string;
  type: string;
  updated_at: any;
  url: string;
}

export interface chargebeeCheckout {
  chargebeeCheckout: chargebeeCheckout_chargebeeCheckout | null;
}

export interface chargebeeCheckoutVariables {
  planID: PlanID;
  userIDHash: string;
}
