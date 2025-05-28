import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const path = join("data", "comment.json");
// GET comment from the json
export const getcomment = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

// Save changing prverbs in the json
export const savecomment = (comment) => {
  writeFileSync(path, JSON.stringify(comment, null, 2));
};
