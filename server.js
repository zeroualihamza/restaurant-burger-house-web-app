import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import { getDb } from "./src/models/db.js";
import menuRoutes from "./src/routes/menuRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.engine(
  "handlebars",
  engine({
    helpers: {
      isSelected(value, currentValue) {
        return value === currentValue ? "selected" : "";
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isAdmin = req.session.user?.role === "admin";
  next();
});

app.use("/public", express.static("./src/public"));

app.use(menuRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(adminRoutes);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Burger House - Home",
  });
});

await getDb();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
