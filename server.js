const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: Number,
  math: Number,
  science: Number,
  english: Number,
  average: Number,
  grade: String
});

const Student = mongoose.model("Student", studentSchema);

// CREATE
app.post("/add", async (req, res) => {

  const { name, rollNo, math, science, english } = req.body;

  const average = (math + science + english) / 3;

  let grade = "F";

  if (average >= 90) grade = "A";
  else if (average >= 75) grade = "B";
  else if (average >= 60) grade = "C";
  else if (average >= 40) grade = "D";

  const student = new Student({
    name,
    rollNo,
    math,
    science,
    english,
    average,
    grade
  });

  await student.save();

  res.json(student);
});

// READ
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// UPDATE
app.put("/update/:id", async (req, res) => {

  const { name, rollNo, math, science, english } = req.body;

  const average = (math + science + english) / 3;

  let grade = "F";

  if (average >= 90) grade = "A";
  else if (average >= 75) grade = "B";
  else if (average >= 60) grade = "C";
  else if (average >= 40) grade = "D";

  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name,
      rollNo,
      math,
      science,
      english,
      average,
      grade
    },
    { new: true }
  );

  res.json(updated);
});

// DELETE
app.delete("/delete/:id", async (req, res) => {

  await Student.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted Successfully"
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running");
});