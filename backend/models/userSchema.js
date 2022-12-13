const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: isEmail,
        message: "Please enter a valid email address.!",
      },
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema)
