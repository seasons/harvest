/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderType, OrderStatus, OrderLineItemRecordType } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderFragment
// ====================================================

export interface OrderFragment_lineItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface OrderFragment_lineItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface OrderFragment_lineItems_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: OrderFragment_lineItems_productVariant_product_brand;
  images: OrderFragment_lineItems_productVariant_product_images[];
}

export interface OrderFragment_lineItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayLong: string | null;
  product: OrderFragment_lineItems_productVariant_product;
}

export interface OrderFragment_lineItems {
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
  productVariant: OrderFragment_lineItems_productVariant | null;
}

export interface OrderFragment {
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
  lineItems: OrderFragment_lineItems[] | null;
}
