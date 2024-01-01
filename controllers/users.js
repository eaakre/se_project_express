const User = require("../models/user");
const { INVALID_DATA_ERROR, DEFAULT_ERROR } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA_ERROR).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
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
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`,
      );
    });
};

// const updateUser = (req, res) => {
//   const { userId } = req.params;
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(userId, { $set: { avatar } })
//     .orFail()
//     .then((user) => res.status(200).send({ data: user }))
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
  // updateUser,
  // deleteUser,
};
