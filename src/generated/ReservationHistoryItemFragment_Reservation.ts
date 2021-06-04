/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ReservationHistoryItemFragment_Reservation
// ====================================================

export interface ReservationHistoryItemFragment_Reservation_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ReservationHistoryItemFragment_Reservation_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ReservationHistoryItemFragment_Reservation_products_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: ReservationHistoryItemFragment_Reservation_products_productVariant_product_images[];
  brand: ReservationHistoryItemFragment_Reservation_products_productVariant_product_brand;
}

export interface ReservationHistoryItemFragment_Reservation_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  product: ReservationHistoryItemFragment_Reservation_products_productVariant_product;
}

export interface ReservationHistoryItemFragment_Reservation_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: ReservationHistoryItemFragment_Reservation_products_productVariant | null;
}

export interface ReservationHistoryItemFragment_Reservation {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
  reservationNumber: number;
  createdAt: any;
  products: ReservationHistoryItemFragment_Reservation_products[];
}
