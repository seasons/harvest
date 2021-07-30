/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PauseReasonPupUpFragment_Query
// ====================================================

export interface PauseReasonPupUpFragment_Query_pauseReasons {
  __typename: "PauseReason";
  id: string;
  reason: string;
}

export interface PauseReasonPupUpFragment_Query {
  __typename: "Query";
  pauseReasons: (PauseReasonPupUpFragment_Query_pauseReasons | null)[] | null;
}
