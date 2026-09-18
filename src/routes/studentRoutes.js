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

router.get("/", requireAuth, getStudents);
router.get("/:id", requireAuth, getStudent);
router.post("/", requireAuth, addStudent);
router.patch("/:id", requireAuth, patchStudent);
router.delete("/:id", requireAuth, removeStudent);

export default router;
