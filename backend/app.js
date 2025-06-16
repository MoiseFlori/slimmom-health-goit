const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const connectDB = require("./db");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const userRouter = require("./routes/api/users");
const dayRoutes = require("./routes/api/diary");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/api/products", require("./routes/api/products"));
app.use("/api/diary", dayRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
