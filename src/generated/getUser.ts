/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PushNotificationStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_me_customer_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pushNotifications: PushNotificationStatus;
  role: UserRole;
}

export interface GetUser_me_customer_detail_shippingAddress {
  __typename: "Location";
  city: string;
  state: string;
}

export interface GetUser_me_customer_detail {
  __typename: "CustomerDetail";
  shippingAddress: GetUser_me_customer_detail_shippingAddress | null;
}

export interface GetUser_me_customer {
  __typename: "Customer";
  id: string;
  user: GetUser_me_customer_user;
  detail: GetUser_me_customer_detail | null;
}

export interface GetUser_me {
  __typename: "Me";
  customer: GetUser_me_customer | null;
}

export interface GetUser {
  me: GetUser_me | null;
}
