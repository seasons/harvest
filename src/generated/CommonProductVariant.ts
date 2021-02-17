/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LetterSize, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: CommonProductVariant
// ====================================================

export interface CommonProductVariant_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyNewPrice: number | null;
  buyNewAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
}

export interface CommonProductVariant_manufacturerSizes_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface CommonProductVariant_manufacturerSizes_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
  waist: number | null;
  rise: number | null;
  hem: number | null;
  inseam: number | null;
}

export interface CommonProductVariant_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
  top: CommonProductVariant_manufacturerSizes_top | null;
  bottom: CommonProductVariant_manufacturerSizes_bottom | null;
}

export interface CommonProductVariant {
  __typename: "ProductVariant";
  id: string;
  displayLong: string | null;
  displayShort: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  hasRestockNotification: boolean;
  price: CommonProductVariant_price;
  manufacturerSizes: CommonProductVariant_manufacturerSizes[] | null;
}
