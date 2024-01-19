const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_ERROR,
  UNAUTHORIZED,
  NOTFOUND_ERROR,
  DEFAULT_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log({ name, avatar, email, password });
  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
  }
  User.findOne({ email })
    .then((user) => {
      if (!email) {
        throw new Error("Please enter a valid email");
      }
      if (user) {
        throw new Error("Email is already in use");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const payload = user.toObject();
      delete payload.password;
      res.status(201).send({ data: payload });
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_ERROR).send({ message: err.message });
      } else if (err.message === "Please enter a valid email") {
        res.status(BAD_REQUEST_ERROR).send({ message: err.message });
      } else if (err.message === "Email is already in use") {
        res.status(CONFLICT_ERROR).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOTFOUND_ERROR).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid credentials" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  const id = req.user._id;
  console.log(id);
  return User.findById(id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      return res.send({ date: user });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const id = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      return res.send({ data: user });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from updateUser,", e });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  login,
  getCurrentUser,
  updateUser,
};
