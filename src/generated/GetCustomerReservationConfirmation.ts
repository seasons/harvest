/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCustomerReservationConfirmation
// ====================================================

export interface GetCustomerReservationConfirmation_me_user {
  __typename: "User";
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetCustomerReservationConfirmation_me_customer_detail_shippingAddress {
  __typename: "Location";
  slug: string;
  name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface GetCustomerReservationConfirmation_me_customer_detail {
  __typename: "CustomerDetail";
  phoneNumber: string | null;
  shippingAddress: GetCustomerReservationConfirmation_me_customer_detail_shippingAddress | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
  brand: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_brand;
  images: any;
  variants: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_variants[] | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations {
  __typename: "Reservation";
  id: string;
  reservationNumber: number;
  products: GetCustomerReservationConfirmation_me_customer_reservations_products[] | null;
}

export interface GetCustomerReservationConfirmation_me_customer {
  __typename: "Customer";
  id: string;
  detail: GetCustomerReservationConfirmation_me_customer_detail | null;
  reservations: GetCustomerReservationConfirmation_me_customer_reservations[] | null;
}

export interface GetCustomerReservationConfirmation_me {
  __typename: "Me";
  user: GetCustomerReservationConfirmation_me_user;
  customer: GetCustomerReservationConfirmation_me_customer;
}

export interface GetCustomerReservationConfirmation {
  me: GetCustomerReservationConfirmation_me | null;
}

export interface GetCustomerReservationConfirmationVariables {
  reservationID: string;
}
