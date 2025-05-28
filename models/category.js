import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const path = join("data", "category.json");

// GET category from the json
export const getcategory = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

// Save changing prverbs in the json
export const savecategory = (category) => {
  writeFileSync(path, JSON.stringify(category, null, 2));
};
