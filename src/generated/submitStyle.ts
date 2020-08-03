/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitStyle
// ====================================================

export interface submitStyle_submitStyle_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface submitStyle_submitStyle {
  __typename: "StyleSubmission";
  id: string;
  image: submitStyle_submitStyle_image;
}

export interface submitStyle {
  submitStyle: submitStyle_submitStyle[];
}

export interface submitStyleVariables {
  image: any;
}
