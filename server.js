import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
