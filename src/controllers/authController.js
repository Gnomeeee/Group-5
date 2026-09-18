import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json({ message: err.status ? err.message : "Failed to register" });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await authService.loginUser(req.body);
    res.json({ message: "Logged in successfully", token, user });
  } catch (err) {
    console.log(err);
    res
      .status(err.status || 500)
      .json({ message: err.status ? err.message : "Failed to login" });
  }
};

export const logout = async (req, res) => {
  try {
    await authService.logoutUser(req.token);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to logout" });
  }
};

export const me = (req, res) => {
  res.json({ user: req.user });
};
