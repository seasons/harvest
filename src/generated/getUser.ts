/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, UserRole } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_me_customer_user_pushNotification {
  __typename: "UserPushNotification"
  id: string
  status: boolean
}

export interface GetUser_me_customer_user {
  __typename: "User"
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  pushNotification: GetUser_me_customer_user_pushNotification | null
}

export interface GetUser_me_customer_detail_shippingAddress {
  __typename: "Location"
  name: string | null
  address1: string | null
  address2: string | null
  zipCode: string
  city: string | null
  state: string | null
}

export interface GetUser_me_customer_detail_stylePreferences {
  __typename: "StylePreferences"
  styles: string[]
  patterns: string[]
  colors: string[]
  brands: string[]
}

export interface GetUser_me_customer_detail {
  __typename: "CustomerDetail"
  height: number | null
  weight: number[]
  topSizes: string[]
  waistSizes: number[]
  shippingAddress: GetUser_me_customer_detail_shippingAddress | null
  stylePreferences: GetUser_me_customer_detail_stylePreferences | null
}

export interface GetUser_me_customer {
  __typename: "Customer"
  id: string
  status: CustomerStatus | null
  user: GetUser_me_customer_user
  detail: GetUser_me_customer_detail | null
}

export interface GetUser_me {
  __typename: "Me"
  customer: GetUser_me_customer | null
}

export interface GetUser {
  me: GetUser_me | null
}
