/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationBarID } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNotificationBarReceipt
// ====================================================

export interface UpdateNotificationBarReceipt_updateNotificationBarReceipt {
  __typename: "CustomerNotificationBarReceipt";
  id: string;
  viewCount: number;
  clickCount: number;
}

export interface UpdateNotificationBarReceipt {
  updateNotificationBarReceipt: UpdateNotificationBarReceipt_updateNotificationBarReceipt | null;
}

export interface UpdateNotificationBarReceiptVariables {
  notificationBarId: NotificationBarID;
  viewCount?: number | null;
  clickCount?: number | null;
}
