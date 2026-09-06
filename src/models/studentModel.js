import pool from "../config/db.js";

export const getAllStudents = async () => {
  const result = await pool.query("SELECT * FROM students ORDER BY id");
  return result.rows;
};

export const getStudentById = async (id) => {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0];
};
export const createStudent = async ({ name, age, course }) => {
  const result = await pool.query(
    "INSERT INTO students (name, age, course) VALUES ($1, $2, $3) RETURNING *",
    [name, age, course],
  );
  return result.rows[0];
};

export const updateStudent = async (id, fields) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) return getStudentById(id);

  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const values = keys.map((key) => fields[key]);

  const result = await pool.query(
    `UPDATE students SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id],
  );
  return result.rows[0];
};

export const deleteStudent = async (id) => {
  const result = await pool.query(
    "DELETE FROM students WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
