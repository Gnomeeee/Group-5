export const validateCredentials = (req, res, next) => {
  const { username, password } = req.body || {};

  if (typeof username !== "string" || username.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters" });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  req.body.username = username.trim();
  next();
};
