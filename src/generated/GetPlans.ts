/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanWhereInput, PaymentPlanTier } from "./globalTypes";

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
  status: string | null;
  itemCount: number | null;
}

export interface GetPlans_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  tier: PaymentPlanTier | null;
}

export interface GetPlans_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: GetPlans_me_customer_membership_plan | null;
}

export interface GetPlans_me_customer {
  __typename: "Customer";
  id: string;
  membership: GetPlans_me_customer_membership | null;
}

export interface GetPlans_me {
  __typename: "Me";
  customer: GetPlans_me_customer | null;
}

export interface GetPlans_faq_paymentPlanFaqSections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface GetPlans_faq_paymentPlanFaqSections {
  __typename: "FaqSection";
  title: string;
  subsections: GetPlans_faq_paymentPlanFaqSections_subsections[];
}

export interface GetPlans_faq {
  __typename: "Faq";
  paymentPlanFaqSections: GetPlans_faq_paymentPlanFaqSections[];
}

export interface GetPlans {
  paymentPlans: (GetPlans_paymentPlans | null)[] | null;
  me: GetPlans_me | null;
  faq: GetPlans_faq | null;
}

export interface GetPlansVariables {
  where?: PaymentPlanWhereInput | null;
}
