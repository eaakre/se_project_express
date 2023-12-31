const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_ERROR,
  NOTFOUND_ERROR,
  DEFAULT_ERROR,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password });
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error("Email is already in use");
      }
      return bcrypt.hash(password, 16);
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
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
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
// const updateUser = (req, res) => {
//   const { userId } = req.params;
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(userId, { $set: { avatar } })
//     .orFail()
//     .then((user) => res.send({ data: user }))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from updateUser,", e });
//     });
// };

// const deleteUser = (req, res) => {
//   const { userId } = req.params;

//   User.findByIdAndDelete(userId)
//     .orFail()
//     .then((user) => res.status(204).send({}))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from deleteUser,", e });
//     });
// };

module.exports = {
  createUser,
  getUsers,
  getUserById,
  login,
  // updateUser,
  // deleteUser,
};
