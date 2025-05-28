import { v4 as uuid } from "uuid";
import { getUsers, saveUsers } from "../models/users.js";

export const getAllUsers = (req, res) => {
  const users = getUsers();
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

  const { email, gender, password, lastName, userName, imageUrl, firstName } =
    req.body;
  const newUser = {
    id: uuid(),
    email,
    gender,
    password,
    lastName,
    userName,
    imageUrl,
    firstName,
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
    user.lastName = req.body.lastName || user.lastName;
    user.userName = req.body.userName || user.userName;
    user.imageUrl = req.body.imageUrl || user.imageUrl;
    user.firstName = req.body.firstName || user.firstName;
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
