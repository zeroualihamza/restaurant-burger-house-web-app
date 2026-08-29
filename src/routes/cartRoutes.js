import express from "express";
import { addToCart, getCartItems } from "../models/repositories/cartRepository.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
}

router.post("/cart/add/:productId", requireAuth, async (req, res) => {
  const productId = Number(req.params.productId);

  await addToCart(req.session.user.id, productId);

  res.redirect("/menu");
});

router.get("/cart", requireAuth, async (req, res) => {
  const cartItems = await getCartItems(req.session.user.id);

  const total = cartItems.reduce((sum, item) => {
    return sum + item.subtotal;
  }, 0);

  res.render("cart", {
    title: "Burger House - Cart",
    cartItems,
    total: total.toFixed(2),
  });
});

export default router;