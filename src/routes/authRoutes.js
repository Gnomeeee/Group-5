import { Router } from "express";
import { register, login, logout, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateCredentials } from "../validations/authValidation.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: juandelacruz
 *               password:
 *                 type: string
 *                 example: hello123
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Username already taken
 */
router.post("/register", validateCredentials, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: juandelacruz
 *               password:
 *                 type: string
 *                 example: hello123
 *     responses:
 *       200:
 *         description: Logged in successfully, returns a JWT token
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid username or password
 */
router.post("/login", validateCredentials, login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user (revokes token)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: No token provided / invalid or expired token
 */
router.post("/logout", requireAuth, logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns the current user's info
 *       401:
 *         description: No token provided / invalid or expired token
 */
router.get("/me", requireAuth, me);

export default router;
