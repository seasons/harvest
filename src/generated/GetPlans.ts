/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanWhereInput, PaymentPlanTier, CustomerStatus, CouponType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPlans
// ====================================================

export interface GetPlans_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  description: string | null;
  tagline: string | null;
  price: number | null;
  planID: string;
  tier: PaymentPlanTier | null;
  itemCount: number | null;
}

export interface GetPlans_me_customer_user {
  __typename: "User";
  id: string;
}

export interface GetPlans_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  description: string | null;
  tier: PaymentPlanTier | null;
  itemCount: number | null;
}

export interface GetPlans_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: GetPlans_me_customer_membership_plan | null;
}

export interface GetPlans_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  allAccessEnabled: boolean;
  authorizationsCount: number;
}

export interface GetPlans_me_customer_coupon {
  __typename: "Coupon";
  id: string;
  type: CouponType;
  amount: number | null;
  percentage: number | null;
}

export interface GetPlans_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  user: GetPlans_me_customer_user;
  membership: GetPlans_me_customer_membership | null;
  admissions: GetPlans_me_customer_admissions | null;
  coupon: GetPlans_me_customer_coupon | null;
}

export interface GetPlans_me {
  __typename: "Me";
  customer: GetPlans_me_customer | null;
}

export interface GetPlans_faq_sections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface GetPlans_faq_sections {
  __typename: "FaqSection";
  title: string;
  subsections: GetPlans_faq_sections_subsections[];
}

export interface GetPlans_faq {
  __typename: "Faq";
  sections: GetPlans_faq_sections[];
}

export interface GetPlans {
  paymentPlans: (GetPlans_paymentPlans | null)[] | null;
  me: GetPlans_me | null;
  faq: GetPlans_faq | null;
}

export interface GetPlansVariables {
  where?: PaymentPlanWhereInput | null;
}
