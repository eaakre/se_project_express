const router = require("express").Router();
const NotFoundError = require("../utils/errors/NotFoundError");
const { createUser, login } = require("../controllers/users");
const user = require("./users");
const clothingItem = require("./clothingItems");
const { validateNewUser, validateLogin } = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signin", validateLogin, login);
router.post("/signup", validateNewUser, createUser);

router.use((req, res) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
