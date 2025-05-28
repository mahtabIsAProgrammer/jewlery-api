import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const path = join("data", "products.json");

export const getProducts = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

export const saveProducts = (products) => {
  writeFileSync(path, JSON.stringify(products, null, 2));
};
