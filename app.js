import express from "express";
import employeesRouter from "./routes/employees.js";

const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// All /employees routes handled here
app.use("/employees", employeesRouter);

// Global error handler (for uncaught errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});