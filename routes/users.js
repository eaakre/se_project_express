const router = require("express").Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users");
// CRUD
// CREATE
router.post("/", createUser);

// READ
router.get("/", getUsers);

// UPDATE
router.put("/:userId", updateUser);

// DELETE
router.delete("/:userId", deleteUser);

module.exports = router;
