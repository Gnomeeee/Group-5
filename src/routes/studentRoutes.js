import { Router } from "express";
import {
  addStudent,
  getStudents,
  patchStudent,
  removeStudent,
} from "../controllers/studentController.js";

const router = Router();

router.get("/", getStudents);
router.post("/", addStudent);
router.patch("/:id", patchStudent);
router.delete("/:id", removeStudent);

export default router;
