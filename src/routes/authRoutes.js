import express from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/repositories/userRepository.js";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Burger House - Register",
  });
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.render("register", {
      title: "Burger House - Register",
      error: "All fields are required.",
    });
  }

  if (password.length < 8) {
    return res.render("register", {
      title: "Burger House - Register",
      error: "Password must be at least 8 characters.",
    });
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.render("register", {
      title: "Burger House - Register",
      error: "This email is already registered.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser(firstName, lastName, email, hashedPassword);

  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Burger House - Login",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.render("login", {
      title: "Burger House - Login",
      error: "Invalid email or password.",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.render("login", {
      title: "Burger House - Login",
      error: "Invalid email or password.",
    });
  }

  req.session.user = {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  };

  res.redirect("/menu");
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;