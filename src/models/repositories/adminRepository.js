import { getDb } from "../db.js";

export async function getAllOrders() {
  const db = await getDb();

  return db.all(`
    SELECT
      orders.id,
      orders.status,
      orders.total,
      orders.created_at,
      users.first_name,
      users.last_name,
      users.email
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
  `);
}

export async function updateOrderStatus(orderId, status) {
  const db = await getDb();

  await db.run(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, orderId]
  );
}