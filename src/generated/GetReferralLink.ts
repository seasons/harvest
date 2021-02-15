/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReferralLink
// ====================================================

export interface GetReferralLink_me_customer {
  __typename: "Customer";
  id: string;
  referralLink: string | null;
}

export interface GetReferralLink_me {
  __typename: "Me";
  id: string;
  customer: GetReferralLink_me_customer | null;
}

export interface GetReferralLink {
  me: GetReferralLink_me | null;
}
