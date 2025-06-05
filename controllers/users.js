import bcrypt from "bcryptjs";
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

  const {
    email,
    gender,
    password,
    userName,
    role,
    phoneNumber,
    firstName,
    lastName,
  } = req.body;

  const imageUrl = req.file ? `/data/users/${req.file.filename}` : "";

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

  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.file) {
    const oldImagePath = user.imageUrl?.split("/data/")[1];
    if (oldImagePath) {
      const fullPath = path.join("data", oldImagePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    user.imageUrl = `/data/users/${req.file.filename}`;
  }

  user.email = req.body.email || user.email;
  user.gender = req.body.gender || user.gender;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.userName = req.body.userName || user.userName;
  user.role = req.body.role || user.role;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

  saveUsers(users);
  res.json(user);
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
