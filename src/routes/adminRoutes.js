import express from "express";
import { getAllOrders, updateOrderStatus } from "../models/repositories/adminRepository.js";

const router = express.Router();

function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.redirect("/login");
  }

  next();
}

router.get("/admin/orders", requireAdmin, async (req, res) => {
  const orders = await getAllOrders();

  res.render("adminOrders", {
    title: "Burger House - Admin Orders",
    orders,
  });
});

router.post("/admin/orders/:id/status", requireAdmin, async (req, res) => {
  const orderId = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = ["Order received", "Preparing", "Ready", "Completed"];

  if (allowedStatuses.includes(status)) {
    await updateOrderStatus(orderId, status);
  }

  res.redirect("/admin/orders");
});

export default router;