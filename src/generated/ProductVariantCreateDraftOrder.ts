/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDraftedOrderInput, OrderType, OrderStatus, OrderLineItemRecordType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantCreateDraftOrder
// ====================================================

export interface ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant_product_brand;
  images: ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant_product_images[];
}

export interface ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayLong: string | null;
  product: ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant_product;
}

export interface ProductVariantCreateDraftOrder_createDraftedOrder_lineItems {
  __typename: "OrderLineItem";
  id: string;
  price: number;
  recordID: string;
  recordType: OrderLineItemRecordType;
  needShipping: boolean | null;
  taxRate: number | null;
  taxName: string | null;
  taxPercentage: number | null;
  taxPrice: number | null;
  productVariant: ProductVariantCreateDraftOrder_createDraftedOrder_lineItems_productVariant | null;
}

export interface ProductVariantCreateDraftOrder_createDraftedOrder {
  __typename: "Order";
  id: string;
  orderNumber: string;
  subTotal: number | null;
  total: number | null;
  type: OrderType;
  status: OrderStatus;
  createdAt: any;
  updatedAt: any;
  salesTaxTotal: number;
  lineItems: ProductVariantCreateDraftOrder_createDraftedOrder_lineItems[] | null;
}

export interface ProductVariantCreateDraftOrder {
  createDraftedOrder: ProductVariantCreateDraftOrder_createDraftedOrder;
}

export interface ProductVariantCreateDraftOrderVariables {
  input: CreateDraftedOrderInput;
}
