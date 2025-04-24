import { CartItem, DiscountInput, DiscountResult } from "../types";
import { applyCoupon } from "./coupon";
import { applyOnTopDiscount } from "./onTop";
import { applySeasonalDiscount } from "./seasonal";

export function applyDiscount(
  cart: CartItem[],
  discounts: DiscountInput
): DiscountResult {
  const totalBefore = cart.reduce((sum, item) => sum + item.price, 0);

  let totalAfter = totalBefore;

  if (discounts.on_top) {
    totalAfter = applyOnTopDiscount(
      cart,
      discounts.on_top.category,
      discounts.on_top.value
    );
  }

  if (discounts.seasonal) {
    totalAfter = applySeasonalDiscount(
      cart,
      discounts.seasonal.every,
      discounts.seasonal.discount
    );
  }

  if (discounts.coupon) {
    totalAfter = applyCoupon(
      cart,
      discounts.coupon.type,
      discounts.coupon.value
    );
  }

  if (discounts.points) {
    totalAfter = Math.max(0, totalAfter - discounts.points);
  }

  return {
    totalBeforeDiscount: totalBefore,
    totalAfterDiscount: Math.round(totalAfter),
  };
}
