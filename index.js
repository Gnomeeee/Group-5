import express from "express";

const app = express();
const port = 3000;

let students = [
  { id: 1, name: "John jeff dublin", age: 23, course: "Computer Science" },
  {
    id: 2,
    name: "Marion Beri",
    age: 22,
    course: "Computer Science",
  },
  { id: 3, name: "Jenneby Hito", age: 21, course: "Computer Science" },
  { id: 4, name: "Mitchielyn Gebarra", age: 23, course: "Computer Science" },
];

app.use(express.json());

app.get("/students", (req, res) => {
  res.send(students);
});

app.post("/students", (req, res) => {
  const needStudent = req.body;

  students = [...students, needStudent];

  res.send[needStudent];
});

app.post("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(400).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.listen(port, () => {
  console.log(`Your servers in running on localhost:${port}`);
});
