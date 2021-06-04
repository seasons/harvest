/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InventoryStatus, PhysicalProductStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ReturnYourBagConfirmationItem
// ====================================================

export interface ReturnYourBagConfirmationItem_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ReturnYourBagConfirmationItem_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ReturnYourBagConfirmationItem_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  retailPrice: number | null;
  brand: ReturnYourBagConfirmationItem_productVariant_product_brand;
  images: ReturnYourBagConfirmationItem_productVariant_product_images[];
}

export interface ReturnYourBagConfirmationItem_productVariant {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  product: ReturnYourBagConfirmationItem_productVariant_product;
}

export interface ReturnYourBagConfirmationItem {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
  inventoryStatus: InventoryStatus;
  productStatus: PhysicalProductStatus;
  productVariant: ReturnYourBagConfirmationItem_productVariant | null;
}
