const express = require("express");
const connect = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();
connect();

// Require routes
const router = require("./routes/authRoute");

app.use(express.json());

app.use(router);
app.use(express.static("../frontend"));

// ****SERVER*****
app.listen(PORT, "localhost", () => {
  console.log(`server is running on port ${PORT}!`);
});
