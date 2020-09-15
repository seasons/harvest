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
  faq: GetPlans_faq | null;
}

export interface GetPlansVariables {
  where?: PaymentPlanWhereInput | null;
}
