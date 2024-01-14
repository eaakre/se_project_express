const router = require("express").Router();
const { NOTFOUND_ERROR } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const user = require("./users");
const clothingItem = require("./clothingItems");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signup", createUser);
router.post("/signin", login);

router.use((req, res) => {
  res.status(NOTFOUND_ERROR).send({ message: "Requested resource not found" });
});

module.exports = router;
