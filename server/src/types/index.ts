export type CartItem = {
  name: string;
  category: string;
  price: number;
};

export type CouponDiscount = { type: "fixed" | "percentage"; value: number };

export type OnTopDiscount = {
  categoryDiscount?: {
    category: string;
    percentage: number;
  };
  pointsDiscount?: {
    points: number;
  };
};

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
