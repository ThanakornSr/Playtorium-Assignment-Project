import { CartItem } from "../types";

export function applyCoupon(
  cart: CartItem[],
  type: "fixed" | "percentage",
  value: number
): number {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (type === "fixed") return Math.max(0, total - value);
  if (type === "percentage") return Math.max(0, total * (1 - value / 100));
  return total;
}
