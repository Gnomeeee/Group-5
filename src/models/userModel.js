import pool from "../config/db.js";

export const getUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result.rows[0];
};

export const createUser = async ({ username, password }) => {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at",
    [username, password],
  );
  return result.rows[0];
};

export const revokeToken = async (token, expiresAt) => {
  await pool.query(
    "INSERT INTO revoked_tokens (token, expires_at) VALUES ($1, $2) ON CONFLICT (token) DO NOTHING",
    [token, expiresAt],
  );
};

export const isTokenRevoked = async (token) => {
  const result = await pool.query(
    "SELECT 1 FROM revoked_tokens WHERE token = $1",
    [token],
  );
  return result.rows.length > 0;
};
