import { getDb } from "../db.js";

export async function createOrderFromCart(userId, cartItems, total) {
  const db = await getDb();

  const orderResult = await db.run(
    "INSERT INTO orders (user_id, status, total) VALUES (?, ?, ?)",
    [userId, "Order received", total]
  );

  const orderId = orderResult.lastID;

  for (const item of cartItems) {
    await db.run(
      `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
      `,
      [orderId, item.product_id, item.quantity, item.price]
    );
  }

  return orderId;
}

export async function getOrdersByUser(userId) {
  const db = await getDb();

  return db.all(
    `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );
}