import { CouponType } from "App/generated/globalTypes"
import { Coupon } from "../../CreateAccount"

export function calcFinalPrice(price: number, coupon: Coupon) {
  if (coupon) {
    const { discountAmount, discountPercentage, couponType } = coupon
    switch (couponType) {
      case CouponType.FixedAmount:
        return price - discountAmount
      case CouponType.Percentage:
        return price - (price * discountPercentage) / 100.0
      default:
        return price
    }
  } else {
    return price
  }
}
