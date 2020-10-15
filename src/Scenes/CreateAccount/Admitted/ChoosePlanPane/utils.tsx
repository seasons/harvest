import { CouponType } from "App/generated/globalTypes"

export function calcFinalPrice(price: number, discount?: number, type?: CouponType) {
  switch (type) {
    case CouponType.FixedAmount:
      return price - discount
    case CouponType.Percentage:
      return price - (price * discount) / 100.0
    case undefined:
      return price
  }
}
