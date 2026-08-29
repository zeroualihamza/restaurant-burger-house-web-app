import { getDb } from "../db.js";

export async function addToCart(userId, productId) {
  const db = await getDb();

  const existingItem = await db.get(
    "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );

  if (existingItem) {
    await db.run(
      "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?",
      [existingItem.id]
    );

    return;
  }

  await db.run(
    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [userId, productId, 1]
  );
}

export async function getCartItems(userId) {
  const db = await getDb();

  return db.all(
    `
    SELECT
      cart_items.id,
      cart_items.product_id,
      cart_items.quantity,
      products.name,
      products.description,
      products.price,
      products.image,
      ROUND(cart_items.quantity * products.price, 2) AS subtotal
    FROM cart_items
    JOIN products
      ON cart_items.product_id = products.id
    WHERE cart_items.user_id = ?
    ORDER BY cart_items.id
    `,
    [userId]
  );
}

export async function clearCart(userId) {
  const db = await getDb();

  await db.run("DELETE FROM cart_items WHERE user_id = ?", [userId]);
}

