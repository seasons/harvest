/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomerReservationConfirmation
// ====================================================

export interface GetCustomerReservationConfirmation_me_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetCustomerReservationConfirmation_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  slug: string | null;
  name: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
}

export interface GetCustomerReservationConfirmation_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: GetCustomerReservationConfirmation_me_customer_detail_shippingAddress | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_shippingOption_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  displayText: string;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_shippingOption {
  __typename: "ShippingOption";
  id: string;
  externalCost: number | null;
  shippingMethod: GetCustomerReservationConfirmation_me_customer_reservations_shippingOption_shippingMethod | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_display {
  __typename: "ProductVariantDisplay";
  short: string | null;
  long: string | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_modelSize | null;
  brand: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_brand;
  images: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_images[];
  variants: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product_variants[] | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  display: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_display | null;
  product: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant_product;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: GetCustomerReservationConfirmation_me_customer_reservations_products_productVariant | null;
}

export interface GetCustomerReservationConfirmation_me_customer_reservations {
  __typename: "Reservation";
  id: string;
  reservationNumber: number;
  shippingOption: GetCustomerReservationConfirmation_me_customer_reservations_shippingOption | null;
  products: GetCustomerReservationConfirmation_me_customer_reservations_products[];
}

export interface GetCustomerReservationConfirmation_me_customer {
  __typename: "Customer";
  id: string;
  detail: GetCustomerReservationConfirmation_me_customer_detail | null;
  reservations: GetCustomerReservationConfirmation_me_customer_reservations[] | null;
}

export interface GetCustomerReservationConfirmation_me {
  __typename: "Me";
  user: GetCustomerReservationConfirmation_me_user | null;
  customer: GetCustomerReservationConfirmation_me_customer | null;
}

export interface GetCustomerReservationConfirmation {
  me: GetCustomerReservationConfirmation_me | null;
}

export interface GetCustomerReservationConfirmationVariables {
  reservationID: string;
}
