import express from "express";
import employees from "#db/employees";

const router = express.Router();

// GET /employees
router.get("/", (req, res) => {
  res.json(employees);
});

// GET /employees/random
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// GET /employees/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.json(employee);
});

// POST /employees
router.post("/", (req, res) => {
  // Handle cases where no body is sent or the body is not a valid object
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).send("Invalid body");
  }

  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid name");
  }

  const newId = Math.max(0, ...employees.map((e) => e.id)) + 1;
  const newEmployee = { id: newId, name: name.trim() };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

export default router;