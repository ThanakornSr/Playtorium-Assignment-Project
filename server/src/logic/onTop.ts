import { CartItem, CategoryOnTopDiscount, PointOnTopDiscount } from "../types";

export function applyOnTopDiscount(
  cart: CartItem[],
  discount: CategoryOnTopDiscount | PointOnTopDiscount
): number {
  const totalBefore = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

  if (discount.type === "point") {
    const maxAllowed = totalBefore * 0.2;
    const discountFromPoints = Math.min(discount.value, maxAllowed);
    return Math.max(0, totalBefore - discountFromPoints);
  }

  if (discount.type === "category") {
    return cart.reduce((sum, item) => {
      const match = item.category === discount.category;
      const itemDiscount = match ? item.price * (discount.value / 100) : 0;
      const discountedPrice = item.price - itemDiscount;
      return sum + discountedPrice * item.amount;
    }, 0);
  }

  return totalBefore;
}
