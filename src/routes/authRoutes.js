import { Router } from "express";
import { register, login, logout, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateCredentials } from "../validations/authValidation.js";

const router = Router();
router.post("/register", validateCredentials, register);
router.post("/login", validateCredentials, login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);

export default router;
