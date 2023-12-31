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

// const getItems = (req, res) => {
//   console.log(req);

//   User.find({})
//     .then((items) => res.status(200).send(items))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from getItems,", e });
//     });
// };

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageURL } = req.body;

//   console.log(itemId, imageURL);
//   User.findByIdAndUpdate(itemId, { $set: { imageURL } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from updateItem,", e });
//     });
// };

// const deleteItem = (req, res) => {
//   console.log(req);
//   const { itemId } = req.params;

//   console.log(itemId);

//   User.findByIdAndDelete(itemId)
//     .orFail()
//     .then((item) => res.status(204).send({}))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from deleteItem,", e });
//     });
// };

module.exports = {
  createUser,
};
