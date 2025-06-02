import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { getUsers } from "../../models/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

export const login = (req, res) => {
  const { password, email, userName } = req.body;

  const users = getUsers();
  const user = users.find((u) => u.email === email || u.userName === userName);

  if (!user) return res.status(401).json("User not found");

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) return res.status(401).json("Wrong Password");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      //   secure: true,
      sameSite: "Strict",
    })
    .json({ message: "Login Successful" });
};
