/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chargebeeHostedPage
// ====================================================

export interface chargebeeHostedPage_chargebeeHostedPage {
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

export interface chargebeeHostedPage {
  chargebeeHostedPage: chargebeeHostedPage_chargebeeHostedPage | null;
}

export interface chargebeeHostedPageVariables {
  hostedPageID: string;
}
