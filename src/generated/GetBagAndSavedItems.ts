/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan, CustomerStatus, ReservationStatus, ReservationPhase, BagItemStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBagAndSavedItems
// ====================================================

export interface GetBagAndSavedItems_me_customer_invoices {
  __typename: "Invoice";
  id: string;
  subscriptionId: string | null;
}

export interface GetBagAndSavedItems_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
  address1: string | null;
  zipCode: string;
}

export interface GetBagAndSavedItems_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: GetBagAndSavedItems_me_customer_detail_shippingAddress | null;
}

export interface GetBagAndSavedItems_me_customer_membership_pauseRequests {
  __typename: "PauseRequest";
  id: string;
  resumeDate: any | null;
  pauseDate: any | null;
  pausePending: boolean;
}

export interface GetBagAndSavedItems_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  pauseRequests: GetBagAndSavedItems_me_customer_membership_pauseRequests[] | null;
}

export interface GetBagAndSavedItems_me_customer_reservations_products_productVariant_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBagAndSavedItems_me_customer_reservations_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBagAndSavedItems_me_customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_customer_reservations_products_productVariant_product {
  __typename: "Product";
  id: string;
  images: GetBagAndSavedItems_me_customer_reservations_products_productVariant_product_images[];
  brand: GetBagAndSavedItems_me_customer_reservations_products_productVariant_product_brand;
}

export interface GetBagAndSavedItems_me_customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  internalSize: GetBagAndSavedItems_me_customer_reservations_products_productVariant_internalSize | null;
  product: GetBagAndSavedItems_me_customer_reservations_products_productVariant_product;
}

export interface GetBagAndSavedItems_me_customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: GetBagAndSavedItems_me_customer_reservations_products_productVariant;
}

export interface GetBagAndSavedItems_me_customer_reservations {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
  reservationNumber: number;
  createdAt: any;
  products: GetBagAndSavedItems_me_customer_reservations_products[];
}

export interface GetBagAndSavedItems_me_customer {
  __typename: "Customer";
  id: string;
  plan: Plan | null;
  status: CustomerStatus | null;
  invoices: (GetBagAndSavedItems_me_customer_invoices | null)[] | null;
  detail: GetBagAndSavedItems_me_customer_detail | null;
  membership: GetBagAndSavedItems_me_customer_membership | null;
  reservations: GetBagAndSavedItems_me_customer_reservations[] | null;
}

export interface GetBagAndSavedItems_me_activeReservation_returnedPackage_shippingLabel {
  __typename: "Label";
  trackingURL: string | null;
}

export interface GetBagAndSavedItems_me_activeReservation_returnedPackage {
  __typename: "Package";
  id: string;
  shippingLabel: GetBagAndSavedItems_me_activeReservation_returnedPackage_shippingLabel;
}

export interface GetBagAndSavedItems_me_activeReservation_sentPackage_shippingLabel {
  __typename: "Label";
  trackingURL: string | null;
}

export interface GetBagAndSavedItems_me_activeReservation_sentPackage {
  __typename: "Package";
  id: string;
  shippingLabel: GetBagAndSavedItems_me_activeReservation_sentPackage_shippingLabel;
}

export interface GetBagAndSavedItems_me_activeReservation {
  __typename: "Reservation";
  id: string;
  returnAt: any | null;
  shipped: boolean;
  createdAt: any;
  status: ReservationStatus;
  phase: ReservationPhase;
  updatedAt: any;
  returnedPackage: GetBagAndSavedItems_me_activeReservation_returnedPackage | null;
  sentPackage: GetBagAndSavedItems_me_activeReservation_sentPackage | null;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: GetBagAndSavedItems_me_bag_productVariant_product_variants_internalSize | null;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: GetBagAndSavedItems_me_bag_productVariant_product_modelSize | null;
  brand: GetBagAndSavedItems_me_bag_productVariant_product_brand;
  images: GetBagAndSavedItems_me_bag_productVariant_product_images[];
  variants: GetBagAndSavedItems_me_bag_productVariant_product_variants[] | null;
}

export interface GetBagAndSavedItems_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetBagAndSavedItems_me_bag_productVariant_product;
}

export interface GetBagAndSavedItems_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: GetBagAndSavedItems_me_bag_productVariant;
  position: number | null;
  saved: boolean | null;
  status: BagItemStatus;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: GetBagAndSavedItems_me_savedItems_productVariant_product_variants_internalSize | null;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: GetBagAndSavedItems_me_savedItems_productVariant_product_modelSize | null;
  brand: GetBagAndSavedItems_me_savedItems_productVariant_product_brand;
  images: GetBagAndSavedItems_me_savedItems_productVariant_product_images[];
  variants: GetBagAndSavedItems_me_savedItems_productVariant_product_variants[] | null;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetBagAndSavedItems_me_savedItems_productVariant_product;
}

export interface GetBagAndSavedItems_me_savedItems {
  __typename: "BagItem";
  id: string;
  productVariant: GetBagAndSavedItems_me_savedItems_productVariant;
  saved: boolean | null;
}

export interface GetBagAndSavedItems_me {
  __typename: "Me";
  customer: GetBagAndSavedItems_me_customer | null;
  activeReservation: GetBagAndSavedItems_me_activeReservation | null;
  bag: GetBagAndSavedItems_me_bag[] | null;
  savedItems: GetBagAndSavedItems_me_savedItems[] | null;
}

export interface GetBagAndSavedItems {
  me: GetBagAndSavedItems_me | null;
}
