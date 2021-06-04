/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ReservationHistoryTabFragment_Customer
// ====================================================

export interface ReservationHistoryTabFragment_Customer_reservations_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ReservationHistoryTabFragment_Customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ReservationHistoryTabFragment_Customer_reservations_products_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: ReservationHistoryTabFragment_Customer_reservations_products_productVariant_product_images[];
  brand: ReservationHistoryTabFragment_Customer_reservations_products_productVariant_product_brand;
}

export interface ReservationHistoryTabFragment_Customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  product: ReservationHistoryTabFragment_Customer_reservations_products_productVariant_product;
}

export interface ReservationHistoryTabFragment_Customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: ReservationHistoryTabFragment_Customer_reservations_products_productVariant | null;
}

export interface ReservationHistoryTabFragment_Customer_reservations {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
  reservationNumber: number;
  createdAt: any;
  products: ReservationHistoryTabFragment_Customer_reservations_products[];
}

export interface ReservationHistoryTabFragment_Customer {
  __typename: "Customer";
  id: string;
  reservations: ReservationHistoryTabFragment_Customer_reservations[] | null;
}
