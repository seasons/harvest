/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PauseModal_Query
// ====================================================

export interface PauseModal_Query_pauseReasons {
  __typename: "PauseReason";
  id: string;
  reason: string;
}

export interface PauseModal_Query {
  pauseReasons: (PauseModal_Query_pauseReasons | null)[];
}
