/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubmitOrderInput, OrderType, OrderStatus, OrderLineItemRecordType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitOrder
// ====================================================

export interface SubmitOrder_submitOrder_lineItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
  websiteUrl: string | null;
}

export interface SubmitOrder_submitOrder_lineItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface SubmitOrder_submitOrder_lineItems_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: SubmitOrder_submitOrder_lineItems_productVariant_product_brand;
  images: SubmitOrder_submitOrder_lineItems_productVariant_product_images[];
}

export interface SubmitOrder_submitOrder_lineItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayLong: string | null;
  product: SubmitOrder_submitOrder_lineItems_productVariant_product;
}

export interface SubmitOrder_submitOrder_lineItems {
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
  productVariant: SubmitOrder_submitOrder_lineItems_productVariant | null;
}

export interface SubmitOrder_submitOrder {
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
  lineItems: SubmitOrder_submitOrder_lineItems[] | null;
}

export interface SubmitOrder {
  submitOrder: SubmitOrder_submitOrder;
}

export interface SubmitOrderVariables {
  input: SubmitOrderInput;
}
