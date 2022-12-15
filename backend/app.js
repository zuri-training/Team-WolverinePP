const startServer = require("../server.js");
const express = require("express");
const connect = require("./config/db");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

const app = express();
connect();

// Require routes
const authRoutes = require("./routes/authRoute");

app.use(express.json());

app.use("/auth", authRoutes);
app.use(express.static("../frontend/styles"));

// ****SERVER TEST****
app.get("/", (req, res) => {
  res.send("Testing Chunk server....!!!");
});

// ****SERVER*****
startServer.listen(PORT, "localhost", () => {
  console.log(`server is running on port ${PORT}!`);
});
