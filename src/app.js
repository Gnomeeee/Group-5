import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

export default app;
