const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const todosRoutes = require("./routes/todos");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", todosRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the project.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
