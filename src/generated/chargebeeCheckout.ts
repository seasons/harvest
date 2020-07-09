/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanID } from "./globalTypes";

// ====================================================
// GraphQL query operation: chargebeeCheckout
// ====================================================

export interface chargebeeCheckout_hostedChargebeeCheckout {
  __typename: "ChargebeeHostedPagePayload";
  id: string;
  type: string;
  url: string;
  state: string;
  embed: boolean;
  created_at: any;
  expires_at: number;
}

export interface chargebeeCheckout {
  hostedChargebeeCheckout: chargebeeCheckout_hostedChargebeeCheckout | null;
}

export interface chargebeeCheckoutVariables {
  planID: PlanID;
}
