/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SegmentTraits
// ====================================================

export interface SegmentTraits_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface SegmentTraits_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
}

export interface SegmentTraits_user {
  __typename: "User";
  id: string;
  createdAt: any;
}

export interface SegmentTraits_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface SegmentTraits_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: SegmentTraits_detail_shippingAddress | null;
}

export interface SegmentTraits {
  __typename: "Customer";
  bagItems: SegmentTraits_bagItems[] | null;
  admissions: SegmentTraits_admissions | null;
  user: SegmentTraits_user;
  detail: SegmentTraits_detail | null;
}
