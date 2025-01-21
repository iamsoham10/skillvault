const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);

// Use error handler middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000 🎉");
});
