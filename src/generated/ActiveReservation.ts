/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InventoryStatus, PhysicalProductStatus, Size } from "./globalTypes";

// ====================================================
// GraphQL query operation: ActiveReservation
// ====================================================

export interface ActiveReservation_me_activeReservation_products_productVariant_product_brand {
  __typename: "Brand";
  name: string;
}

export interface ActiveReservation_me_activeReservation_products_productVariant_product {
  __typename: "Product";
  name: string;
  retailPrice: number | null;
  brand: ActiveReservation_me_activeReservation_products_productVariant_product_brand;
  images: any;
}

export interface ActiveReservation_me_activeReservation_products_productVariant {
  __typename: "ProductVariant";
  size: Size;
  product: ActiveReservation_me_activeReservation_products_productVariant_product;
}

export interface ActiveReservation_me_activeReservation_products {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  productVariant: ActiveReservation_me_activeReservation_products_productVariant;
}

export interface ActiveReservation_me_activeReservation {
  __typename: "Reservation";
  id: string;
  shipped: boolean;
  createdAt: any;
  products: ActiveReservation_me_activeReservation_products[] | null;
}

export interface ActiveReservation_me {
  __typename: "Me";
  activeReservation: ActiveReservation_me_activeReservation | null;
}

export interface ActiveReservation {
  me: ActiveReservation_me | null;
}
