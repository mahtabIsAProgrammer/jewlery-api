import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const path = join("data", "faq.json");

// GET faq from the json
export const getfaq = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

// Save changing prverbs in the json
export const savefaq = (faq) => {
  writeFileSync(path, JSON.stringify(faq, null, 2));
};
