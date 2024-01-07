const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: (v) => validator.email(v),
    message: "You must enter a valid email",
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", user);
