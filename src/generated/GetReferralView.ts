/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ViewType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetReferralView
// ====================================================

export interface GetReferralView_view {
  __typename: "View";
  id: string;
  title: string;
  caption: string | null;
  type: ViewType | null;
  properties: any | null;
}

export interface GetReferralView_me_customer {
  __typename: "Customer";
  id: string;
  referralLink: string | null;
}

export interface GetReferralView_me {
  __typename: "Me";
  customer: GetReferralView_me_customer | null;
}

export interface GetReferralView {
  view: GetReferralView_view | null;
  me: GetReferralView_me | null;
}
