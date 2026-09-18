import { isTokenRevoked } from "../models/userModel.js";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);

    if (await isTokenRevoked(token)) {
      return res.status(401).json({ message: "Token has been revoked" });
    }

    req.user = { id: decoded.sub, username: decoded.username };
    req.token = token;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
