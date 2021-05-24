/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: DeliveryStatusFragment_Me
// ====================================================

export interface DeliveryStatusFragment_Me_activeReservation_returnedPackage_shippingLabel {
  __typename: "Label";
  id: string;
  trackingURL: string | null;
}

export interface DeliveryStatusFragment_Me_activeReservation_returnedPackage {
  __typename: "Package";
  id: string;
  shippingLabel: DeliveryStatusFragment_Me_activeReservation_returnedPackage_shippingLabel;
}

export interface DeliveryStatusFragment_Me_activeReservation_sentPackage_shippingLabel {
  __typename: "Label";
  id: string;
  trackingURL: string | null;
}

export interface DeliveryStatusFragment_Me_activeReservation_sentPackage {
  __typename: "Package";
  id: string;
  shippingLabel: DeliveryStatusFragment_Me_activeReservation_sentPackage_shippingLabel;
}

export interface DeliveryStatusFragment_Me_activeReservation {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
  returnedPackage: DeliveryStatusFragment_Me_activeReservation_returnedPackage | null;
  sentPackage: DeliveryStatusFragment_Me_activeReservation_sentPackage | null;
}

export interface DeliveryStatusFragment_Me {
  __typename: "Me";
  activeReservation: DeliveryStatusFragment_Me_activeReservation | null;
}
