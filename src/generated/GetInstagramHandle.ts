/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInstagramHandle
// ====================================================

export interface GetInstagramHandle_me_customer_detail {
  __typename: "CustomerDetail";
  instagramHandle: string | null;
}

export interface GetInstagramHandle_me_customer {
  __typename: "Customer";
  id: string;
  detail: GetInstagramHandle_me_customer_detail | null;
}

export interface GetInstagramHandle_me {
  __typename: "Me";
  customer: GetInstagramHandle_me_customer | null;
}

export interface GetInstagramHandle {
  me: GetInstagramHandle_me | null;
}
