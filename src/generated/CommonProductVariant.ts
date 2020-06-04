/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LetterSize, BottomSizeType, ProductType } from "./globalTypes";

// ====================================================
// GraphQL fragment: CommonProductVariant
// ====================================================

export interface CommonProductVariant_manufacturerSizes {
  __typename: "Size";
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
  type: BottomSizeType | null;
  value: string | null;
}

export interface CommonProductVariant_internalSize {
  __typename: "Size";
  top: CommonProductVariant_internalSize_top | null;
  bottom: CommonProductVariant_internalSize_bottom | null;
  productType: ProductType | null;
  display: string;
}

export interface CommonProductVariant {
  __typename: "ProductVariant";
  id: string;
  manufacturerSizes: CommonProductVariant_manufacturerSizes[] | null;
  internalSize: CommonProductVariant_internalSize | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  isWanted: boolean;
}
