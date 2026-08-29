import express from "express";
import { getDb } from "../models/db.js";

const router = express.Router();

router.get("/menu", async (req, res) => {
  const db = await getDb();
  const products = await db.all("SELECT * FROM products ORDER BY id");

  res.render("menu", {
    title: "Burger House - Menu",
    products,
  });
});

export default router;