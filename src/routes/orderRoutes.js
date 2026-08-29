import express from "express";
import { clearCart, getCartItems } from "../models/repositories/cartRepository.js";
import { createOrderFromCart, getOrdersByUser } from "../models/repositories/orderRepository.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
}

router.post("/orders", requireAuth, async (req, res) => {
  const cartItems = await getCartItems(req.session.user.id);

  if (cartItems.length === 0) {
    return res.redirect("/cart");
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.subtotal;
  }, 0);

  await createOrderFromCart(req.session.user.id, cartItems, total.toFixed(2));
  await clearCart(req.session.user.id);

  res.redirect("/orders");
});

router.get("/orders", requireAuth, async (req, res) => {
  const orders = await getOrdersByUser(req.session.user.id);

  res.render("orders", {
    title: "Burger House - Orders",
    orders,
  });
});

export default router;