import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

let db = null;

export async function getDb() {
  if (db) {
    return db;
  }

  db = await open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer'
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      total REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  const productCount = await db.get("SELECT COUNT(*) AS count FROM products");

  if (productCount.count === 0) {
    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Classic Burger",
        "Beef patty, cheddar cheese, lettuce, tomato, and house sauce.",
        12.99,
        "/public/img/classic-burger.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Chicken Burger",
        "Crispy chicken, lettuce, pickles, and garlic mayo.",
        11.99,
        "/public/img/chicken-burger.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Spicy Burger",
        "Beef patty, jalapenos, spicy sauce, onions, and cheddar.",
        13.99,
        "/public/img/spicy-burger.jpg",
      ]
    );

        await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "French Fries",
        "Crispy golden fries served with house sauce.",
        4.99,
        "/public/img/french-fries.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Sweet Potato Fries",
        "Sweet potato fries with a light seasoning and spicy mayo.",
        5.99,
        "/public/img/sweet-potato-fries.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Cola",
        "Cold refreshing cola served with ice.",
        2.99,
        "/public/img/cola.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Orange Juice",
        "Fresh orange juice with a bright citrus flavor.",
        3.99,
        "/public/img/orange-juice.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Chocolate Milkshake",
        "Creamy chocolate milkshake topped with whipped cream.",
        6.49,
        "/public/img/chocolate-milkshake.jpg",
      ]
    );

    await db.run(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [
        "Cheesecake",
        "Classic cheesecake slice with a smooth vanilla filling.",
        5.49,
        "/public/img/cheesecake.jpg",
      ]
    );
  }

      const admin = await db.get("SELECT * FROM users WHERE email = ?", [
    "admin@burgerhouse.com",
  ]);

  if (!admin) {
    const hashedPassword = await bcrypt.hash("Admin123", 10);

    await db.run(
      `
      INSERT INTO users (first_name, last_name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
      `,
      ["Admin", "User", "admin@burgerhouse.com", hashedPassword, "admin"]
    );
  }

  return db;
}