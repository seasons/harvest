/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanWhereInput, PaymentPlanTier, ViewType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CreateAccount_Cached_Query
// ====================================================

export interface CreateAccount_Cached_Query_paymentPlans {
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

export interface CreateAccount_Cached_Query_faq_sections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface CreateAccount_Cached_Query_faq_sections {
  __typename: "FaqSection";
  title: string;
  subsections: CreateAccount_Cached_Query_faq_sections_subsections[];
}

export interface CreateAccount_Cached_Query_faq {
  __typename: "Faq";
  sections: CreateAccount_Cached_Query_faq_sections[];
}

export interface CreateAccount_Cached_Query_howDidYouFindOutAboutUs {
  __typename: "View";
  id: string;
  title: string;
  caption: string | null;
  type: ViewType | null;
  properties: any | null;
}

export interface CreateAccount_Cached_Query {
  paymentPlans: (CreateAccount_Cached_Query_paymentPlans | null)[] | null;
  faq: CreateAccount_Cached_Query_faq | null;
  howDidYouFindOutAboutUs: CreateAccount_Cached_Query_howDidYouFindOutAboutUs | null;
}

export interface CreateAccount_Cached_QueryVariables {
  where?: PaymentPlanWhereInput | null;
}
