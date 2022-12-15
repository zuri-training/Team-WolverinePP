const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

async function connectDB(uri) {
  try {
    mongoose.connect(uri || process.env.MONGO_DB_LOCAL);
    mongoose.set('strictQuery', true);
    console.log("connected to MongoDB!");
  } catch (error) {
    console.logl(error.message);
  }
}

module.exports = connectDB;