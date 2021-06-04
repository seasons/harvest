/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanWhereInput, PaymentPlanTier, CustomerStatus, CouponType, ViewType } from "./globalTypes";

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

export interface GetPlans_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
  zipCode: string;
}

export interface GetPlans_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: GetPlans_me_customer_detail_shippingAddress | null;
}

export interface GetPlans_me_customer_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
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
  detail: GetPlans_me_customer_detail | null;
  user: GetPlans_me_customer_user;
  membership: GetPlans_me_customer_membership | null;
  admissions: GetPlans_me_customer_admissions | null;
  coupon: GetPlans_me_customer_coupon | null;
}

export interface GetPlans_me {
  __typename: "Me";
  id: string | null;
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

export interface GetPlans_howDidYouFindOutAboutUs {
  __typename: "View";
  id: string;
  title: string;
  caption: string | null;
  type: ViewType | null;
  properties: any | null;
}

export interface GetPlans {
  paymentPlans: (GetPlans_paymentPlans | null)[] | null;
  me: GetPlans_me | null;
  faq: GetPlans_faq | null;
  howDidYouFindOutAboutUs: GetPlans_howDidYouFindOutAboutUs | null;
}

export interface GetPlansVariables {
  where?: PaymentPlanWhereInput | null;
}
