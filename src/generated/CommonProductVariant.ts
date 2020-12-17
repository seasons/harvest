/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: CommonProductVariant
// ====================================================

export interface CommonProductVariant_display {
  __typename: "ProductVariantDisplay";
  short: string | null;
  long: string | null;
}

export interface CommonProductVariant_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
}

export interface CommonProductVariant_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface CommonProductVariant_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
}

export interface CommonProductVariant_internalSize {
  __typename: "Size";
  id: string;
  productType: ProductType | null;
  display: string;
  top: CommonProductVariant_internalSize_top | null;
  bottom: CommonProductVariant_internalSize_bottom | null;
}

export interface CommonProductVariant {
  __typename: "ProductVariant";
  id: string;
  display: CommonProductVariant_display | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  hasRestockNotification: boolean;
  manufacturerSizes: CommonProductVariant_manufacturerSizes[] | null;
  internalSize: CommonProductVariant_internalSize | null;
}
