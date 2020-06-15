/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PushNotificationStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateUserPushNotificationStatus
// ====================================================

export interface updateUserPushNotificationStatus_updateUserPushNotificationStatus {
  __typename: "User";
  pushNotificationStatus: PushNotificationStatus | null;
}

export interface updateUserPushNotificationStatus {
  updateUserPushNotificationStatus: updateUserPushNotificationStatus_updateUserPushNotificationStatus;
}

export interface updateUserPushNotificationStatusVariables {
  pushNotificationStatus: PushNotificationStatus;
}
