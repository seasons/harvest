/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Faq
// ====================================================

export interface Faq_faq_sections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface Faq_faq_sections {
  __typename: "FaqSection";
  title: string;
  subsections: Faq_faq_sections_subsections[];
}

export interface Faq_faq {
  __typename: "Faq";
  sections: Faq_faq_sections[];
}

export interface Faq {
  faq: Faq_faq | null;
}
