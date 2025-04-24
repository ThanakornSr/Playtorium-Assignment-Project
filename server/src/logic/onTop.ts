import { CartItem, OnTopDiscount } from "../types";

export function applyOnTopDiscount(
  cart: CartItem[],
  discount: OnTopDiscount
): number {
  const totalBefore = cart.reduce((sum, item) => sum + item.price, 0);

  if (discount.pointsDiscount) {
    const maxAllowed = totalBefore * 0.2;
    const discountFromPoints = Math.min(
      discount.pointsDiscount.points,
      maxAllowed
    );
    return Math.max(0, totalBefore - discountFromPoints);
  }

  if (discount.categoryDiscount) {
    return cart.reduce((sum, item) => {
      const isMatching = item.category === discount.categoryDiscount!.category;
      const itemDiscount = isMatching
        ? item.price * (discount.categoryDiscount!.percentage / 100)
        : 0;
      return sum + (item.price - itemDiscount);
    }, 0);
  }

  // No discount applied
  return totalBefore;
}
