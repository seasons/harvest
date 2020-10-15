/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CouponType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CheckCoupon
// ====================================================

export interface CheckCoupon_checkCoupon {
  __typename: "Coupon";
  amount: number;
  type: CouponType;
}

export interface CheckCoupon {
  checkCoupon: CheckCoupon_checkCoupon | null;
}

export interface CheckCouponVariables {
  couponID: string;
}
