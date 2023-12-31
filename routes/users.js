const router = require("express").Router();

const {
  createUser,
  // getUsers,
  // updateUser,
  // deleteUser,
} = require("../controllers/users");
// CRUD
// CREATE
router.post("/", createUser);

// READ
// router.get("/", getUsers);

// UPDATE
// router.put("/:itemId", updateUser);

// DELETE
// router.delete("/:itemId", deleteUser);

module.exports = router;
