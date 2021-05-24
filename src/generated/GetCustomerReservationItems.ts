/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomerReservationItems
// ====================================================

export interface GetCustomerReservationItems_me_customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCustomerReservationItems_me_customer_reservations_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCustomerReservationItems_me_customer_reservations_products_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  brand: GetCustomerReservationItems_me_customer_reservations_products_productVariant_product_brand;
  images: GetCustomerReservationItems_me_customer_reservations_products_productVariant_product_images[];
}

export interface GetCustomerReservationItems_me_customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetCustomerReservationItems_me_customer_reservations_products_productVariant_product;
}

export interface GetCustomerReservationItems_me_customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: GetCustomerReservationItems_me_customer_reservations_products_productVariant | null;
}

export interface GetCustomerReservationItems_me_customer_reservations {
  __typename: "Reservation";
  id: string;
  products: GetCustomerReservationItems_me_customer_reservations_products[];
}

export interface GetCustomerReservationItems_me_customer {
  __typename: "Customer";
  id: string;
  reservations: GetCustomerReservationItems_me_customer_reservations[] | null;
}

export interface GetCustomerReservationItems_me {
  __typename: "Me";
  id: string | null;
  customer: GetCustomerReservationItems_me_customer | null;
}

export interface GetCustomerReservationItems {
  me: GetCustomerReservationItems_me | null;
}

export interface GetCustomerReservationItemsVariables {
  reservationID: string;
}
