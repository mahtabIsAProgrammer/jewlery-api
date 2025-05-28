import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const path = join("data", "users.json");

export const getUsers = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

export const saveUsers = (users) => {
  writeFileSync(path, JSON.stringify(users, null, 2));
};
