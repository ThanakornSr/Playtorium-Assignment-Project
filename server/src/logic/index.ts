import { CartItem, DiscountInput, DiscountResult } from "../types";
import { applyCoupon } from "./coupon";
import { applyOnTopDiscount } from "./onTop";
import { applySeasonalDiscount } from "./seasonal";

export function applyDiscount(
  cart: CartItem[],
  discounts: DiscountInput
): DiscountResult {
  const totalBefore = cart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  let discountedCart = [...cart];
  let totalAfter = totalBefore;

  // 1️⃣ Coupon
  if (discounts.coupon) {
    const couponTotal = applyCoupon(
      discountedCart,
      discounts.coupon.type,
      discounts.coupon.value
    );

    if (couponTotal < totalAfter) {
      totalAfter = couponTotal;
      discountedCart = adjustCartPrices(discountedCart, totalAfter);
    }
  }

  // 2️⃣ OnTop
  if (discounts.on_top) {
    const onTopTotal = applyOnTopDiscount(discountedCart, discounts.on_top);

    if (onTopTotal < totalAfter) {
      totalAfter = onTopTotal;
      discountedCart = adjustCartPrices(discountedCart, totalAfter);
    }
  }

  // 3️⃣ Seasonal
  if (discounts.seasonal) {
    const seasonalTotal = applySeasonalDiscount(
      discountedCart,
      discounts.seasonal.every,
      discounts.seasonal.discount
    );

    if (seasonalTotal < totalAfter) {
      totalAfter = seasonalTotal;
    }
  }

  return {
    totalBeforeDiscount: totalBefore,
    totalAfterDiscount: totalAfter,
  };
}

function adjustCartPrices(cart: CartItem[], newTotal: number): CartItem[] {
  const currentTotal = cart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  if (currentTotal === 0 || newTotal >= currentTotal) return cart;

  const ratio = newTotal / currentTotal;
  return cart.map((item) => ({
    ...item,
    price: item.price * ratio,
  }));
}
