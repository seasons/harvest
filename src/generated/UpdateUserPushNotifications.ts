/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PushNotificationStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserPushNotifications
// ====================================================

export interface UpdateUserPushNotifications_updateUserPushNotifications {
  __typename: "User";
  pushNotificationStatus: PushNotificationStatus | null;
}

export interface UpdateUserPushNotifications {
  updateUserPushNotifications: UpdateUserPushNotifications_updateUserPushNotifications;
}

export interface UpdateUserPushNotificationsVariables {
  pushNotificationsStatus: string;
}
