import express from "express";

import faq from "./routes/faq.js";
import blog from "./routes/blog.js";
import users from "./routes/users.js";
import comment from "./routes/comment.js";
import product from "./routes/product.js";
import category from "./routes/category.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// API Routes
app.use("/blogs", blog);
app.use("/faqs", faq);
app.use("/users", users);
app.use("/comments", comment);
app.use("/products", product);
app.use("/categories", category);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
