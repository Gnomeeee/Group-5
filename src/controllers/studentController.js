import * as studentModel from "../models/studentModel.js";

export const getStudents = async (req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const newStudent = await studentModel.createStudent(req.body);
    res.status(201).send(newStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create student" });
  }
};

export const patchStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await studentModel.getStudentById(id);

    if (!existing) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updatedStudent = await studentModel.updateStudent(id, req.body);
    res.send(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update student" });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await studentModel.deleteStudent(id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.send({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete student" });
  }
};
