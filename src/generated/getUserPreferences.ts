/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPreferences
// ====================================================

export interface GetUserPreferences_me_customer_detail {
  __typename: "CustomerDetail";
  phoneNumber: string | null;
  birthday: any | null;
  height: number | null;
  weight: string | null;
  bodyType: string | null;
  averageSpend: string | null;
  averageTopSize: string | null;
  averageWaistSize: string | null;
  profession: string | null;
  partyFrequency: string | null;
  travelFrequency: string | null;
  shoppingFrequency: string | null;
  style: string | null;
  phoneOS: string | null;
  commuteStyle: string | null;
  preferredPronouns: string | null;
  averagePantLength: string | null;
}

export interface GetUserPreferences_me_customer {
  __typename: "Customer";
  id: string;
  detail: GetUserPreferences_me_customer_detail | null;
}

export interface GetUserPreferences_me {
  __typename: "Me";
  customer: GetUserPreferences_me_customer | null;
}

export interface GetUserPreferences {
  me: GetUserPreferences_me | null;
}
