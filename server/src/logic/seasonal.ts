import { CartItem } from "../types";

export function applySeasonalDiscount(
  cart: CartItem[],
  every: number,
  discount: number
): number {
  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);
  const applicableTimes = Math.floor(total / every);
  const totalDiscount = applicableTimes * discount;

  return Math.max(0, total - totalDiscount);
}
