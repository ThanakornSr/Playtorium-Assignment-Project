import express from "express";
import { Request, Response } from "express";
import { applyDiscount } from "../logic";
import { CartItem, DiscountInput } from "../types";

const router = express.Router();

router.post(
  "/apply-discount",
  (
    req: Request<{}, {}, { cart: CartItem[]; discounts: DiscountInput }>,
    res: Response
  ) => {
    const body = req.body;

    if (!body) {
      res.status(400).json({ error: "Missing request body" });
      return;
    }

    const { cart, discounts } = body;

    if (!Array.isArray(cart)) {
      res.status(400).json({ error: "Cart must be an array" });
      return;
    }

    if (cart.length === 0) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    for (const item of cart) {
      if (
        typeof item.name !== "string" ||
        typeof item.price !== "number" ||
        typeof item.category !== "string"
      ) {
        res.status(400).json({ error: "Invalid cart item format" });
        return;
      }
    }

    try {
      const result = applyDiscount(cart, discounts || {});
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to apply discount", details: err });
    }
  }
);

export default router;
