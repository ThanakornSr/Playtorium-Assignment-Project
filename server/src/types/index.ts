export type Category = "Clothing" | "Accessories" | "Electronics";

export type CategoryOnTopDiscount = {
  type: "category";
  category: Category;
  value: number;
};

export type PointOnTopDiscount = {
  type: "point";
  value: number;
};

export type CartItem = {
  name: string;
  category: Category;
  price: number;
  amount: number;
};

export type CouponDiscount = { type: "fixed" | "percentage"; value: number };

export type OnTopDiscount = CategoryOnTopDiscount | PointOnTopDiscount;

export type SeasonalDiscount = { every: number; discount: number };

export type DiscountInput = {
  coupon?: CouponDiscount;
  on_top?: OnTopDiscount;
  seasonal?: SeasonalDiscount;
};

export type DiscountResult = {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
};
