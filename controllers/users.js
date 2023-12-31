const User = require("../models/user");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

const getUsers = (req, res) => {
  console.log(req);

  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUsers,", e });
    });
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  console.log(userId, avatar);
  User.findByIdAndUpdate(userId, { $set: { avatar } })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updateUser,", e });
    });
};

const deleteUser = (req, res) => {
  console.log(req);
  const { userId } = req.params;

  console.log(userId);

  User.findByIdAndDelete(userId)
    .orFail()
    .then((user) => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "Error from deleteUser,", e });
    });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
