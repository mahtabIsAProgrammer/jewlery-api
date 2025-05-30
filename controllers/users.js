import { v4 as uuid } from "uuid";
import { getUsers, saveUsers } from "../models/users.js";

export const getAllUsers = (req, res) => {
  const { search } = req.query;
  let users = getUsers();

  if (search) {
    const keyword = search.toLowerCase();
    users = users.filter((u) => u.fullName.toLowerCase().includes(keyword));
  }
  res.json(users);
};

export const getUserById = (req, res) => {
  const users = getUsers();
  const user = users.find((u) => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ error: "users not found" });
  }
  res.json(user);
};

export const createUser = (req, res) => {
  const users = getUsers();

  const { email, gender, password, fullName, imageUrl } = req.body;
  const newUser = {
    id: uuid(),
    email,
    gender,
    password,
    fullName,
    imageUrl,
  };

  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const users = getUsers();

  const user = users.find((f) => f.id == req.params.id);
  if (user) {
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.password = req.body.password || user.password;
    user.fullName = req.body.fullName || user.fullName;
    user.imageUrl = req.body.imageUrl || user.imageUrl;
    res.json(user);
    saveUsers(users);
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

export const deleteUser = (req, res) => {
  let users = getUsers();
  const filtered = users.filter((u) => u.id !== req.params.id);
  if (filtered.length === users.length) {
    return res.status(404).json({ error: "user not found" });
  }
  saveUsers(filtered);
  res.json({ message: "Deleted" });
};
