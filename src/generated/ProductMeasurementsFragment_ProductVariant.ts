/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SizeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ProductMeasurementsFragment_ProductVariant
// ====================================================

export interface ProductMeasurementsFragment_ProductVariant_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  waist: number | null;
  rise: number | null;
  hem: number | null;
  inseam: number | null;
}

export interface ProductMeasurementsFragment_ProductVariant_internalSize_accessory {
  __typename: "AccessorySize";
  id: string;
  bridge: number | null;
  length: number | null;
  width: number | null;
}

export interface ProductMeasurementsFragment_ProductVariant_internalSize_top {
  __typename: "TopSize";
  id: string;
  length: number | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
}

export interface ProductMeasurementsFragment_ProductVariant_internalSize {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
  bottom: ProductMeasurementsFragment_ProductVariant_internalSize_bottom | null;
  accessory: ProductMeasurementsFragment_ProductVariant_internalSize_accessory | null;
  top: ProductMeasurementsFragment_ProductVariant_internalSize_top | null;
}

export interface ProductMeasurementsFragment_ProductVariant {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  internalSize: ProductMeasurementsFragment_ProductVariant_internalSize | null;
}
