/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitCommunityStyle
// ====================================================

export interface submitCommunityStyle_submitStyle_user {
  __typename: "User";
  firstName: string;
  lastName: string;
}

export interface submitCommunityStyle_submitStyle_location {
  __typename: "Location";
  city: string | null;
  state: string | null;
}

export interface submitCommunityStyle_submitStyle_image {
  __typename: "Image";
  id: string;
  createdAt: any;
  url: string | null;
}

export interface submitCommunityStyle_submitStyle {
  __typename: "StyleSubmission";
  id: string;
  user: submitCommunityStyle_submitStyle_user;
  location: submitCommunityStyle_submitStyle_location | null;
  image: submitCommunityStyle_submitStyle_image;
}

export interface submitCommunityStyle {
  submitStyle: submitCommunityStyle_submitStyle[];
}

export interface submitCommunityStyleVariables {
  image: any;
}
