import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const path = join("data", "blogs.json");

// GET blog from the json
export const getblog = (req, res) => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

// Save changing prverbs in the json
export const saveblog = (blog) => {
  writeFileSync(path, JSON.stringify(blog, null, 2));
};
