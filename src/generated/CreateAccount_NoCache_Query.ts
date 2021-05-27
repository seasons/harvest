/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, PaymentPlanTier, CouponType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CreateAccount_NoCache_Query
// ====================================================

export interface CreateAccount_NoCache_Query_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
  zipCode: string;
}

export interface CreateAccount_NoCache_Query_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: CreateAccount_NoCache_Query_me_customer_detail_shippingAddress | null;
}

export interface CreateAccount_NoCache_Query_me_customer_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
}

export interface CreateAccount_NoCache_Query_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  description: string | null;
  tier: PaymentPlanTier | null;
  itemCount: number | null;
}

export interface CreateAccount_NoCache_Query_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: CreateAccount_NoCache_Query_me_customer_membership_plan | null;
}

export interface CreateAccount_NoCache_Query_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
}

export interface CreateAccount_NoCache_Query_me_customer_coupon {
  __typename: "Coupon";
  id: string;
  type: CouponType;
  amount: number | null;
  percentage: number | null;
}

export interface CreateAccount_NoCache_Query_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  detail: CreateAccount_NoCache_Query_me_customer_detail | null;
  user: CreateAccount_NoCache_Query_me_customer_user;
  membership: CreateAccount_NoCache_Query_me_customer_membership | null;
  admissions: CreateAccount_NoCache_Query_me_customer_admissions | null;
  coupon: CreateAccount_NoCache_Query_me_customer_coupon | null;
}

export interface CreateAccount_NoCache_Query_me {
  __typename: "Me";
  id: string | null;
  customer: CreateAccount_NoCache_Query_me_customer | null;
}

export interface CreateAccount_NoCache_Query {
  me: CreateAccount_NoCache_Query_me | null;
}
