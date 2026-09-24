import { Router } from "express";
import {
  addStudent,
  getStudent,
  getStudents,
  patchStudent,
  removeStudent,
} from "../controllers/studentController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid or missing student id
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", requireAuth, getStudent);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, age, course]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Dela Cruz
 *               age:
 *                 type: integer
 *                 example: 20
 *               course:
 *                 type: string
 *                 example: BS Computer Science
 *     responses:
 *       201:
 *         description: Student created
 *       401:
 *         description: Unauthorized
 */
router.post("/", requireAuth, addStudent);

/**
 * @swagger
 * /students/{id}:
 *   patch:
 *     summary: Update a student's info
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               course:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Student not found
 */
router.patch("/:id", requireAuth, patchStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Student not found
 */
router.delete("/:id", requireAuth, removeStudent);

export default router;
