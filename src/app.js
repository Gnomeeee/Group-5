import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

export default app;
