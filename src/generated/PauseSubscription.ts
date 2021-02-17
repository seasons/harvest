/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PauseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PauseSubscription
// ====================================================

export interface PauseSubscription {
  pauseSubscription: boolean | null;
}

export interface PauseSubscriptionVariables {
  subscriptionID: string;
  pauseType?: PauseType | null;
}
