import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";
import { signToken, verifyToken } from "../utils/jwt.js";

export const registerUser = async ({ username, password }) => {
  const existing = await userModel.getUserByUsername(username);

  if (existing) {
    const err = new Error("Username is already taken");
    err.status = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);
  return userModel.createUser({ username, password: hashed });
};

export const loginUser = async ({ username, password }) => {
  const user = await userModel.getUserByUsername(username);
  const match = user ? await bcrypt.compare(password, user.password) : false;

  if (!match) {
    const err = new Error("Invalid username or password");
    err.status = 401;
    throw err;
  }

  const token = signToken({ sub: user.id, username: user.username });
  return { token, user: { id: user.id, username: user.username } };
};

export const logoutUser = async (token) => {
  const { exp } = verifyToken(token);
  await userModel.revokeToken(token, new Date(exp * 1000));
};
