/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InventoryStatus, PhysicalProductStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReturnedItems
// ====================================================

export interface ReturnedItems_me_activeReservation_returnedProducts_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ReturnedItems_me_activeReservation_returnedProducts_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ReturnedItems_me_activeReservation_returnedProducts_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  retailPrice: number | null;
  brand: ReturnedItems_me_activeReservation_returnedProducts_productVariant_product_brand;
  images: ReturnedItems_me_activeReservation_returnedProducts_productVariant_product_images[];
}

export interface ReturnedItems_me_activeReservation_returnedProducts_productVariant {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  product: ReturnedItems_me_activeReservation_returnedProducts_productVariant_product;
}

export interface ReturnedItems_me_activeReservation_returnedProducts {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  productVariant: ReturnedItems_me_activeReservation_returnedProducts_productVariant | null;
}

export interface ReturnedItems_me_activeReservation {
  __typename: "Reservation";
  id: string;
  shipped: boolean;
  createdAt: any;
  returnedProducts: ReturnedItems_me_activeReservation_returnedProducts[];
}

export interface ReturnedItems_me {
  __typename: "Me";
  id: string | null;
  activeReservation: ReturnedItems_me_activeReservation | null;
}

export interface ReturnedItems {
  me: ReturnedItems_me | null;
}
