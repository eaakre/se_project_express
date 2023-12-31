const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  owner: {},
  likes: {
    users: [],
  },
  createdAt: {
    type: Date,
    value: Date.now,
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
