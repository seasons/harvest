/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationBarID, NotificationBarIcon, AppRoute } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetNotificationBar
// ====================================================

export interface GetNotificationBar_me_notificationBar_web_route {
  __typename: "WebRoute";
  url: string | null;
  drawerView: string | null;
  dismissable: boolean | null;
}

export interface GetNotificationBar_me_notificationBar_web {
  __typename: "WebNotificationBar";
  title: string;
  detail: string;
  route: GetNotificationBar_me_notificationBar_web_route | null;
}

export interface GetNotificationBar_me_notificationBar_mobile_route {
  __typename: "MobileRoute";
  route: AppRoute | null;
  screen: string | null;
  params: any | null;
  dismissable: boolean | null;
}

export interface GetNotificationBar_me_notificationBar_mobile {
  __typename: "MobileNotificationBar";
  title: string;
  detail: string;
  route: GetNotificationBar_me_notificationBar_mobile_route | null;
}

export interface GetNotificationBar_me_notificationBar_palette_default {
  __typename: "NotificationBarColorPalette";
  backgroundColor: string;
  titleFontColor: string;
  detailFontColor: string;
  iconStrokeColor: string;
}

export interface GetNotificationBar_me_notificationBar_palette {
  __typename: "NotificationBarPalette";
  default: GetNotificationBar_me_notificationBar_palette_default;
}

export interface GetNotificationBar_me_notificationBar {
  __typename: "NotificationBar";
  id: NotificationBarID | null;
  icon: NotificationBarIcon | null;
  underlinedCTAText: string | null;
  viewCount: number | null;
  clickCount: number | null;
  web: GetNotificationBar_me_notificationBar_web;
  mobile: GetNotificationBar_me_notificationBar_mobile;
  palette: GetNotificationBar_me_notificationBar_palette | null;
}

export interface GetNotificationBar_me {
  __typename: "Me";
  id: string | null;
  notificationBar: GetNotificationBar_me_notificationBar | null;
}

export interface GetNotificationBar {
  me: GetNotificationBar_me | null;
}
