import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import faq from "./routes/faq.js";
import blog from "./routes/blog.js";
import users from "./routes/users.js";
import comment from "./routes/comment.js";
import product from "./routes/product.js";
import category from "./routes/category.js";
import { login } from "./controllers/auth/login.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
dotenv.config();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/data", express.static(path.join(process.cwd(), "data")));

// API Routes
app.use("/blogs", blog);
app.use("/faqs", faq);
app.use("/users", users);
app.use("/comments", comment);
app.use("/products", product);
app.use("/categories", category);

app.use("/login", login);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
