const router = require("express").Router();
const { NOTFOUND_ERROR } = require("../utils/errors");
const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const user = require("./users");
const clothingItem = require("./clothingItems");
const { handleAuthorization } = require("../middlewares/auth");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signin", login);
router.post("/signup", createUser);

router.get("/users/me", handleAuthorization, getCurrentUser);
router.patch("/users/me", handleAuthorization, updateUser);

router.use((req, res) => {
  res.status(NOTFOUND_ERROR).send({ message: "Requested resource not found" });
});

module.exports = router;
