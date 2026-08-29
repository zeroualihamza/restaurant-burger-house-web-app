import { getDb } from "../db.js";

export async function findUserByEmail(email) {
  const db = await getDb();

  return db.get("SELECT * FROM users WHERE email = ?", [email]);
}

export async function createUser(firstName, lastName, email, hashedPassword) {
  const db = await getDb();

  const result = await db.run(
    `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)
    `,
    [firstName, lastName, email, hashedPassword]
  );

  return result.lastID;
}