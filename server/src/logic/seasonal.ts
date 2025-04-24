import { CartItem } from "../types";

export function applySeasonalDiscount(
  cart: CartItem[],
  every: number,
  discount: number
): number {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const applicableTimes = Math.floor(cart.length / every);
  return Math.max(0, total - applicableTimes * discount);
}
