/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReservationHistoryTab_Query
// ====================================================

export interface ReservationHistoryTab_Query_me_customer_reservations_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ReservationHistoryTab_Query_me_customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ReservationHistoryTab_Query_me_customer_reservations_products_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: ReservationHistoryTab_Query_me_customer_reservations_products_productVariant_product_images[];
  brand: ReservationHistoryTab_Query_me_customer_reservations_products_productVariant_product_brand;
}

export interface ReservationHistoryTab_Query_me_customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  product: ReservationHistoryTab_Query_me_customer_reservations_products_productVariant_product;
}

export interface ReservationHistoryTab_Query_me_customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: ReservationHistoryTab_Query_me_customer_reservations_products_productVariant | null;
}

export interface ReservationHistoryTab_Query_me_customer_reservations {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
  reservationNumber: number;
  createdAt: any;
  products: ReservationHistoryTab_Query_me_customer_reservations_products[];
}

export interface ReservationHistoryTab_Query_me_customer {
  __typename: "Customer";
  id: string;
  reservations: ReservationHistoryTab_Query_me_customer_reservations[] | null;
}

export interface ReservationHistoryTab_Query_me {
  __typename: "Me";
  id: string | null;
  customer: ReservationHistoryTab_Query_me_customer | null;
}

export interface ReservationHistoryTab_Query {
  me: ReservationHistoryTab_Query_me | null;
}
