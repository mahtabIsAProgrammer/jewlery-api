import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

import { getUsers, saveUsers } from "../models/users.js";

export const getAllUsers = (req, res) => {
  const { search } = req.query;
  let users = getUsers();

  if (search) {
    const keyword = search.toLowerCase();
    users = users.filter((u) =>
      [u.firstName, u.lastName].some((field) =>
        field.toLowerCase().includes(keyword)
      )
    );
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

  const {
    email,
    gender,
    password,
    userName,
    role,
    phoneNumber,
    firstName,
    lastName,
    imageUrl,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const existingUser = users.find(
    (u) => u.email === email || u.userName === userName
  );
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: uuid(),
    email,
    gender,
    password: hashedPassword,
    firstName,
    lastName,
    imageUrl,
    userName,
    role,
    phoneNumber,
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
    user.fistName = req.body.fistName || user.fistName;
    user.lastName = req.body.lastName || user.lastName;
    user.imageUrl = req.body.imageUrl || user.imageUrl;
    user.userName = req.body.userName || user.userName;
    user.role = req.body.role || user.role;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
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
