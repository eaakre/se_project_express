const router = require("express").Router();

const {
  createUser,
  getUsers,
  getUserById,
  // updateUser,
  // deleteUser,
} = require("../controllers/users");

// CREATE
// router.post("/", createUser);

// READ
// router.get("/", getUsers);
// router.get("/:userId", getUserById);

// UPDATE
// router.put("/:userId", updateUser);

// DELETE
// router.delete("/:userId", deleteUser);

module.exports = router;
