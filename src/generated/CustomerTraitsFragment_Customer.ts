/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CustomerTraitsFragment_Customer
// ====================================================

export interface CustomerTraitsFragment_Customer_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface CustomerTraitsFragment_Customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
}

export interface CustomerTraitsFragment_Customer_user {
  __typename: "User";
  id: string;
  createdAt: any;
}

export interface CustomerTraitsFragment_Customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface CustomerTraitsFragment_Customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: CustomerTraitsFragment_Customer_detail_shippingAddress | null;
}

export interface CustomerTraitsFragment_Customer {
  __typename: "Customer";
  bagItems: CustomerTraitsFragment_Customer_bagItems[] | null;
  admissions: CustomerTraitsFragment_Customer_admissions | null;
  user: CustomerTraitsFragment_Customer_user;
  detail: CustomerTraitsFragment_Customer_detail | null;
}
