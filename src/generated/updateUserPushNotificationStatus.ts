/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUserPushNotificationStatus
// ====================================================

export interface updateUserPushNotificationStatus_updateUserPushNotificationStatus {
  __typename: "UserPushNotification";
  id: string;
  status: boolean;
}

export interface updateUserPushNotificationStatus {
  updateUserPushNotificationStatus: updateUserPushNotificationStatus_updateUserPushNotificationStatus;
}

export interface updateUserPushNotificationStatusVariables {
  newStatus: boolean;
}
